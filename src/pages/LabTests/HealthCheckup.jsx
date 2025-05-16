import React from 'react';
import CheckupPackageList from '../../components/UI/CheckupPackageList';

const HealthCheckups = () => {
  const handleAddToCart = (pkg) => {
    console.log('Added package to cart:', pkg);
    // In a real app you would dispatch an action here
    // dispatch(addToCart(pkg));
  };
  
  // Sample data for health checkup packages
  const healthCheckupPackages = [
    {
      id: 1,
      name: 'Apollo Annual Health Check-Up',
      tests: '88 Tests: HbA1c, Glycated Hemoglobin...',
      iconSrc: '/api/placeholder/40/40',
      originalPrice: 7200,
      discountPrice: 2680,
      discount: '56% off',
      memberPrice: 2546,
      reportTime: '10 hours',
      tag: 'PACKAGE'
    },
    {
      id: 2,
      name: 'Apollo Hairfall Check - Basic',
      tests: '31 Tests: Thyroid Stimulating Hormone...',
      iconSrc: '/api/placeholder/40/40',
      originalPrice: 805,
      discountPrice: 483,
      discount: '50% off',
      reportTime: '10 hours',
      tag: 'TOP SELLING'
    },
    {
      id: 3,
      name: 'Apollo Fever Panel - Basic',
      tests: '33 Tests: ERYTHROCYTE SEDIMENTATION...',
      iconSrc: '/api/placeholder/40/40',
      originalPrice: 1610,
      discountPrice: 966,
      discount: '60% off',
      reportTime: '10 hours',
      tag: 'TOP SELLING'
    },
    {
      id: 4,
      name: 'Apollo Kidney Check - Essential',
      tests: '63 Tests: ALBUMIN - SERUM...',
      iconSrc: '/api/placeholder/40/40',
      originalPrice: 1432,
      discountPrice: 859,
      discount: '60% off',
      reportTime: '10 hours',
      tag: 'TOP SELLING'
    },
    {
      id: 5,
      name: 'Apollo Kidney Check - Basic',
      tests: '63 Tests: ALBUMIN - SERUM...',
      iconSrc: '/api/placeholder/40/40',
      originalPrice: 1432,
      discountPrice: 859,
      discount: '60% off',
      reportTime: '10 hours',
      tag: 'TOP SELLING'
    },
    {
      id: 6,
      name: 'Apollo Kidney Check - Basic',
      tests: '63 Tests: ALBUMIN - SERUM...',
      iconSrc: '/api/placeholder/40/40',
      originalPrice: 1432,
      discountPrice: 859,
      discount: '60% off',
      reportTime: '10 hours',
      tag: 'TOP SELLING'
    },
  ];
  
  return (
    <CheckupPackageList
      title="Popular Health Checkup Packages"
      packageCount={45}
      packages={healthCheckupPackages}
      viewAllLink="/health-checkups"
      onAddToCart={handleAddToCart}
    />
  );
};

export default HealthCheckups;