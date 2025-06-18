import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';



export default function BrandShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isAnimating, setIsAnimating] = useState(false);

  const navigate = useNavigate();
  const visibleBrands = 6; // Number of brands visible at once

  // Fetch brands using React Query directly
  const { data: brandResponse, isLoading, error } = useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      const response = await fetch('https://medisewa.onrender.com/api/v1/brands/getAll');
      if (!response.ok) {
        throw new Error('Failed to fetch brands');
      }
      return response.json();
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  });

  // Extract brands from response
  const brandData = brandResponse?.result || [];
  const totalBrands = brandData.length;
  const maxIndex = Math.max(0, totalBrands - visibleBrands);

  const handlePrevious = () => {
    if (isAnimating || totalBrands <= visibleBrands) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => {
      // Move backward by 1, or loop to the end if at the beginning
      return prevIndex === 0 ? maxIndex : Math.max(0, prevIndex - 1);
    });
    
    // Reset animation flag after transition completes
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    if (isAnimating || totalBrands <= visibleBrands) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => {
      // Move forward by 1, or loop to the beginning if at the end
      return prevIndex >= maxIndex ? 0 : prevIndex + 1;
    });
    
    // Reset animation flag after transition completes
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Calculate the transform value based on the current index
  const getTransformValue = () => {
    if (totalBrands <= visibleBrands) return 'translateX(0)';
    
    const itemWidth = 100 / totalBrands;
    return `translateX(-${currentIndex * itemWidth * visibleBrands / Math.min(visibleBrands, totalBrands)}%)`;
  };

  // Handle brand click navigation
  const handleBrandClick = (brand) => {
    // Implement your navigation logic here

    navigate(`/brands/${brand._id}`);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="flex justify-between items-center mb-12">
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
            Shop By Brand
          </h2>
          <p className="text-gray-600 text-lg">Discover trusted healthcare brands</p>
        </div>
        <a 
          href="/brands" 
          className="group text-blue-600 hover:text-blue-700 transition-all duration-300 font-semibold text-lg flex items-center gap-2 hover:gap-3"
        >
          View All Brands 
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
      </div>
      
      {/* Brand carousel with navigation */}
      <div className="relative overflow-hidden group">
        {/* Only show navigation if we have more brands than visible slots */}
        {totalBrands > visibleBrands && (
          <>
            {/* Left navigation button */}
            <button 
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/95 backdrop-blur-sm rounded-full shadow-xl p-4 hover:shadow-2xl border border-gray-100 transition-all duration-300 hover:scale-110 disabled:opacity-0 disabled:cursor-not-allowed opacity-0 group-hover:opacity-100"
              aria-label="Previous brands"
              disabled={isAnimating}
            >
              <ChevronLeft className="h-6 w-6 text-gray-700" />
            </button>
            
            {/* Right navigation button */}
            <button 
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/95 backdrop-blur-sm rounded-full shadow-xl p-4 hover:shadow-2xl border border-gray-100 transition-all duration-300 hover:scale-110 disabled:opacity-0 disabled:cursor-not-allowed opacity-0 group-hover:opacity-100"
              aria-label="Next brands"
              disabled={isAnimating}
            >
              <ChevronRight className="h-6 w-6 text-gray-700" />
            </button>
          </>
        )}
        
        {/* Loading state */}
        {isLoading ? (
          <div className="flex flex-col justify-center items-center h-64 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-3xl">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
              <div className="absolute top-0 left-0 animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-blue-600"></div>
            </div>
            <span className="mt-6 text-gray-600 font-medium text-lg">Loading brands...</span>
          </div>
        ) : error ? (
          /* Error state */
          <div className="text-center py-20 bg-gradient-to-br from-red-50 to-red-100/50 rounded-3xl">
            <div className="text-red-600 mb-4 text-xl font-semibold">Failed to load brands</div>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Try again
            </button>
          </div>
        ) : (
          /* Brands carousel */
          <div className="px-12 overflow-hidden">
            {brandData.length === 0 ? (
              <div className="text-center py-20 text-gray-500 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-3xl">
                <div className="text-xl font-medium">No brands available</div>
              </div>
            ) : (
              <div 
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: getTransformValue() }}
              >
                {brandData.map((brand, index) => (
                  <div 
                    key={brand._id || index} 
                    className="flex flex-col items-center transform transition-all duration-300 hover:scale-105 px-3 cursor-pointer group/brand"
                    style={{ width: `${100 / Math.min(visibleBrands, totalBrands)}%` }}
                    onClick={() => handleBrandClick(brand)}
                  >
                    <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-100 rounded-2xl p-6 mb-6 w-44 h-36 flex items-center justify-center hover:border-blue-200 hover:shadow-2xl transition-all duration-300 group-hover/brand:shadow-xl group-hover/brand:-translate-y-2">
                      <img 
                        src={brand.image || "/api/placeholder/200/80"} 
                        alt={`${brand.title || 'Brand'} logo`} 
                        className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover/brand:scale-110"
                        onError={(e) => {
                          e.target.src = "/api/placeholder/200/80";
                        }}
                      />
                    </div>
                    <span className="font-bold text-center uppercase text-sm text-gray-800 hover:text-blue-600 transition-colors duration-300 tracking-wider">
                      {brand.title || `Brand ${index + 1}`}
                    </span>
                    {/* Show brand description if available */}
                    {brand.description && brand.description !== "no description" && (
                      <span className="text-xs text-gray-500 text-center mt-2 line-clamp-2 px-2 leading-relaxed">
                        {brand.description}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Indicators */}
        {totalBrands > visibleBrands && (
          <div className="flex justify-center space-x-3 mt-12">
            {Array.from({ length: maxIndex + 1 }, (_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentIndex(i);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  i === currentIndex 
                    ? 'bg-blue-600 scale-125 shadow-lg' 
                    : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}