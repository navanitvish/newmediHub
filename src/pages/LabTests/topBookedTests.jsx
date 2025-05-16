import React from 'react';
import CheckupPackageList from '../../components/UI/CheckupPackageList';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
const TopBookedTests = () => {
    const dispatch = useDispatch();
  const handleAddToCart = (pkg) => {
    dispatch (addToCart({
      id: pkg.id,
      name: pkg.name,
      price: pkg.discountPrice,
      image: pkg.iconSrc,
      quantity: 1
    }));


   
  };
  
  // Sample data for diagnostic tests
  const diagnosticTests = [
    { 
      id: 1, 
      name: 'CBC Test (Complete Blood Count)', 
      icon: '🔬',
      testsIncluded: 30,
      price: 424,
      originalPrice: 565,
      discount: 25,
      memberPrice: 339,
      rating: 4.8,
      reviews: 124,
      sampleType: 'Blood',
      fastingRequired: true
    },
    { 
      id: 2, 
      name: 'HbA1c Test (Hemoglobin A1c)', 
      icon: '📊',
      testsIncluded: 3,
      price: 550,
      originalPrice: 733,
      discount: 25,
      memberPrice: 440,
      rating: 4.7,
      reviews: 98,
      sampleType: 'Blood',
      fastingRequired: true
    },
    { 
      id: 3, 
      name: 'FBS (Fasting Blood Sugar) Test', 
      icon: '📈',
      testsIncluded: 1,
      price: 100,
      originalPrice: 133,
      discount: 25,
      memberPrice: 80,
      rating: 4.9,
      reviews: 156,
      sampleType: 'Blood',
      fastingRequired: true
    },
    { 
      id: 4, 
      name: 'Lipid Profile Test', 
      icon: '🫀',
      testsIncluded: 8,
      price: 962,
      originalPrice: 1283,
      discount: 25,
      memberPrice: 770,
      rating: 4.6,
      reviews: 89,
      sampleType: 'Blood',
      fastingRequired: true
    },
    { 
      id: 5, 
      name: 'Liver Function Test', 
      icon: '🫁',
      testsIncluded: 12,
      price: 750,
      originalPrice: 1000,
      discount: 25,
      memberPrice: 600,
      rating: 4.8,
      reviews: 113,
      sampleType: 'Blood',
      fastingRequired: true
    },
    { 
      id: 6, 
      name: 'Kidney Function Test', 
      icon: '🫘',
      testsIncluded: 10,
      price: 850,
      originalPrice: 1133,
      discount: 25,
      memberPrice: 680,
      rating: 4.7,
      reviews: 78,
      sampleType: 'Blood',
      fastingRequired: true
    }
    
  ];
  
  return (
    <CheckupPackageList
      title="Top Booked Tests"
      packageCount={120}
      packages={diagnosticTests}
      viewAllLink="/diagnostic-tests"
      onAddToCart={handleAddToCart}
    />
  );
};

export default TopBookedTests;

// Main component that combines both



