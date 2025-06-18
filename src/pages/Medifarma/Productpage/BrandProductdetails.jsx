import  { useState } from 'react';

import {Sidebar} from './Sidebar';
// import {ProductsGrid} from './ProductsGrid';
import { PageHeader } from './PageHeader';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ProductCarousel } from '../../../components/UI/ProductCarousel';

const BrandProductDetails = () => {
  const [sortBy, setSortBy] = useState('Relevance');
  const [expandedFilters, setExpandedFilters] = useState({});
  const { brandId } = useParams();

  const sortOptions = [
    'Relevance',
    'Price: Low to High',
    'Price: High to Low',
    'Popularity',
    'Newest First',
    'Customer Rating'
  ];

  // Fetch brand products using React Query
  const { data: productsResponse, isLoading, error, refetch } = useQuery({
    queryKey: ['brand-products', brandId],
    queryFn: async () => {
      const response = await fetch(`https://medisewa.onrender.com/api/v1/medicines/brand/${brandId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch brand products');
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!brandId, // Only run query if brandId exists
  });

  // Extract products from API response or use fallback data
  const apiProducts = productsResponse?.result || [];
  const brandInfo = productsResponse?.brand || null;

  // Fallback products (your original static data) - use if API fails or returns empty
  const fallbackProducts = [
    {
      id: 1,
      name: 'Nivea Men All In 1 Charcoal Face Wash, 50 gm',
      price: 130,
      originalPrice: 150,
      image: null,
      category: 'Face Wash'
    },
    {
      id: 2,
      name: 'Nivea Cream, 50 gm',
      price: 75,
      image: null,
      category: 'Cream'
    },
    {
      id: 3,
      name: 'Nivea Body Lotion, 400 ml',
      price: 425,
      image: null,
      category: 'Body Lotion'
    },
    {
      id: 4,
      name: 'Nivea Men Fresh Active Deodorant Spray, 150 ml',
      price: 285,
      image: null,
      category: 'Deodorant',
      bestseller: true
    },
    {
      id: 5,
      name: 'Nivea Fresh Powerfruit Shower Gel, 250 ml',
      price: 250,
      image: null,
      category: 'Shower Gel',
      offer: 'Buy 2, +2% OFF'
    },
    {
      id: 6,
      name: 'Nivea Fresh Natural Deodorant Spray, 150 ml',
      price: 280,
      image: null,
      category: 'Deodorant',
      bestseller: true
    },
    {
      id: 7,
      name: 'Nivea Men Fresh Active Roll On Deodorant, 50 ml',
      price: 190,
      originalPrice: 220,
      image: null,
      category: 'Deodorant',
      offer: 'Buy 2, +2% OFF'
    },
    {
      id: 8,
      name: 'Nivea Soft Light Moisturiser Cream 50 ml | Enriched Wi...',
      price: 125,
      image: null,
      category: 'Moisturiser',
      offer: 'Buy 2, +2% OFF'
    }
  ];

  // Use API products if available, otherwise fallback to static data
  const products = apiProducts.length > 0 ? apiProducts : fallbackProducts;

  const filterCategories = [
    'Brands',
    'Target Body Part',
    'Benefits',
    'Skin Type',
    'Regime',
    'Skin Concern',
    'Product Features',
    'SPF Range',
    'Preference'
  ];

  const toggleFilter = (filter) => {
    setExpandedFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };

  const handleAddToCart = (product) => {
    console.log('Added to cart:', product);
    // Add your cart logic here
  };

  // Sort products based on selected option
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'Price: Low to High':
        return (a.price || 0) - (b.price || 0);
      case 'Price: High to Low':
        return (b.price || 0) - (a.price || 0);
      case 'Newest First':
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      case 'Customer Rating':
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Back Navigation */}
        <button 
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
        >
          ← Back to Brands
        </button>

        <PageHeader
          title={brandInfo?.title ? `${brandInfo.title} Products` : "Brand Products"}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOptions={sortOptions}
          brandInfo={brandInfo}
          productsCount={products.length}
          isLoading={isLoading}
        />

        <div className="flex gap-6">
          <Sidebar 
            filterCategories={filterCategories}
            expandedFilters={expandedFilters}
            onToggleFilter={toggleFilter}
          />

          <div className="flex-1">
            <ProductCarousel 
              products={sortedProducts}
              onAddToCart={handleAddToCart}
              isLoading={isLoading}
              error={error}
              onRetry={refetch}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandProductDetails;