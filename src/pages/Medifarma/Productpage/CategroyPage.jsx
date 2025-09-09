import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter, ArrowLeft, Grid, List } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addMedicine } from '../../../redux/slices/medicineSlice';

const ProductCard = ({ product, viewMode, onAddMedicine }) => (
  <div className={`bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow ${
    viewMode === 'grid' ? 'p-4' : 'p-4 flex items-center'
  }`}>
    <div className={viewMode === 'grid' ? 'w-full mb-3' : 'w-20 h-20 mr-4 flex-shrink-0'}>
      <img 
        src={product.image || "https://via.placeholder.com/200x200?text=Product"} 
        alt={product.name || product.title}
        className={`${viewMode === 'grid' ? 'w-full h-48' : 'w-full h-full'} object-cover rounded-md`}
      />
    </div>
    <div className={viewMode === 'grid' ? '' : 'flex-1'}>
      <h3 className={`font-semibold text-gray-800 ${viewMode === 'grid' ? 'text-lg mb-2' : 'text-base mb-1'}`}>
        {product.name || product.title}
      </h3>
      <p className={`text-gray-600 ${viewMode === 'grid' ? 'text-sm mb-3' : 'text-sm mb-2'}`}>
        {product.description}
      </p>
      <div className={`flex ${viewMode === 'grid' ? 'justify-between items-center' : 'items-center space-x-4'}`}>
        <span className="text-lg font-bold text-green-600">${product.price || '0.00'}</span>
        <button 
          onClick={() => onAddMedicine(product)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
);

const FilterSidebar = ({ filters, onFilterChange, subcategories }) => (
  <div className="bg-white rounded-lg shadow-sm border p-4">
    <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
      <Filter className="w-5 h-5 mr-2" />Filters
    </h3>

    {subcategories?.length > 0 && (
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-2">Subcategories</h4>
        <label className="flex items-center mb-2">
          <input 
            type="checkbox" 
            checked={filters.subcategories.length === 0}
            onChange={() => onFilterChange('subcategories', [])}
            className="mr-2"
          />
          All Subcategories
        </label>
        {subcategories.map(subcat => (
          <label key={subcat.id || subcat._id} className="flex items-center mb-2">
            <input 
              type="checkbox" 
              checked={filters.subcategories.includes(subcat.id || subcat._id)}
              onChange={e => {
                const id = subcat.id || subcat._id;
                onFilterChange('subcategories', 
                  e.target.checked 
                    ? [...filters.subcategories, id]
                    : filters.subcategories.filter(x => x !== id)
                );
              }}
              className="mr-2"
            />
            {subcat.name || subcat.title}
          </label>
        ))}
      </div>
    )}

    <div>
      <h4 className="font-medium text-gray-700 mb-2">Sort By</h4>
      <select 
        value={filters.sortBy}
        onChange={e => onFilterChange('sortBy', e.target.value)}
        className="w-full p-2 border rounded-md"
      >
        <option value="name">Name (A-Z)</option>
        <option value="price-low">Price (Low to High)</option>
        <option value="price-high">Price (High to Low)</option>
        <option value="newest">Newest First</option>
      </select>
    </div>
  </div>
);

const MediCatePage = () => {
  const { mediId } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    priceRange: 'all',
    subcategories: [],
    sortBy: 'name'
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['category', mediId],
    queryFn: async () => {
      const res = await fetch(`https://medisawabackend.onrender.com/api/v1/categories/getOne/${mediId}`);
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
    enabled: !!mediId
  });

  const category = data?.result || {};
  const products = category.products || [];
  const subcategories = category.subcategories || [];

  const filteredProducts = useMemo(() => {
    if (!products.length) return [];

    let result = products.filter(p => 
      !searchTerm || 
      [p.name, p.title, p.description].some(field => 
        field?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange === '100+' ? [100, Infinity] : filters.priceRange.split('-').map(Number);
      result = result.filter(p => {
        const price = parseFloat(p.price) || 0;
        return price >= min && price <= max;
      });
    }

    if (filters.subcategories.length) {
      result = result.filter(p => filters.subcategories.includes(p.subcategoryId));
    }

    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name': return (a.name || a.title).localeCompare(b.name || b.title);
        case 'price-low': return (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0);
        case 'price-high': return (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0);
        case 'newest': return new Date(b.createdAt) - new Date(a.createdAt);
        default: return 0;
      }
    });

    return result;
  }, [products, searchTerm, filters]);

  if (isLoading) return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-96 mb-8"></div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="h-96 bg-gray-200 rounded"></div>
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array(6).fill().map((_, i) => <div key={i} className="h-64 bg-gray-200 rounded"></div>)}
          </div>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="flex items-center text-blue-500 hover:text-blue-600 mb-4">
        <ArrowLeft className="w-5 h-5 mr-2" />Back
      </button>
      <div className="text-center py-12">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <button onClick={() => navigate(-1)} className="flex items-center text-blue-500 hover:text-blue-600 mb-4">
          <ArrowLeft className="w-5 h-5 mr-2" />Back
        </button>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{category.title || 'Category'}</h1>
        {category.description && <p className="text-gray-600 mb-4">{category.description}</p>}
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <span className="text-sm text-gray-500">{filteredProducts.length} products</span>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex border rounded-md">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-500'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-500'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <FilterSidebar 
            filters={filters}
            onFilterChange={(type, value) => setFilters(prev => ({ ...prev, [type]: value }))}
            subcategories={subcategories}
          />
        </div>

        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found</p>
            </div>
          ) : (
            <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {filteredProducts.map((product, i) => (
                <ProductCard key={product._id || i} product={product} viewMode={viewMode} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediCatePage;