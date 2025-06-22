import React from 'react';
import CheckupPackageList from '../../components/UI/CheckupPackageList';
import { useDispatch } from 'react-redux';
import { addLabTest } from '../../redux/slices/labTestSlice';
import { useQuery } from '@tanstack/react-query';

const TopBookedTests = () => {
  const dispatch = useDispatch();

  // Fetch data using React Query
  const { data: topLabBookedData, isLoading, error } = useQuery({
    queryKey: ['topMustLab'],
    queryFn: async () => {
      const response = await fetch('https://medisewa.onrender.com/api/v1/labs/topMustLab');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  const handleAddToCart = (pkg) => {
    dispatch(addLabTest({
      id: pkg.id,
      name: pkg.name,
      price: pkg.discountPrice || pkg.price,
      image: pkg.iconSrc,
      quantity: 1
    }));
  };

  // Sample data for diagnostic tests (fallback)
  const diagnosticTests = [
    {
      id: 1,
      name: 'CBC Test (Complete Blood Count)',
      iconSrc: 'https://images.apollo247.in/images/diagnostics/App/Items/Test/Blood_Studies.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max',
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
      iconSrc: 'https://images.apollo247.in/images/diagnostics/App/Items/Test/Diabetes.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max',
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
      iconSrc: 'https://images.apollo247.in/images/diagnostics/App/Items/Test/Diabetes.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max',
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
      iconSrc: 'https://images.apollo247.in/images/diagnostics/App/Items/Test/Heart.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max',
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
      iconSrc: 'https://images.apollo247.in/images/diagnostics/App/Items/Package/Default.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max',
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
      iconSrc: 'https://images.apollo247.in/images/diagnostics/App/Items/Test/Kidney.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max',
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

  // Transform API data to match the expected format
  const transformApiData = (apiData) => {
    if (!apiData || !apiData.success || !apiData.result) {
      return [];
    }

    // If result is an array, map each item
    if (Array.isArray(apiData.result)) {
      return apiData.result.map((item, index) => ({
        id: item._id || item.id || index + 1,
        name: item.name || item.testName || 'Unknown Test',
        iconSrc: item.iconSrc || item.image || 'https://images.apollo247.in/images/diagnostics/App/Items/Package/Default.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max',
        testsIncluded: item.testsIncluded || item.testCount || 1,
        price: item.price || item.cost || 0,
        originalPrice: item.originalPrice || item.mrp || item.price,
        discount: item.discount || 25,
        memberPrice: item.memberPrice || item.discountedPrice || item.price,
        rating: item.rating || 4.5,
        reviews: item.reviews || item.reviewCount || 0,
        sampleType: item.sampleType || 'Blood',
        fastingRequired: item.fastingRequired || false,
        discountPrice: item.discountedPrice || item.memberPrice || item.price
      }));
    }

    // If result is a single object, wrap it in an array
    const item = apiData.result;
    return [{
      id: item._id || item.id || 1,
      name: item.name || item.testName || 'Unknown Test',
      iconSrc: item.iconSrc || item.image || 'https://images.apollo247.in/images/diagnostics/App/Items/Package/Default.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max',
      testsIncluded: item.testsIncluded || item.testCount || 1,
      price: item.price || item.cost || 0,
      originalPrice: item.originalPrice || item.mrp || item.price,
      discount: item.discount || 25,
      memberPrice: item.memberPrice || item.discountedPrice || item.price,
      rating: item.rating || 4.5,
      reviews: item.reviews || item.reviewCount || 0,
      sampleType: item.sampleType || 'Blood',
      fastingRequired: item.fastingRequired || false,
      discountPrice: item.discountedPrice || item.memberPrice || item.price
    }];
  };

  // Use API data if available, otherwise use fallback data
  const displayPackages = React.useMemo(() => {
    if (topLabBookedData && topLabBookedData.success) {
      const apiData = transformApiData(topLabBookedData);
      return apiData.length > 0 ? apiData : diagnosticTests;
    }
    return diagnosticTests;
  }, [topLabBookedData]);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="text-gray-500">Loading top booked tests...</span>
      </div>
    );
  }

  // Handle error state
  if (error) {
    console.error('Error fetching top booked tests:', error);
    // Still show fallback data on error
  }

  return (
    <CheckupPackageList
      title={topLabBookedData?.msg || "Top Booked Tests"}
      packageCount={displayPackages.length}
      packages={displayPackages}
      viewAllLink="/diagnostic-tests"
      onAddToCart={handleAddToCart}
    />
  );
};

export default TopBookedTests;