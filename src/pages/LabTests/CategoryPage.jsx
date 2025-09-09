import React, { useState } from 'react';
import { useParams, useNavigate,Link } from 'react-router-dom';
import { 

  ShoppingCart, 
 
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch,useSelector } from 'react-redux';
import { addLabTest } from '../../redux/slices/labTestSlice';
import { ArrowLeft, User, Loader2, X, Eye, Plus } from 'lucide-react';
import { selectLabTestTotalQuantity } from '../../redux/slices/labTestSlice';

// Test List Modal Component
const TestListModal = ({ isOpen, onClose, package: pkg }) => {
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleAddIndividualTest = (test) => {
    const testItem = {
      id: test._id,
      name: test.name,
      description: test.description,
      price: test.price,
      type: 'individual',
      createdAt: test.createdAt
    };
    
    dispatch(addLabTest(testItem));
    alert(`Added ${test.name} to cart!`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{pkg?.title}</h2>
            <p className="text-sm text-gray-500 mt-1">{pkg?.tests?.length || 0} Tests Included</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-96">
          {pkg?.description && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
              <p className="text-gray-600 text-sm">{pkg.description}</p>
            </div>
          )}

          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-3">Tests Included</h3>
            {pkg?.tests && pkg.tests.length > 0 ? (
              <div className="space-y-3">
                {pkg.tests.map((test, index) => (
                  <div key={test._id || index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{test.name}</h4>
                        {test.description && (
                          <p className="text-sm text-gray-600 mb-2">{test.description}</p>
                        )}
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>Individual Price: ₹{test.price}</span>
                          {test.createdAt && (
                            <span>Added: {new Date(test.createdAt).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                      <div className="ml-4 flex flex-col items-end space-y-2">
                        <span className="text-lg font-semibold text-gray-900">₹{test.price}</span>
                        <button
                          onClick={() => handleAddIndividualTest(test)}
                          className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded transition-colors"
                        >
                          Add Individual
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No tests available</p>
            )}
          </div>

          {/* Package Pricing Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mt-6">
            <h3 className="font-semibold text-gray-800 mb-3">Package Pricing</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Original Price:</span>
                <span className="font-medium">₹{pkg?.price}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Discount ({pkg?.discount}% off):</span>
                <span className="font-medium text-green-600">-₹{Math.round((pkg?.price * pkg?.discount) / 100)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Package Price:</span>
                <span className="text-green-600">₹{pkg?.discountedPrice || (pkg?.price - Math.round((pkg?.price * pkg?.discount) / 100))}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Package Card Component
const PackageCard = ({ pkg, onAddToCart, onViewTests }) => {
  const discountedPrice = pkg.discountedPrice || (pkg.price - Math.round((pkg.price * pkg.discount) / 100));
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <User className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-sm">{pkg.title}</h3>
            <p className="text-sm text-gray-500">{pkg.tests?.length || 0} Tests Included</p>
          </div>
        </div>
        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium">
          PACKAGE
        </span>
      </div>

      {pkg.description && (
        <div className="mb-4">
          <p className="text-xs text-gray-600 line-clamp-2">{pkg.description}</p>
        </div>
      )}

      {pkg.discount && (
        <div className="bg-green-50 text-green-700 text-xs font-medium px-2 py-1 rounded mb-4">
          {pkg.discount}% OFF - Limited Time!
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-gray-900">₹{discountedPrice}</span>
          <span className="text-sm text-gray-500 line-through">₹{pkg.price}</span>
          <span className="text-sm font-medium text-green-600">{pkg.discount}% off</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button 
          onClick={() => onViewTests(pkg)}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-xl transition duration-300 flex items-center justify-center space-x-2"
        >
          <Eye className="w-4 h-4" />
          <span>View Tests</span>
        </button>
        <button 
          onClick={() => onAddToCart(pkg)}
          className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-300 flex items-center justify-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
};

// Loading Component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-12">
    <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
    <span className="ml-2 text-gray-600">Loading package details...</span>
  </div>
);

// Error Component
const ErrorMessage = ({ message, onRetry }) => (
  <div className="text-center py-12">
    <div className="text-red-500 text-lg mb-2">Error loading package</div>
    <div className="text-gray-400 mb-4">{message}</div>
    <button 
      onClick={onRetry}
      className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition duration-300"
    >
      Try Again
    </button>
  </div>
);

const CategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [topDeals, setTopDeals] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const labQuantity = useSelector(selectLabTestTotalQuantity) || 0;

  // API integration using React Query
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['package', categoryId],
    queryFn: async () => {
      const response = await fetch(`https://medisawabackend.onrender.com/api/v1/packages/getOne/${categoryId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch package: ${response.status} ${response.statusText}`);
      }
      const result = await response.json();
      
      // Handle the new API response structure
      if (result.success && result.result) {
        return result.result;
      }
      
      // Fallback for other response formats
      return result?.data || result;
    },
    enabled: !!categoryId, // Only run query if categoryId exists
    staleTime: 15 * 60 * 1000, // 15 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Default filter options based on tests in the package
  const getFilterOptions = (packageData) => {
    if (!packageData?.tests) return [];
    return packageData.tests.map(test => test.name);
  };

  const categoryTitles = {
    'full-body-checkup': 'Full Body Checkup',
    'diabetes': 'Diabetes Tests',
    'womens-health': "Women's Health",
    'thyroid': 'Thyroid Tests',
    'vitamin': 'Vitamin Tests',
    'blood-studies': 'Blood Studies',
    'heart': 'Heart Tests',
    'kidney': 'Kidney Tests',
    'liver': 'Liver Tests',
    'hairfall': 'Hairfall Tests',
    'fever': 'Fever Tests',
    'senior-citizen': 'Senior Citizen Tests'
  };

  // Since we're getting a single package from API, we'll display it as an array
  const packages = data ? [data] : [];
  const filters = data ? getFilterOptions(data) : [];
  const title = data?.title || categoryTitles[categoryId] || 'Health Package';
  const packageCount = packages.length;

  const handleFilterChange = (filter) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const handleAddToCart = (packageItem) => {
    const discountedPrice = packageItem.discountedPrice || (packageItem.price - Math.round((packageItem.price * packageItem.discount) / 100));
    const cartItem = {
      id: packageItem._id,
      name: packageItem.title,
      price: discountedPrice,
      tests: packageItem.tests?.length || 0,
      originalPrice: packageItem.price,
      testsDetails: packageItem.tests,
      type: 'package',
      discount: packageItem.discount,
      description: packageItem.description
    };
    
    // Dispatch to Redux store
    dispatch(addLabTest(cartItem));
    alert(`Added ${packageItem.title} package to cart!`);
  };

  const handleViewTests = (packageItem) => {
    setSelectedPackage(packageItem);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
  };

  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <ErrorMessage 
            message={error?.message || 'Something went wrong'} 
            onRetry={() => refetch()}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center text-teal-600 hover:text-teal-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              {title} ({packageCount})
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort By</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="">Select</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="tests-high">Most Tests</option>
            </select>
          </div>
        </div>

        <div className="flex space-x-6">
          {/* Filters Sidebar */}
          <div className="w-80 bg-white rounded-lg border border-gray-200 p-6 h-fit">
            <h2 className="font-bold text-gray-900 mb-4">Filters</h2>
            
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Type of Tests</h3>
              <label className="flex items-center space-x-3 mb-2">
                <input 
                  type="checkbox" 
                  checked={topDeals}
                  onChange={(e) => setTopDeals(e.target.checked)}
                  className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                />
                <span className="text-sm text-gray-700">Top Deals</span>
              </label>
            </div>

            {filters.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Tests in Package</h3>
                <div className="space-y-2">
                  {filters.map((test, index) => (
                    <label key={index} className="flex items-start space-x-3">
                      <input 
                        type="checkbox" 
                        checked={selectedFilters.includes(test)}
                        onChange={() => handleFilterChange(test)}
                        className="rounded border-gray-300 mt-0.5 text-teal-600 focus:ring-teal-500"
                      />
                      <span className="text-sm text-gray-700 leading-5">{test}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Package Display */}
          <div className="flex-1">
            {packages.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {packages.map((pkg) => (
                  <PackageCard 
                    key={pkg._id} 
                    pkg={pkg} 
                    onAddToCart={handleAddToCart}
                    onViewTests={handleViewTests}
                  />
                ))}
              </div>
            ) : (
              <ErrorMessage 
                message="No package available" 
                onRetry={() => refetch()}
              />
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-50">
          <Link
            to="/cart"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg flex items-center justify-center transition-colors"
          >
            <ShoppingCart size={24} />
            {labQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                {labQuantity}
              </span>
            )}
          </Link>
        </div>

      {/* Test List Modal */}
      <TestListModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        package={selectedPackage}
      />
    </div>
  );
};

export default CategoryPage;