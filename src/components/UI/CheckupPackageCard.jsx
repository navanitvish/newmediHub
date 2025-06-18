import React from 'react';

const CheckupPackageCard = ({ 
  package: pkg, 
  onAddToCart 
}) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col h-full shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group">
      {/* Gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10">
        <div className="flex items-start mb-4">
          {/* Icon with modern styling */}
          <div className="w-14 h-14 mr-4 flex-shrink-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-100 shadow-sm group-hover:shadow-md transition-shadow duration-300">
            <img 
              src={pkg.iconSrc || '/api/placeholder/40/40'} 
              alt={pkg.name} 
              className="w-9 h-9 object-contain" 
            />
          </div>
          
          {/* Package details */}
          <div className="flex-grow">
            <h3 className="text-base font-semibold text-gray-900 line-clamp-2 leading-tight mb-2">
              {pkg.name}
            </h3>
            <p className="text-sm text-gray-600 font-medium">
              {pkg.tests}
            </p>
          </div>
        </div>
        
        {/* Tag with modern styling */}
        {pkg.tag && (
          <div className="mb-4">
            <span className={`text-xs font-semibold px-3 py-1.5 rounded-full inline-block ${
              pkg.tag === 'TOP SELLING' 
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm' 
                : 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-sm'
            }`}>
              {pkg.tag}
            </span>
          </div>
        )}
        
        {/* Price section with improved layout */}
        <div className="mt-auto">
          <div className="flex items-baseline mb-4">
            <span className="font-bold text-2xl text-gray-900">
              ₹{pkg.discountPrice}
            </span>
            <span className="text-gray-400 text-sm line-through ml-3 font-medium">
              ₹{pkg.originalPrice}
            </span>
            <span className="text-emerald-600 text-sm ml-3 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
              {pkg.discount}
            </span>
          </div>
          
          {/* Member price with enhanced design */}
          {pkg.memberPrice && (
            <div className="flex items-center text-sm mb-4 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-100 px-3 py-2 rounded-xl">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 mr-2 shadow-sm"></div>
              <span className="font-medium text-amber-800">Member price: ₹{pkg.memberPrice}</span>
            </div>
          )}
          
          {/* Modern Add button */}
          <button 
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] mb-3"
            onClick={() => onAddToCart(pkg)}
          >
            Add to Cart
          </button>
          
          {/* Reports info with modern icons */}
          {pkg.reportTime && (
            <div className="flex items-center text-sm text-gray-500">
              <div className="w-5 h-5 mr-2 flex items-center justify-center rounded-md bg-gray-100">
                <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0h8v12H6V4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-medium">Reports within {pkg.reportTime}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckupPackageCard;