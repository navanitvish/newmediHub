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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            {title}
          </h2>
          {packageCount && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-700 border border-teal-200">
              {packageCount} packages
            </span>
          )}
        </div>
        {viewAllLink && (
          <a 
            href={viewAllLink} 
            className="group inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-teal-700 hover:text-teal-800 bg-gradient-to-r from-teal-50 to-cyan-50 hover:from-teal-100 hover:to-cyan-100 rounded-lg border border-teal-200 transition-all duration-200 hover:shadow-md hover:scale-105"
          >
            View All
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        )}
      </div>
     
      {/* Carousel Section */}
      <div className="relative group">
        {/* Enhanced Navigation Buttons */}
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl border border-gray-200/50 hover:bg-white hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </button>
       
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl border border-gray-200/50 hover:bg-white hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="h-6 w-6 text-gray-700" />
        </button>
       
        {/* Enhanced Package Cards Container */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-50/50 to-white/50 p-6">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              scrollSnapType: 'x mandatory'
            }}
          >
            {packages.map((pkg, index) => (
              <div 
                key={pkg.id} 
                className="flex-none w-72 scroll-snap-align-start"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <div className="transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                  <CheckupPackageCard
                    package={pkg}
                    onAddToCart={onAddToCart}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Gradient Overlays for Visual Polish */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
      </div>
      
      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scroll-snap-align-start {
          scroll-snap-align: start;
        }
      `}</style>
    </div>
  );
};

export default CheckupPackageList;