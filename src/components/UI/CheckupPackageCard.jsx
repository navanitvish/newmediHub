import React from 'react';

const CheckupPackageCard = ({ 
  package: pkg, 
  onAddToCart 
}) => {
  return (
    <div className="border rounded-lg p-4 flex flex-col h-full">
      <div className="flex items-start mb-3">
        {/* Icon */}
        <div className="w-12 h-12 mr-3 flex-shrink-0 flex items-center justify-center rounded-md bg-purple-100">
          <img 
            src={pkg.iconSrc || '/api/placeholder/40/40'} 
            alt={pkg.name} 
            className="w-8 h-8 object-contain" 
          />
        </div>
        
        {/* Package details */}
        <div className="flex-grow">
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
            {pkg.name}
          </h3>
          <p className="text-xs text-gray-600 mt-1">
            {pkg.tests}
          </p>
        </div>
      </div>
      
      {/* Tag */}
      {pkg.tag && (
        <div className="mb-3">
          <span className={`text-xs px-2 py-0.5 rounded inline-block ${
            pkg.tag === 'TOP SELLING' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-purple-100 text-purple-800'
          }`}>
            {pkg.tag}
          </span>
        </div>
      )}
      
      {/* Price section */}
      <div className="mt-auto">
        <div className="flex items-center mb-3">
          <span className="font-bold text-lg">
            ₹{pkg.discountPrice}
          </span>
          <span className="text-gray-500 text-xs line-through ml-2">
            ₹{pkg.originalPrice}
          </span>
          <span className="text-green-600 text-xs ml-2">
            {pkg.discount}
          </span>
        </div>
        
        {/* Member price if available */}
        {pkg.memberPrice && (
          <div className="flex items-center text-xs mb-3 bg-amber-50 px-2 py-1 rounded">
            <div className="w-3 h-3 rounded-full bg-amber-400 mr-1"></div>
            <span>Member price: ₹{pkg.memberPrice}</span>
          </div>
        )}
        
        {/* Add button */}
        <button 
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-300"
          onClick={() => onAddToCart(pkg)}
        >
          Add
        </button>
        
        {/* Reports info */}
        {pkg.reportTime && (
          <div className="flex items-center mt-2 text-xs text-gray-500">
            <svg className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0h8v12H6V4z" clipRule="evenodd" />
            </svg>
            <span>Reports within {pkg.reportTime}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckupPackageCard;