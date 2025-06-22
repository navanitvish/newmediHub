import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import {
  User, Stethoscope, Heart, Activity, Droplet, TestTube,
  Zap, Thermometer, UserCheck
} from 'lucide-react';

// Icon mapping based on category name or some identifier
const iconMap = {
  'Full Body Checkup': Stethoscope,
  'Diabetes': Droplet,
  "Women's Health": User,
  'Thyroid': Activity,
  'Vitamin': Zap,
  'Blood Studies': TestTube,
  'Heart': Heart,
  'Kidney': Droplet,
  'Liver': Activity,
  'Hairfall': User,
  'Fever': Thermometer,
  'Senior Citizen': UserCheck
};

const HealthCategoriesPage = () => {
  const navigate = useNavigate();

  // Fetch categories using React Query with fetch API
  const { data, isLoading, isError } = useQuery({
    queryKey: ['healthCategories'],
    queryFn: async () => {
      const response = await fetch('https://medisewa.onrender.com/api/v1/packages/pagination?page=1&limit=10');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const result = await response.json();
      
      return result || []; // adjust key as per your actual API response
    },

    staleTime: 15 * 60 * 1000, // 15 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  });

  console.log(data);

  const CategoryCard = ({ category }) => {
    const Icon = iconMap[category.name] || Stethoscope; // fallback icon
        
    return (
      <div
        onClick={() => navigate(`/category/${category._id}`)}
        className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer flex items-center space-x-3 group hover:border-teal-300"
      >
        <div className="relative">
          <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-teal-50 transition-colors">
            <Icon className="w-6 h-6 text-gray-600 group-hover:text-teal-600 transition-colors" />
          </div>
          <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
            {category.totalTests || 0}
          </span>
        </div>
        <div className="flex-1">
          <span className="font-medium text-gray-800 group-hover:text-teal-700 transition-colors">
            {category.title}
          </span>
          <p className="text-xs text-gray-500 mt-1">
            {category.totalTests || 0} test{category.totalTests !== 1 ? 's' : ''} available
          </p>
        </div>
      </div>
    );
  };

  const totalTests = data?.result.reduce((sum, category) => sum + (category.totalTests || 0), 0) || 0;

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Doctor Created Health Checks ({totalTests})
            </h1>
          </div>
        </div>

        {/* Loading & Error State */}
        {isLoading && <p>Loading...</p>}
        {isError && <p className="text-red-500">Failed to load categories.</p>}

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {data?.result.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthCategoriesPage;