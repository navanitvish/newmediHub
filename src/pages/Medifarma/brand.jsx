import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function BrandShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Shop By Brand</h2>
        <a href="/brands" className="text-blue-600 hover:text-blue-800 transition-colors">
          View All Brands
        </a>
      </div>
      
      {/* Brand carousel with navigation */}
      <div className="relative overflow-hidden">
        {/* Only show navigation if we have more brands than visible slots */}
        {totalBrands > visibleBrands && (
          <>
            {/* Left navigation button */}
            <button 
              onClick={handlePrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous brands"
              disabled={isAnimating}
            >
              <ChevronLeft size={24} />
            </button>
            
            {/* Right navigation button */}
            <button 
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next brands"
              disabled={isAnimating}
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
        
        {/* Loading state */}
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-600">Loading brands...</span>
          </div>
        ) : error ? (
          /* Error state */
          <div className="text-center py-12">
            <div className="text-red-500 mb-2">Failed to load brands</div>
            <button 
              onClick={() => window.location.reload()} 
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Try again
            </button>
          </div>
        ) : (
          /* Brands carousel */
          <div className="px-10 overflow-hidden">
            {brandData.length === 0 ? (
              <div className="text-center py-12 text-gray-500">No brands available</div>
            ) : (
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: getTransformValue() }}
              >
                {brandData.map((brand, index) => (
                  <div 
                    key={brand._id || index} 
                    className="flex flex-col items-center transform transition-all duration-300 hover:scale-105 px-2 cursor-pointer"
                    style={{ width: `${100 / Math.min(visibleBrands, totalBrands)}%` }}
                    onClick={() => {
                      // Navigate to brand page
                      window.location.href = `/brand/${brand._id}`;
                    }}
                  >
                    <div className="bg-gray-100 rounded-lg p-4 mb-4 w-40 h-32 flex items-center justify-center hover:bg-gray-200 transition-colors">
                      <img 
                        src={brand.image || "/api/placeholder/200/80"} 
                        alt={`${brand.title || 'Brand'} logo`} 
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          e.target.src = "/api/placeholder/200/80";
                        }}
                      />
                    </div>
                    <span className="font-medium text-center uppercase text-sm hover:text-blue-600 transition-colors">
                      {brand.title || `Brand ${index + 1}`}
                    </span>
                    {/* Show brand description if available */}
                    {brand.description && brand.description !== "no description" && (
                      <span className="text-xs text-gray-500 text-center mt-1 line-clamp-2">
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
          <div className="flex justify-center space-x-2 mt-6">
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
                className={`w-3 h-3 rounded-full transition-colors ${
                  i === currentIndex ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
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