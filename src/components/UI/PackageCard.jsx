
import React from 'react';
import CheckupPackageList from '../../components/UI/CheckupPackageList';
import { useDispatch } from 'react-redux';
import { addLabTest } from '../../redux/slices/labTestSlice';
const Womanwellness = () => {
    const dispatch = useDispatch();
  const handleAddToCart = (pkg) => {
    dispatch (addLabTest({
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
      name: 'HB (Haemoglobin) Test',
      iconSrc: 'https://images.apollo247.in/images/diagnostics/App/Items/Test/Blood_Studies.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max',
      originalPrice: 600,
      discountPrice: 299,
      discount: '50% off',
      reportTime: '6 hours',
      tag: 'POPULAR'
  },
   {
      id: 2,
      name: 'hairfall check ',
      iconSrc: 'https://images.apollo247.in/images/diagnostics/App/Items/Package/Default.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max',
      originalPrice: 600,
      discountPrice: 299,
      discount: '50% off',
      reportTime: '6 hours',
      tag: 'POPULAR'
  },
   {
      id: 3,
      name: 'THS test check ',
      iconSrc: 'https://images.apollo247.in/images/diagnostics/App/Items/Test/Thyroid.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max',
      originalPrice: 600,
      discountPrice: 299,
      discount: '50% off',
      reportTime: '6 hours',
      tag: 'POPULAR'
   },
    {
      id: 4,
      name: 'HBA1c ',
      iconSrc: 'https://images.apollo247.in/images/diagnostics/App/Items/Test/Diabetes.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max',
      originalPrice: 600,
      discountPrice: 299,
      discount: '50% off',
      reportTime: '6 hours',
      tag: 'POPULAR'
  },
   {
      id: 5,
      name: ' LDH test',
      iconSrc: 'https://images.apollo247.in/images/diagnostics/App/Items/Test/Blood_Studies.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max',
      originalPrice: 600,
      discountPrice: 299,
      discount: '50% off',
      reportTime: '6 hours',
      tag: 'POPULAR'
  },
   {
      id: 6,
      name: ' Thyroid Stimulating Hormone ',
      iconSrc: 'https://images.apollo247.in/images/diagnostics/App/Items/Test/Thyroid.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max',
      originalPrice: 600,
      discountPrice: 299,
      discount: '50% off',
      reportTime: '6 hours',
      tag: 'POPULAR'
  },




  ];
  
  return (
    
    <CheckupPackageList
      title="Women Wellness " 
      packageCount={12}
      packages={diagnosticTests}
      viewAllLink="/diagnostic-tests"
      onAddToCart={handleAddToCart}
    />
  );
};

export default Womanwellness;

// Main component that combines both



