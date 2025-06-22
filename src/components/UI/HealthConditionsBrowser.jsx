
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter, Grid, List, Star, ShoppingCart, Heart, ArrowLeft } from 'lucide-react';

// Health Condition Card Component
const HealthConditionCard = ({ title, image, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-sm p-4 flex items-center cursor-pointer hover:shadow-md transition-shadow duration-200 border border-gray-200"
      onClick={onClick}
    >
      <div className="w-16 h-16 mr-3 flex items-center justify-center border border-gray-300 rounded-md p-2">
        <img src={image} alt={title} className="w-full h-full object-contain" />
      </div>
      <span className="text-lg font-medium text-gray-800">{title}</span>
    </div>
  );
};

// Health Conditions Browser Component
export const HealthConditionsBrowser = ({ onCategorySelect }) => {
  const { data: categoryResponse, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch('https://medisewa.onrender.com/api/v1/categories/categoryWithSubscategories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      return response.json();
    },
    staleTime: 10 * 60 * 1000,
    cacheTime: 15 * 60 * 1000,
  });

  const conditions = categoryResponse?.result || [];

  const handleConditionClick = (condition) => {
    onCategorySelect(condition);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Browse by Health Conditions</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 animate-pulse">
              <div className="w-16 h-16 mr-3 bg-gray-200 rounded-md"></div>
              <div className="h-4 bg-gray-200 rounded mt-2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Browse by Health Conditions</h1>
        <div className="text-center py-12">
          <p className="text-red-500">Error loading categories: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Browse by Health Conditions</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {conditions.map((condition) => (
          <HealthConditionCard 
            key={condition.id}
            title={condition.name || condition.title}
            image={condition.image || "https://via.placeholder.com/64x64?text=Medicine"}
            onClick={() => handleConditionClick(condition)}
          />
        ))}
      </div>
    </div>
  );
};
