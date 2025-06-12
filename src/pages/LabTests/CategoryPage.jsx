import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User } from 'lucide-react';

// Package Card Component
const PackageCard = ({ pkg, onAddToCart }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
          <User className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 text-sm">{pkg.name}</h3>
          <p className="text-sm text-gray-500">{pkg.tests} Tests Included</p>
        </div>
      </div>
      <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium">
        {pkg.type}
      </span>
    </div>

    {pkg.badges && (
      <div className="flex space-x-2 mb-3">
        {pkg.badges.map((badge, index) => (
          <span key={index} className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
            {badge}
          </span>
        ))}
      </div>
    )}

    {pkg.offer && (
      <div className="bg-green-50 text-green-700 text-xs font-medium px-2 py-1 rounded mb-4">
        {pkg.offer}
      </div>
    )}

    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-bold text-gray-900">₹{pkg.discountedPrice}</span>
        <span className="text-sm text-gray-500 line-through">₹{pkg.originalPrice}</span>
        <span className="text-sm font-medium text-green-600">{pkg.discount}% off</span>
      </div>
      <button 
        onClick={() => onAddToCart(pkg)}
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-300"
      >
        Add
      </button>
    </div>
  </div>
);

const CategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [topDeals, setTopDeals] = useState(false);
  const [sortBy, setSortBy] = useState('');

  // Sample packages data for different categories
  const packageData = {
    'full-body-checkup': [
      {
        id: 1,
        name: 'Apollo Prime Plus Full Body Checkup',
        tests: 71,
        originalPrice: 5375,
        discountedPrice: 2150,
        discount: 60,
        offer: 'BUY 2, GET EXTRA 15% OFF!',
        type: 'PACKAGE'
      },
      {
        id: 2,
        name: 'Apollo Prime Full Body Checkup',
        tests: 68,
        originalPrice: 4569,
        discountedPrice: 1828,
        discount: 60,
        offer: 'BUY 2, GET EXTRA 15% OFF!',
        type: 'PACKAGE'
      },
      {
        id: 3,
        name: 'Apollo Regular Full Body Health Check',
        tests: 56,
        originalPrice: 2954,
        discountedPrice: 1182,
        discount: 60,
        offer: 'BUY 2, GET EXTRA 15% OFF!',
        type: 'PACKAGE'
      }
    ],
    'diabetes': [
      {
        id: 8,
        name: 'Diabetes Basic Profile',
        tests: 12,
        originalPrice: 1500,
        discountedPrice: 600,
        discount: 60,
        offer: 'BUY 2, GET EXTRA 10% OFF!',
        type: 'PACKAGE'
      },
      {
        id: 9,
        name: 'Diabetes Advanced Checkup',
        tests: 18,
        originalPrice: 2800,
        discountedPrice: 1120,
        discount: 60,
        offer: 'LIMITED TIME OFFER',
        type: 'PACKAGE'
      }
    ],
    'womens-health': [
      {
        id: 11,
        name: "Women's Wellness Complete",
        tests: 45,
        originalPrice: 4500,
        discountedPrice: 1800,
        discount: 60,
        offer: 'WOMEN SPECIAL',
        type: 'PACKAGE'
      }
    ],
    'thyroid': [
      {
        id: 12,
        name: 'Thyroid Function Test',
        tests: 8,
        originalPrice: 1200,
        discountedPrice: 480,
        discount: 60,
        offer: 'THYROID SPECIAL',
        type: 'PACKAGE'
      }
    ],
    'vitamin': [
      {
        id: 13,
        name: 'Vitamin D Test',
        tests: 5,
        originalPrice: 800,
        discountedPrice: 320,
        discount: 60,
        offer: 'VITAMIN BOOST',
        type: 'PACKAGE'
      }
    ],
    'blood-studies': [
      {
        id: 14,
        name: 'Complete Blood Count',
        tests: 22,
        originalPrice: 2000,
        discountedPrice: 800,
        discount: 60,
        offer: 'BLOOD TEST SPECIAL',
        type: 'PACKAGE'
      }
    ],
    'heart': [
      {
        id: 15,
        name: 'Cardiac Risk Profile',
        tests: 10,
        originalPrice: 1800,
        discountedPrice: 720,
        discount: 60,
        offer: 'HEART HEALTH',
        type: 'PACKAGE'
      }
    ],
    'kidney': [
      {
        id: 16,
        name: 'Kidney Function Test',
        tests: 7,
        originalPrice: 1000,
        discountedPrice: 400,
        discount: 60,
        offer: 'KIDNEY CARE',
        type: 'PACKAGE'
      }
    ],
    'liver': [
      {
        id: 17,
        name: 'Liver Function Test',
        tests: 9,
        originalPrice: 1100,
        discountedPrice: 440,
        discount: 60,
        offer: 'LIVER HEALTH',
        type: 'PACKAGE'
      }
    ],
    'hairfall': [
      {
        id: 18,
        name: 'Hair Loss Analysis',
        tests: 5,
        originalPrice: 1500,
        discountedPrice: 600,
        discount: 60,
        offer: 'HAIR CARE',
        type: 'PACKAGE'
      }
    ],
    'fever': [
      {
        id: 19,
        name: 'Fever Panel',
        tests: 6,
        originalPrice: 900,
        discountedPrice: 360,
        discount: 60,
        offer: 'FEVER DETECTION',
        type: 'PACKAGE'
      }
    ],
    'senior-citizen': [
      {
        id: 20,
        name: 'Senior Citizen Health Package',
        tests: 14,
        originalPrice: 3000,
        discountedPrice: 1200,
        discount: 60,
        offer: 'SENIOR CARE',
        type: 'PACKAGE'
      }
    ]
  };

  const filterOptions = {
    'full-body-checkup': [
      'CBC Test (Complete Blood Count)',
      'PPBS Test (Post-Prandial Blood Sugar)',
      'Urine Routine Test',
      'CRP Test (C - Reactive Protein)',
      'Thyroid Profile (T3 T4 TSH) Test'
    ],
    'diabetes': [
      'HbA1c Test',
      'Fasting Blood Sugar',
      'Post Meal Blood Sugar'
    ],
    'womens-health': [
      'PAP Smear',
      'Mammography',
      'Hormonal Profile'
    ],
    'thyroid': [
      'TSH Test',
      'T3 Test',
      'T4 Test'
    ],
    'vitamin': [
      'Vitamin D Test',
      'Vitamin B12 Test',
      'Folic Acid Test'
    ],
    'blood-studies': [
      'CBC Test',
      'ESR Test',
      'Blood Group Test'
    ],
    'heart': [
      'ECG Test',
      'Lipid Profile',
      'Troponin Test'
    ],
    'kidney': [
      'Creatinine Test',
      'Urea Test',
      'Uric Acid Test'
    ],
    'liver': [
      'SGPT Test',
      'SGOT Test',
      'Bilirubin Test'
    ],
    'hairfall': [
      'Iron Test',
      'Zinc Test',
      'Protein Test'
    ],
    'fever': [
      'Malaria Test',
      'Dengue Test',
      'Typhoid Test'
    ],
    'senior-citizen': [
      'Bone Density Test',
      'Vitamin D Test',
      'Complete Health Check'
    ]
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

  const packages = packageData[categoryId] || [];
  const filters = filterOptions[categoryId] || [];
  const title = categoryTitles[categoryId] || 'Health Tests';
  const packageCount = packages.length;

  const handleFilterChange = (filter) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const handleAddToCart = (packageItem) => {
    const cartItem = {
      id: packageItem.id,
      name: packageItem.name,
      price: packageItem.discountedPrice,
      tests: packageItem.tests,
      originalPrice: packageItem.originalPrice
    };
    console.log('Added to cart:', cartItem);
    // You can implement actual cart functionality here
    alert(`Added ${packageItem.name} to cart!`);
  };

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
                <h3 className="font-semibold text-gray-800 mb-3">Must Have Tests</h3>
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

          {/* Packages Grid */}
          <div className="flex-1">
            {packages.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {packages.map((pkg) => (
                  <PackageCard 
                    key={pkg.id} 
                    pkg={pkg} 
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg mb-2">No packages available</div>
                <div className="text-gray-400">Check back later for more options</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;