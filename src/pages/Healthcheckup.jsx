import { useState } from 'react';
import HealthCheckCategoriesPage from '../components/UI/HealthCheckCategoriesPage';
import CategoryDetailsPage from '../components/UI/CategoryDetailsPage';
import { healthCategories, categoryPackages, mustHaveTests } from '../data/healthCheckupData';

export default function HealthCheckup() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [showHomePage, setShowHomePage] = useState(true);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    setShowHomePage(false);
  };

  const handleBackClick = () => {
    setShowHomePage(true);
    setActiveCategory(null);
  };
 
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {showHomePage ? (
        <HealthCheckCategoriesPage 
          categories={healthCategories} 
          onCategoryClick={handleCategoryClick} 
        />
      ) : (
        <CategoryDetailsPage 
          category={healthCategories.find(cat => cat.id === activeCategory)}
          packages={categoryPackages[activeCategory]}
          mustHaveTests={mustHaveTests}
          onBackClick={handleBackClick}
        />
      )}
    </div>
  );
}