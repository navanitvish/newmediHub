import React from 'react';
import { useQuery } from '@tanstack/react-query';
import CheckupPackageList from '../../components/UI/CheckupPackageList';
import { addLabTest } from '../../redux/slices/labTestSlice';
import { useDispatch } from 'react-redux';

const HealthCheckups = () => {
  const dispatch = useDispatch();
  
  const handleAddToCart = (pkg) => { 
    console.log('Added package to cart:', pkg);
    dispatch(addLabTest(pkg));
  };

  // Using React Query to fetch data
  const { data: apiResponse, isLoading, error } = useQuery({
    queryKey: ['topMustPackages'],
    queryFn: async () => {
      const response = await fetch('https://medisawabackend.onrender.com/api/v1/packages/topMustPackage');
      if (!response.ok) {
        throw new Error('Failed to fetch packages');
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  // Function to transform API data to match expected format
  const transformApiData = (apiData) => {
    if (!apiData || !Array.isArray(apiData)) return [];
    
    return apiData.map((item, index) => {
      const pkg = item.package;
      return {
        id: pkg._id || index + 1,
        name: pkg.title || 'Health Package',
        tests: pkg.tests ? `${pkg.tests.length} Tests included` : 'Tests included',
        iconSrc: 'https://images.apollo247.in/images/diagnostics/App/Items/Package/Full_Body_Checkup.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max', // Default icon
        originalPrice: pkg.price || pkg.originalPrice || 0,
        discountPrice: pkg.discountedPrice || pkg.price || 0,
        discount: pkg.discount ? `${pkg.discount}% off` : '0% off',
        reportTime: '10 hours', // Default report time
        tag: item.totalBookings > 0 ? 'TOP SELLING' : 'PACKAGE',
        description: pkg.description || 'Health checkup package',
        totalBookings: item.totalBookings || 0
      };
    });
  };

  // Sample fallback data (your original data)
  const fallbackPackages = [
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

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-600">Loading health checkup packages...</span>
      </div>
    );
  }

  // Handle error state
  if (error) {
    console.error('API Error:', error);
    return (
      <div className="text-center p-8">
        <div className="text-red-500 mb-4">
          <p className="font-semibold">Failed to load packages</p>
          <p className="text-sm">{error?.message || 'Something went wrong'}</p>
        </div>
        <div className="mt-6">
          <CheckupPackageList
            title="Popular Health Checkup Packages (Fallback)"
            packageCount={fallbackPackages.length}
            packages={fallbackPackages}
            viewAllLink="/health-checkups"
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
    );
  }

  // Transform and use API data if available, otherwise use fallback
  let packages = fallbackPackages;
  let packageCount = fallbackPackages.length;

  if (apiResponse) {
    console.log('Raw API Response:', apiResponse);
    
    // Handle different possible response structures
    const rawPackages = apiResponse.data || apiResponse.packages || apiResponse;
    
    if (Array.isArray(rawPackages) && rawPackages.length > 0) {
      packages = transformApiData(rawPackages);
      packageCount = packages.length;
      console.log('Transformed packages:', packages);
    } else {
      console.warn('API response does not contain expected package data structure');
    }
  }

  return (
    <CheckupPackageList
      title="Popular Health Checkup Packages"
      packageCount={packageCount}
      packages={packages}
      viewAllLink="/health-checkups"
      onAddToCart={handleAddToCart}
    />
  );
};

export default HealthCheckups;