import React from 'react';
import CheckupPackageList from '../../components/UI/CheckupPackageList';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
const DiagnosticTests = () => {
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
      id: 101,
      name: 'Complete Blood Count (CBC)',
      tests: 'Includes RBC, WBC, Platelet Count...',
      iconSrc: 'https://images.apollo247.in/images/diagnostics/App/Items/Test/Blood_Studies.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max',
      originalPrice: 600,
      discountPrice: 299,
      discount: '50% off',
      reportTime: '6 hours',
      tag: 'POPULAR'
    },
    {
      id: 102,
      name: 'Vitamin D3 Test',
      tests: 'Measures 25-hydroxyvitamin D levels',
      iconSrc: 'https://images.apollo247.in/images/diagnostics/App/Items/Test/Diabetes.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max',
      originalPrice: 1200,
      discountPrice: 720,
      discount: '40% off',
      reportTime: '12 hours',
      tag: 'TOP SELLING'
    },
    {
      id: 103,
      name: 'HbA1c Test',
      tests: 'Monitors blood glucose levels',
      iconSrc: 'https://images.apollo247.in/images/diagnostics/App/Items/Test/Diabetes.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max',
      originalPrice: 800,
      discountPrice: 400,
      discount: '50% off',
      reportTime: '8 hours',
      tag: 'TOP SELLING'
    },
    {
      id: 104,
      name: 'Lipid Profile',
      tests: 'Cholesterol, Triglycerides, HDL, LDL...',
      iconSrc: 'https://images.apollo247.in/images/diagnostics/App/Items/Test/Heart.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max',
      originalPrice: 900,
      discountPrice: 450,
      discount: '50% off',
      reportTime: '8 hours',
      tag: 'RECOMMENDED'
    },
    {
      id: 105,
      name: 'Uric Acid Test',
      tests: 'Measures uric acid levels',
      iconSrc: 'https://images.apollo247.in/images/diagnostics/App/Items/Test/Kidney.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max',
      originalPrice: 700,
      discountPrice: 350,
      discount: '50% off',
      reportTime: '6 hours',
      tag: 'POPULAR'
    },
    {
      id: 106,
      name: 'Thyroid Stimulating Hormone (TSH) Test',
      tests: 'Measures thyroid hormone levels',
      iconSrc: 'https://images.apollo247.in/images/diagnostics/App/Items/Test/Thyroid.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max',
      originalPrice: 1100,
      discountPrice: 550,
      discount: '50% off',
      reportTime: '12 hours',
      tag: 'RECOMMENDED'
    }
    
  ];
  
  return (
    <CheckupPackageList
      title="Diagnostic Tests"
      packageCount={120}
      packages={diagnosticTests}
      viewAllLink="/diagnostic-tests"
      onAddToCart={handleAddToCart}
    />
  );
};

export default DiagnosticTests;

// Main component that combines both



