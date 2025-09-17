import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter, ArrowLeft, Grid, List, ShoppingCart, Star, Package, AlertCircle } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addMedicine } from '../../../redux/slices/medicineSlice';

const ProductCard = ({ product, viewMode, onAddMedicine }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300 ${
    viewMode === 'grid' ? 'p-5' : 'p-5 flex items-center'
  }`}>
    <div className={viewMode === 'grid' ? 'w-full mb-4' : 'w-24 h-24 mr-5 flex-shrink-0'}>
      <div className="relative group">
        <img 
          src={product.image || "https://via.placeholder.com/200x200?text=Product"} 
          alt={product.name || product.title}
          className={`${viewMode === 'grid' ? 'w-full h-52' : 'w-full h-full'} object-cover rounded-lg group-hover:scale-105 transition-transform duration-300`}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/200x200?text=No+Image";
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all duration-300"></div>
      </div>
    </div>
    <div className={viewMode === 'grid' ? '' : 'flex-1'}>
      <div className="flex items-start justify-between mb-2">
        <h3 className={`font-semibold text-gray-800 line-clamp-2 ${viewMode === 'grid' ? 'text-lg' : 'text-base'}`}>
          {product.name || product.title}
        </h3>
        {viewMode === 'grid' && (
          <div className="flex items-center text-yellow-400 ml-2">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm text-gray-600 ml-1">4.5</span>
          </div>
        )}
      </div>
      
      <p className={`text-gray-600 mb-3 line-clamp-2 ${viewMode === 'grid' ? 'text-sm' : 'text-sm'}`}>
        {product.description || 'No description available'}
      </p>
      
      <div className="flex items-center mb-3">
        <Package className="w-4 h-4 text-gray-400 mr-1" />
        <span className="text-xs text-gray-500">In Stock</span>
      </div>
      
      <div className={`flex ${viewMode === 'grid' ? 'justify-between items-center' : 'items-center space-x-4'}`}>
        <div className="flex flex-col">
          <span className="text-xl font-bold text-green-600">{product.price || '0.00'}</span>
          {viewMode === 'grid' && (
            <span className="text-xs text-gray-500 line-through">{(parseFloat(product.price || 0) * 1.2).toFixed(2)}</span>
          )}
        </div>
        <button 
          onClick={() => onAddMedicine && onAddMedicine(product)}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2.5 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  </div>
);

const FilterSidebar = ({ filters, onFilterChange, subcategories }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
    <h3 className="font-semibold text-gray-800 mb-6 flex items-center text-lg">
      <Filter className="w-5 h-5 mr-3 text-blue-500" />
      Filters
    </h3>

    {/* Price Range Filter */}
    <div className="mb-6">
      <h4 className="font-medium text-gray-700 mb-3">Price Range</h4>
      <div className="space-y-2">
        {[
          { value: 'all', label: 'All Prices' },
          { value: '0-25', label: '$0 - $25' },
          { value: '25-50', label: '$25 - $50' },
          { value: '50-100', label: '$50 - $100' },
          { value: '100+', label: '$100+' }
        ].map(range => (
          <label key={range.value} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-md -mx-2">
            <input 
              type="radio" 
              name="priceRange"
              checked={filters.priceRange === range.value}
              onChange={() => onFilterChange('priceRange', range.value)}
              className="mr-3 text-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{range.label}</span>
          </label>
        ))}
      </div>
    </div>

    {/* Subcategories Filter */}
    {subcategories?.length > 0 && (
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">Subcategories</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-md -mx-2">
            <input 
              type="checkbox" 
              checked={filters.subcategories.length === 0}
              onChange={() => onFilterChange('subcategories', [])}
              className="mr-3 text-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">All Subcategories</span>
          </label>
          {subcategories.map(subcat => (
            <label key={subcat.id || subcat._id} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-md -mx-2">
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
                className="mr-3 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{subcat.name || subcat.title}</span>
            </label>
          ))}
        </div>
      </div>
    )}

    {/* Sort By Filter */}
    <div>
      <h4 className="font-medium text-gray-700 mb-3">Sort By</h4>
      <select 
        value={filters.sortBy}
        onChange={e => onFilterChange('sortBy', e.target.value)}
        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
      >
        <option value="name">Name (A-Z)</option>
        <option value="price-low">Price (Low to High)</option>
        <option value="price-high">Price (High to Low)</option>
        <option value="newest">Newest First</option>
      </select>
    </div>

    {/* Clear Filters Button */}
    {(filters.priceRange !== 'all' || filters.subcategories.length > 0 || filters.sortBy !== 'name') && (
      <button
        onClick={() => onFilterChange('reset', null)}
        className="w-full mt-6 px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
      >
        Clear All Filters
      </button>
    )}
  </div>
);

const MediCatePage = () => {
  const { mediId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      if (!res.ok) throw new Error('Failed to fetch category data');
      return res.json();
    },
    enabled: !!mediId,
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const category = data?.result || {};
  const products = category.products || [];
  const subcategories = category.subcategories || [];

  const handleAddMedicine = (product) => {
    if (dispatch && addMedicine) {
      dispatch(addMedicine(product));
      // You could add a toast notification here
    }
  };

  const handleFilterChange = (type, value) => {
    if (type === 'reset') {
      setFilters({
        priceRange: 'all',
        subcategories: [],
        sortBy: 'name'
      });
    } else {
      setFilters(prev => ({ ...prev, [type]: value }));
    }
  };

  const filteredProducts = useMemo(() => {
    if (!products.length) return [];

    let result = products.filter(p => 
      !searchTerm || 
      [p.name, p.title, p.description].some(field => 
        field?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    // Price range filtering
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange === '100+' 
        ? [100, Infinity] 
        : filters.priceRange.split('-').map(Number);
      result = result.filter(p => {
        const price = parseFloat(p.price) || 0;
        return price >= min && price <= max;
      });
    }

    // Subcategory filtering
    if (filters.subcategories.length) {
      result = result.filter(p => filters.subcategories.includes(p.subcategoryId));
    }

    // Sorting
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name': 
          return (a.name || a.title || '').localeCompare(b.name || b.title || '');
        case 'price-low': 
          return (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0);
        case 'price-high': 
          return (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0);
        case 'newest': 
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        default: 
          return 0;
      }
    });

    return result;
  }, [products, searchTerm, filters]);

  if (isLoading) return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="animate-pulse">
        <div className="flex items-center mb-6">
          <div className="h-6 bg-gray-200 rounded w-16 mr-4"></div>
          <div className="h-8 bg-gray-200 rounded w-64"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-96 mb-8"></div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="space-y-4">
            <div className="h-64 bg-gray-200 rounded-xl"></div>
          </div>
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill().map((_, i) => (
              <div key={i} className="h-80 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-blue-500 hover:text-blue-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </button>
      <div className="text-center py-20">
        <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Something went wrong</h3>
        <p className="text-red-500 mb-4">{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-blue-500 hover:text-blue-600 mb-6 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>
        
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            {category.title || 'Category'}
          </h1>
          {category.description && (
            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
              {category.description}
            </p>
          )}
        </div>
        
        {/* Search and Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </span>
          </div>
          
          <div className="flex items-center space-x-4 w-full lg:w-auto">
            <div className="relative flex-1 lg:flex-none lg:w-80">
              <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
                title="Grid View"
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
                title="List View"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <FilterSidebar 
            filters={filters}
            onFilterChange={handleFilterChange}
            subcategories={subcategories}
          />
        </div>

        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <Package className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm ? `No results for "${searchTerm}"` : 'Try adjusting your filters'}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map((product, i) => (
                <ProductCard 
                  key={product._id || product.id || i} 
                  product={product} 
                  viewMode={viewMode}
                  onAddMedicine={handleAddMedicine}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediCatePage;