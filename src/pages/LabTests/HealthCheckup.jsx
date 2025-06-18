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
      name: 'Smart medihub Annual Health Check-Up',
      tests: '88 Tests: HbA1c, Glycated Hemoglobin...',
      iconSrc: 'https://images.apollo247.in/images/diagnostics/App/Items/Package/Full_Body_Checkup.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max',
      originalPrice: 7200,
      discountPrice: 2680,
      discount: '56% off',
      reportTime: '10 hours',
      tag: 'PACKAGE'
    },
    {
      id: 2,
      name: 'Smart medihub Hairfall Check - Basic',
      tests: '31 Tests: Thyroid Stimulating Hormone...',
      iconSrc: 'https://images.apollo247.in/images/diagnostics/App/Items/Package/Fever.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max',
      originalPrice: 805,
      discountPrice: 483,
      discount: '50% off',
      reportTime: '10 hours',
      tag: 'TOP SELLING'
    },
    {
      id: 3,
      name: 'Smart medihub Fever Panel - Basic',
      tests: '33 Tests: ERYTHROCYTE SEDIMENTATION...',
      iconSrc: 'https://images.apollo247.in/images/diagnostics/App/Items/Package/Thyroid.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max',
      originalPrice: 1610,
      discountPrice: 966,
      discount: '60% off',
      reportTime: '10 hours',
      tag: 'TOP SELLING'
    },
    {
      id: 4,
      name: 'Smart medihub Kidney Check - Essential',
      tests: '63 Tests: ALBUMIN - SERUM...',
      iconSrc: 'https://images.apollo247.in/images/diagnostics/App/Items/Package/Vitamin.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max',
      originalPrice: 1432,
      discountPrice: 859,
      discount: '60% off',
      reportTime: '10 hours',
      tag: 'TOP SELLING'
    },
    {
      id: 5,
      name: 'Smart medihub Kidney Check - Basic',
      tests: '63 Tests: ALBUMIN - SERUM...',
      iconSrc: 'https://images.apollo247.in/images/diagnostics/App/Items/Package/Kidney.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max',
      originalPrice: 1432,
      discountPrice: 859,
      discount: '60% off',
      reportTime: '10 hours',
      tag: 'TOP SELLING'
    },
    {
      id: 6,
      name: 'Smart medihub Kidney Check - Basic',
      tests: '63 Tests: ALBUMIN - SERUM...',
      iconSrc: 'https://images.apollo247.in/images/icons/diag-item-card-default-icon.svg?tr=q-80,w-100,dpr-1,c-at_max',
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