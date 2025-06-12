import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Stethoscope, Heart, Activity, Droplet, TestTube, Zap, Thermometer, UserCheck } from 'lucide-react';

const HealthCategoriesPage = () => {
  const navigate = useNavigate();
  
  const healthCategories = [
    { id: 1, name: 'Full Body Checkup', icon: Stethoscope, count: 29, route: 'full-body-checkup' },
    { id: 2, name: 'Diabetes', icon: Droplet, count: 15, route: 'diabetes' },
    { id: 3, name: "Women's Health", icon: User, count: 12, route: 'womens-health' },
    { id: 4, name: 'Thyroid', icon: Activity, count: 8, route: 'thyroid' },
    { id: 5, name: 'Vitamin', icon: Zap, count: 18, route: 'vitamin' },
    { id: 6, name: 'Blood Studies', icon: TestTube, count: 22, route: 'blood-studies' },
    { id: 7, name: 'Heart', icon: Heart, count: 10, route: 'heart' },
    { id: 8, name: 'Kidney', icon: Droplet, count: 7, route: 'kidney' },
    { id: 9, name: 'Liver', icon: Activity, count: 9, route: 'liver' },
    { id: 10, name: 'Hairfall', icon: User, count: 5, route: 'hairfall' },
    { id: 11, name: 'Fever', icon: Thermometer, count: 6, route: 'fever' },
    { id: 12, name: 'Senior Citizen', icon: UserCheck, count: 14, route: 'senior-citizen' }
  ];

  const CategoryCard = ({ category }) => {
    const Icon = category.icon;
    
    return (
      <div 
        onClick={() => navigate(`/category/${category.route}`)}
        className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer flex items-center space-x-3 group hover:border-teal-300"
      >
        <div className="relative">
          <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-teal-50 transition-colors">
            <Icon className="w-6 h-6 text-gray-600 group-hover:text-teal-600 transition-colors" />
          </div>
          <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
            {category.count}
          </span>
        </div>
        <div className="flex-1">
          <span className="font-medium text-gray-800 group-hover:text-teal-700 transition-colors">
            {category.name}
          </span>
          <p className="text-xs text-gray-500 mt-1">
            {category.count} test{category.count !== 1 ? 's' : ''} available
          </p>
        </div>
      </div>
    );
  };

  const totalTests = healthCategories.reduce((sum, category) => sum + category.count, 0);

  return (
    <div className=" bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Doctor Created Health Checks ({totalTests})
            </h1>

          </div>
       
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {healthCategories.map((category) => (
            <CategoryCard 
              key={category.id} 
              category={category}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default HealthCategoriesPage;