import React, { useState } from 'react';
import { FiSearch, FiX, FiShoppingCart, FiPlus } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { addMedicine } from '../../redux/slices/medicineSlice';// Import the actual Redux action
import { Miniumoff } from './../../pages/Medifarma/Miniumoff';

const MedicineSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  // Direct API endpoint
  const API_ENDPOINT = 'https://medisawabackend.onrender.com/api/v1/medicines/search';

  // Handle search
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_ENDPOINT}?title=${encodeURIComponent(searchTerm.trim())}`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      setSearchResults(data?.result || []);
    } catch (err) {
      console.error("Search error:", err);
      setError(err.message || 'Failed to fetch search results');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setError(null);
  };

  // Handle add to cart
  const handleAddToCart = (medicine) => {
    // Create a complete product object for the cart
    const productForCart = {
      id: medicine._id,
      title: medicine.title,
      price: medicine.price,
      originalPrice: medicine.originalPrice || 299, // Using 299 as default original price if not available
      offer: medicine.offer || Math.round(((299 - medicine.price) / 299) * 100), // Calculate offer if not available
      image: medicine?.images?.[0]?.image || "/api/placeholder/150/150",
      quantity: 1
    };
    
    dispatch(addMedicine(productForCart));
    
    // Modern toast notification instead of alert
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center z-50';
    toast.innerHTML = `
      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span>${medicine.title} added to cart!</span>
    `;
    document.body.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.5s ease';
      setTimeout(() => document.body.removeChild(toast), 500);
    }, 3000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto  p-4 rounded-lg  mt-10">
      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="flex items-center border rounded-md bg-white overflow-hidden shadow">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Search medicines..."
            className="p-3 pl-4 w-full focus:outline-none text-gray-700"
          />
          {searchTerm && (
            <button 
              onClick={clearSearch}
              className="px-2 text-gray-500 hover:text-gray-700"
            >
              <FiX size={20} />
            </button>
          )}
          <button 
            onClick={handleSearch} 
            className="px-4 py-3 text-blue-600 hover:text-blue-800 disabled:text-gray-400"
            disabled={isLoading || !searchTerm.trim()}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
            ) : (
              <FiSearch size={20} />
            )}
          </button>
        </div>

         <div className='flex items-center justify-center py-4'>

          <Miniumoff/>
          </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded mb-4">
          Error: {error}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="bg-white p-4 rounded-md text-center text-gray-600 shadow-sm">
          <svg className="animate-spin h-6 w-6 mx-auto mb-2" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Searching for medicines...
        </div>

        
      )}

      {/* Search Results as Cart Products */}
      {searchResults.length > 0 ? (
        <div className="bg-white rounded-md shadow-sm overflow-hidden">
          <h2 className="bg-gray-50 p-4 text-lg font-semibold border-b flex items-center">
            <FiShoppingCart className="mr-2" /> Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {searchResults.map((medicine, index) => (
              <div 
                key={medicine._id || index} 
                className="relative border rounded-lg overflow-hidden bg-white shadow hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {medicine.offer && (
                  <span className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg z-10">
                    {medicine.offer}% OFF
                  </span>
                )}
                <div className="bg-gray-50 h-48 flex items-center justify-center p-4 relative">
                  <img
                    src={medicine?.images?.[0]?.image || "/api/placeholder/150/150"}
                    alt={medicine.title}
                    className="object-contain h-full max-h-40 w-full"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-medium text-gray-800 mb-2 text-lg h-14 line-clamp-2">{medicine.title}</h3>
                  <div className="flex items-center mb-3">
                    <p className="text-xl font-bold text-gray-900">₹{medicine.price}</p>
                    <p className="ml-2 line-through text-gray-500 text-sm">₹{medicine.originalPrice || 299}</p>
                    {medicine.offer && (
                      <span className="ml-2 text-green-600 text-sm font-medium">
                        {medicine.offer}% OFF
                      </span>
                    )}
                  </div>
                  {medicine.description && (
                    <p className="mt-2 text-sm text-gray-600 h-12 overflow-hidden line-clamp-2">{medicine.description}</p>
                  )}
                  <button 
                    onClick={() => handleAddToCart(medicine)}
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md flex items-center justify-center transition-colors duration-300 font-medium"
                  >
                    <FiPlus size={18} className="mr-2" /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

         
           
        </div>
      ) : (
        searchTerm && !isLoading && (
          <div className="bg-white p-6 rounded-md text-center text-gray-600 border border-gray-200">
            No medicines found for "{searchTerm}".
          </div>
        )
      )}
    </div>
  );
};

export default MedicineSearch;