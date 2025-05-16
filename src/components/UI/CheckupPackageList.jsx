// 2. CheckupPackageList.jsx
import React from 'react';
import CheckupPackageCard from './CheckupPackageCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CheckupPackageList = ({
  title,
  packageCount,
  packages,
  viewAllLink,
  onAddToCart
}) => {
  const scrollContainerRef = React.useRef(null);
  
  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const scrollAmount = direction === 'left' ? -300 : 300;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">
          {title} {packageCount && `(${packageCount})`}
        </h2>
        {viewAllLink && (
          <a href={viewAllLink} className="text-teal-700 hover:underline text-sm">
            View All
          </a>
        )}
      </div>
      
      <div className="relative">
        {/* Navigation buttons */}
        <button 
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>
        
        <button 
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="h-5 w-5 text-gray-700" />
        </button>
        
        {/* Package cards container */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {packages.map((pkg) => (
            <div key={pkg.id} className="flex-none w-60">
              <CheckupPackageCard 
                package={pkg} 
                onAddToCart={onAddToCart} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckupPackageList;