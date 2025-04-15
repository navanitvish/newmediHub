import { useState } from 'react';
import { ChevronRight, ChevronLeft, Upload, FileText, ShoppingCart, Search, User, Menu, X, Calendar, MapPin, Shield, Heart, Clock, Award } from 'lucide-react';

export default function LabTestsPage() {
  // State management
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPackageSlide, setCurrentPackageSlide] = useState(0);
  const [currentTestSlide, setCurrentTestSlide] = useState(0);
  const [currentBlogSlide, setCurrentBlogSlide] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Delhi');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeTab, setActiveTab] = useState('tests');

  // Health checks data
  const healthChecks = [
    { id: 1, name: 'Full Body Checkup', icon: '👤', color: 'bg-blue-100' },
    { id: 2, name: 'Diabetes', icon: '💉', color: 'bg-purple-100' },
    { id: 3, name: 'Women\'s Health', icon: '👩', color: 'bg-pink-100' },
    { id: 4, name: 'Thyroid', icon: '🦋', color: 'bg-teal-100' },
    { id: 5, name: 'Vitamin', icon: '💊', color: 'bg-yellow-100' },
    { id: 6, name: 'Blood Studies', icon: '🩸', color: 'bg-red-100' },
    { id: 7, name: 'Heart', icon: '❤️', color: 'bg-red-100' },
    { id: 8, name: 'Kidney', icon: '🫘', color: 'bg-green-100' },
    { id: 9, name: 'Liver', icon: '🫁', color: 'bg-orange-100' },
    { id: 10, name: 'Hairfall', icon: '💇', color: 'bg-amber-100' },
    { id: 11, name: 'Fever', icon: '🤒', color: 'bg-red-100' },
    { id: 12, name: 'Senior Citizen', icon: '👵', color: 'bg-purple-100' },
  ];

  // Top booked tests data
  const topBookedTests = [
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

  // Popular packages data
  const popularPackages = [
    {
      id: 1,
      name: 'Apollo Prime Health Plan',
      description: '68 Tests: GLUCOSE, FASTING...',
      tag: 'TOP SELLING',
      price: 1700,
      originalPrice: 2833,
      discount: 40,
      icon: '👤',
      reportHours: 10,
      rating: 4.9,
      reviews: 238,
      recommendedFor: 'Adults 18-40 years',
      benefits: ['Early disease detection', 'Comprehensive health overview']
    },
    {
      id: 2,
      name: 'Apollo Fever Panel Complete',
      description: '58 Tests: ERYTHROCYTE SE...',
      price: 2177,
      originalPrice: 2903,
      discount: 25,
      memberPrice: 1742,
      icon: '🤒',
      reportHours: 36,
      rating: 4.7,
      reviews: 156,
      recommendedFor: 'Patients with fever',
      benefits: ['Identify cause of fever', 'Rule out serious infections']
    },
    {
      id: 3,
      name: 'Apollo Thyroid Assessment - Basic',
      description: '33 Tests: Thyroxine (T4, Total...',
      tag: 'TOP SELLING',
      price: 543,
      originalPrice: 724,
      discount: 25,
      memberPrice: 434,
      icon: '🦋',
      reportHours: 10,
      rating: 4.8,
      reviews: 197,
      recommendedFor: 'Adults with thyroid symptoms',
      benefits: ['Monitor thyroid function', 'Track treatment effectiveness']
    },
    {
      id: 4,
      name: 'Apollo Vitamin Check - Basic',
      description: '3 Tests: Calcium, Serum, VITA...',
      tag: 'TOP SELLING VALUE FOR...',
      price: 1814,
      originalPrice: 2419,
      discount: 25,
      memberPrice: 1451,
      icon: '💊',
      reportHours: 10,
      rating: 4.6,
      reviews: 124,
      recommendedFor: 'Adults with fatigue or weakness',
      benefits: ['Identify nutritional deficiencies', 'Guide supplement needs']
    },
    {
      id: 5,
      name: 'Apollo Complete Health Checkup',
      description: '87 Tests: Full Body Assessment...',
      tag: 'BEST SELLER',
      price: 3200,
      originalPrice: 4000,
      discount: 20,
      memberPrice: 2560,
      icon: '🏥',
      reportHours: 24,
      rating: 4.9,
      reviews: 312,
      recommendedFor: 'Adults of all ages',
      benefits: ['Comprehensive health assessment', 'One-time annual checkup']
    },
    {
      id: 6,
      name: 'Apollo Senior Citizen Package',
      description: '72 Tests: Comprehensive Senior Care...',
      tag: 'RECOMMENDED',
      price: 2800,
      originalPrice: 3500,
      discount: 20,
      memberPrice: 2240,
      icon: '👵',
      reportHours: 24,
      rating: 4.8,
      reviews: 186,
      recommendedFor: 'Adults 60+ years',
      benefits: ['Age-specific screenings', 'Chronic disease management']
    }
  ];

  // Health blog data
  const healthBlogs = [
    {
      id: 1,
      title: "Understanding Your Blood Test Results",
      excerpt: "Learn how to interpret common blood test parameters and what they indicate about your health.",
      author: "Dr. Anita Sharma",
      date: "April 10, 2025",
      readTime: "5 min read",
      image: "/api/placeholder/400/250"
    },
    {
      id: 2,
      title: "Why Regular Health Checkups Are Essential",
      excerpt: "Regular health screenings can detect problems before they start or early when treatments work best.",
      author: "Dr. Rajiv Kumar",
      date: "April 8, 2025",
      readTime: "4 min read",
      image: "/api/placeholder/400/250"
    },
    {
      id: 3,
      title: "Fasting vs Non-Fasting Blood Tests: What's the Difference?",
      excerpt: "Understand when and why fasting is required for certain blood tests and how it affects results.",
      author: "Dr. Priya Nair",
      date: "April 5, 2025",
      readTime: "6 min read",
      image: "/api/placeholder/400/250"
    },
    {
      id: 4,
      title: "Managing Diabetes Through Regular Testing",
      excerpt: "Learn about the importance of monitoring blood glucose levels and other critical tests for diabetics.",
      author: "Dr. Sanjay Gupta",
      date: "April 2, 2025",
      readTime: "7 min read",
      image: "/api/placeholder/400/250"
    }
  ];

  // Customer testimonials
  const testimonials = [
    {
      id: 1,
      name: "Priya Singh",
      age: 34,
      location: "Delhi",
      comment: "The home sample collection was so convenient! The phlebotomist was professional and I received my reports within 10 hours. Highly recommended.",
      rating: 5
    },
    {
      id: 2,
      name: "Rahul Verma",
      age: 45,
      location: "Gurgaon",
      comment: "Apollo's comprehensive health package helped me identify early signs of high cholesterol. The doctor consultation included in the package was very helpful.",
      rating: 5
    },
    {
      id: 3,
      name: "Anita Desai",
      age: 62,
      location: "Noida",
      comment: "As a senior citizen, I appreciate the special care taken during sample collection. The reports were easy to understand with color indicators.",
      rating: 4
    }
  ];

  // Lab benefits
  const labBenefits = [
    {
      id: 1,
      title: "NABL Accredited Labs",
      description: "All tests conducted in certified laboratories ensuring accuracy and reliability",
      icon: <Award className="w-8 h-8 text-blue-600" />
    },
    {
      id: 2,
      title: "Free Home Sample Collection",
      description: "Trained phlebotomists visit your home at your preferred time",
      icon: <MapPin className="w-8 h-8 text-blue-600" />
    },
    {
      id: 3,
      title: "Digital Reports in 24 Hours",
      description: "Access your test results online or through our mobile app",
      icon: <Clock className="w-8 h-8 text-blue-600" />
    },
    {
      id: 4,
      title: "Doctor Consultation",
      description: "Free follow-up consultation to understand your test results",
      icon: <User className="w-8 h-8 text-blue-600" />
    }
  ];

  // Function to add item to cart
  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id && cartItem.type === item.type);
    
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id && cartItem.type === item.type
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1, type: item.testsIncluded ? 'test' : 'package' }]);
    }
    
    // Show confirmation message
    alert(`Added ${item.name} to cart!`);
  };

  // Function to remove item from cart
  const removeFromCart = (itemId, type) => {
    setCart(cart.filter(item => !(item.id === itemId && item.type === type)));
  };

  // Function to handle search
  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchQuery}`);
    // In a real application, you would filter results based on the search query
  };

  // Function to handle category click
  const handleCategoryClick = (category) => {
    alert(`Selected category: ${category.name}`);
    // In a real application, you would navigate to category page or filter results
  };

  // Functions to handle carousel navigation
  const slideTestsLeft = () => {
    setCurrentTestSlide(Math.max(0, currentTestSlide - 1));
  };

  const slideTestsRight = () => {
    setCurrentTestSlide(Math.min(topBookedTests.length - 3, currentTestSlide + 1));
  };

  const slidePackagesLeft = () => {
    setCurrentPackageSlide(Math.max(0, currentPackageSlide - 1));
  };

  const slidePackagesRight = () => {
    setCurrentPackageSlide(Math.min(popularPackages.length - 3, currentPackageSlide + 1));
  };

  const slideBlogsLeft = () => {
    setCurrentBlogSlide(Math.max(0, currentBlogSlide - 1));
  };

  const slideBlogsRight = () => {
    setCurrentBlogSlide(Math.min(healthBlogs.length - 3, currentBlogSlide + 1));
  };

  // Function to handle file upload
  const handleFileUpload = () => {
    // In a real application, this would open a file dialog
    alert("Upload prescription functionality would open here");
  };

  // Function to view reports
  const viewReports = () => {
    // In a real application, this would navigate to reports page
    alert("Navigating to reports page");
  };

  // Function to handle city selection
  const handleCityChange = (city) => {
    setSelectedCity(city);
    // In a real application, this would update available tests and pricing
  };

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Get current day's date
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  return (
    <div className="font-sans bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between mt-28">
          <div className="mb-8 md:mb-0 md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Health Checkups & Lab Tests from Your Home</h1>
            <p className="text-xl opacity-90 mb-6">Get accurate results from NABL accredited labs with free home sample collection</p>
            
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <div className="flex items-center mb-3">
                <MapPin className="text-blue-600 w-5 h-5 mr-2" />
                <select 
                  className="text-gray-800 font-medium bg-transparent focus:outline-none w-full"
                  value={selectedCity}
                  onChange={(e) => handleCityChange(e.target.value)}
                >
                  <option value="Delhi">Delhi</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Hyderabad">Hyderabad</option>
                </select>
              </div>
              
              <form onSubmit={handleSearch} className="flex">
                <input
                  type="text"
                  placeholder="Search for tests, packages or health concerns..."
                  className="flex-1 py-3 px-4 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit"
                  className="bg-blue-600 text-white rounded-r-md px-5 py-3 font-medium hover:bg-blue-700 transition"
                >
                  <Search className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
          
          <div className="md:w-2/5">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <Calendar className="w-6 h-6 text-blue-600 mr-3" />
                <div>
                  <h3 className="font-medium text-gray-800">Today's Date</h3>
                  <p className="text-sm text-gray-600">{formattedDate}</p>
                </div>
              </div>
              
              <p className="text-sm text-gray-700 mb-4">
                <span className="font-semibold">Special Offer:</span> Book a Full Body Checkup today and get 40% off
              </p>
              
              <button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-full py-3 rounded-md font-medium hover:from-blue-700 hover:to-purple-700 transition shadow-md"
                onClick={() => addToCart(popularPackages[0])}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lab Benefits Section */}
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {labBenefits.map(benefit => (
            <div key={benefit.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="font-semibold text-gray-800 mb-2">{benefit.title}</h3>
              <p className="text-sm text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Lab tests in {selectedCity}</h1>
          <p className="text-gray-700 mt-2">
            {selectedCity}'s leading diagnostic centres offer a comprehensive range of lab tests using cutting-edge technology and expert care. Benefit from fast, accurate diagnostics with doorstep service and digital reports.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 border-b border-gray-300">
          <div className="flex space-x-6">
            <button 
              className={`py-3 px-1 font-medium border-b-2 ${activeTab === 'tests' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('tests')}
            >
              Tests & Packages
            </button>
            <button 
              className={`py-3 px-1 font-medium border-b-2 ${activeTab === 'health' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('health')}
            >
              Health Concerns
            </button>
            <button 
              className={`py-3 px-1 font-medium border-b-2 ${activeTab === 'blogs' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('blogs')}
            >
              Health Articles
            </button>
          </div>
        </div>

        {/* Doctor Created Health Checks */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Health Categories</h2>
            <button 
              className="text-blue-600 font-medium flex items-center"
              onClick={() => alert("View all health checks")}
            >
              View All
              <ChevronRight size={18} className="ml-1" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {healthChecks.map(check => (
              <div 
                key={check.id} 
                className={`${check.color} rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition text-center hover:scale-105 transform duration-200`}
                onClick={() => handleCategoryClick(check)}
              >
                <div className="mb-3 text-3xl">{check.icon}</div>
                <div className="font-medium">{check.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Upload and Order + View Reports */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div 
            className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5 flex items-center justify-between cursor-pointer hover:shadow-md transition border border-green-100"
            onClick={handleFileUpload}
          >
            <div className="flex items-center">
              <div className="bg-white p-3 rounded-full border border-green-200 mr-4 shadow-sm">
                <Upload size={24} className="text-green-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-800">Upload Prescription</div>
                <div className="text-sm text-gray-600">Get tests recommended by your doctor</div>
              </div>
            </div>
            <ChevronRight size={20} className="text-green-600" />
          </div>
          
          <div 
            className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 flex items-center justify-between cursor-pointer hover:shadow-md transition border border-blue-100"
            onClick={viewReports}
          >
            <div className="flex items-center">
              <div className="bg-white p-3 rounded-full border border-blue-200 mr-4 shadow-sm">
                <FileText size={24} className="text-blue-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-800">View My Reports</div>
                <div className="text-sm text-gray-600">Access all your previous test results</div>
              </div>
            </div>
            <ChevronRight size={20} className="text-blue-600" />
          </div>
        </div>

        {/* Top Booked Tests */}
        <div className="mb-12 relative">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Top Booked Tests</h2>
            <button 
              className="text-blue-600 font-medium flex items-center"
              onClick={() => alert("View all tests")}
            >
              View All
              <ChevronRight size={18} className="ml-1" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden">
            {topBookedTests.slice(currentTestSlide, currentTestSlide + 3).map((test) => (
              <div key={test.id} className="bg-white border border-gray-200 rounded-xl w-full flex-shrink-0 hover:shadow-lg transition duration-300 overflow-hidden">
                <div className="p-5 border-b">
                  <div className="flex items-center mb-3">
                    <div className="text-3xl mr-3">{test.icon}</div>
                    <div>
                      <div className="text-lg font-medium text-gray-800">{test.name}</div>
                      <div className="text-sm text-gray-500">{test.testsIncluded} Tests Included</div>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mt-2">
                    <div className="flex items-center mr-4">
                      <div className="bg-blue-100 text-blue-800 p-1 rounded-md mr-2">
                        <Shield size={14} />
                      </div>
                      <span>NABL Certified</span>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-amber-100 text-amber-800 p-1 rounded-md mr-2">
                        <Clock size={14} />
                      </div>
                      <span>Reports in 10 hrs</span>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-baseline">
                      <span className="text-xl font-bold text-gray-800">₹{test.price}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">₹{test.originalPrice}</span>
                      <span className="text-sm text-green-600 ml-2">{test.discount}% off</span>
                    </div>
                    <div className="flex items-center bg-amber-50 px-2 py-1 rounded">
                      <div className="text-amber-500 mr-1">★</div>
                      <span className="text-sm font-medium">{test.rating}</span>
                      <span className="text-xs text-gray-500 ml-1">({test.reviews})</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center bg-blue-50 rounded-md p-2 mb-4">
                    <div className="text-xs text-blue-800 font-medium flex items-center">
                      <Award size={14} className="mr-1" />
                      Member price: ₹{test.memberPrice}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-xs text-gray-600 mb-4">
                    <div className="flex items-center mr-3">
                      <span className="font-medium mr-1">Sample:</span> {test.sampleType}
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium mr-1">Fasting:</span> {test.fastingRequired ? 'Required' : 'Not Required'}
                    </div>
                  </div>
                  
                  <button 
                    className="bg-blue-600 text-white rounded-lg w-full py-3 text-sm font-medium hover:bg-blue-700 transition"
                    onClick={() => addToCart({...test, type: 'test'})}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {currentTestSlide > 0 && (
            <button 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-50"
              onClick={slideTestsLeft}
            >
              <ChevronLeft size={20} />
            </button>
          )}
          
          {currentTestSlide < topBookedTests.length - 3 && (
            <button 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-50"
              onClick={slideTestsRight}
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>

        {/* Popular Health Checkup Packages */}
        <div className="mb-12 relative">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Popular Health Checkup Packages</h2>
            <button 
              className="text-blue-600 font-medium flex items-center"
              onClick={() => alert("View all packages")}
            >
              View All
              <ChevronRight size={18} className="ml-1" />
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-6 overflow-hidden">
            {popularPackages.slice(currentPackageSlide, currentPackageSlide + 3).map((pack) => (
              <div key={pack.id} className="bg-white border border-gray-200 rounded-xl w-full flex-shrink-0 hover:shadow-lg transition duration-300 overflow-hidden">
                <div className="p-5 border-b relative">
                  {pack.tag && (
                    <div className={`absolute top-0 right-0 text-xs font-bold px-3 py-1 rounded-bl-lg uppercase ${
                      pack.tag.includes('VALUE') ? 'bg-green-100 text-green-800' : 
                      pack.tag.includes('BEST') ? 'bg-red-100 text-red-800' : 
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {pack.tag}
                    </div>
                  )}
                  <div className="flex items-center mb-3">
                    <div className="text-3xl mr-3">{pack.icon}</div>
                    <div>
                      <div className="text-lg font-medium text-gray-800">{pack.name}</div>
                      <div className="text-sm text-gray-500">{pack.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mt-2">
                    <div className="flex items-center mr-4">
                      <div className="bg-blue-100 text-blue-800 p-1 rounded-md mr-2">
                        <User size={14} />
                      </div>
                      <span>For: {pack.recommendedFor}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-amber-100 text-amber-800 p-1 rounded-md mr-2">
                        <Clock size={14} />
                      </div>
                      <span>Reports in {pack.reportHours} hrs</span>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-baseline">
                      <span className="text-xl font-bold text-gray-800">₹{pack.price}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">₹{pack.originalPrice}</span>
                      <span className="text-sm text-green-600 ml-2">{pack.discount}% off</span>
                    </div>
                    <div className="flex items-center bg-amber-50 px-2 py-1 rounded">
                      <div className="text-amber-500 mr-1">★</div>
                      <span className="text-sm font-medium">{pack.rating}</span>
                      <span className="text-xs text-gray-500 ml-1">({pack.reviews})</span>
                    </div>
                  </div>
                  
                  {pack.memberPrice && (
                    <div className="flex items-center bg-blue-50 rounded-md p-2 mb-4">
                      <div className="text-xs text-blue-800 font-medium flex items-center">
                        <Award size={14} className="mr-1" />
                        Member price: ₹{pack.memberPrice}
                      </div>
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <div className="text-xs font-medium text-gray-700 mb-1">Key Benefits:</div>
                    <ul className="text-xs text-gray-600">
                      {pack.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center mb-1">
                          <div className="w-1 h-1 rounded-full bg-blue-600 mr-2"></div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button 
                    className="bg-blue-600 text-white rounded-lg w-full py-3 text-sm font-medium hover:bg-blue-700 transition"
                    onClick={() => addToCart({...pack, type: 'package'})}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {currentPackageSlide > 0 && (
            <button 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-50"
              onClick={slidePackagesLeft}
            >
              <ChevronLeft size={20} />
            </button>
          )}
          
          {currentPackageSlide < popularPackages.length - 3 && (
            <button 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-50"
              onClick={slidePackagesRight}
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>

      

        {/* Health Articles */}
        <div className="mb-12 relative">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Health Articles & Resources</h2>
            <button 
              className="text-blue-600 font-medium flex items-center"
              onClick={() => alert("View all articles")}
            >
              Read More
              <ChevronRight size={18} className="ml-1" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden">
            {healthBlogs.slice(currentBlogSlide, currentBlogSlide + 3).map((blog) => (
              <div key={blog.id} className="bg-white border border-gray-200 rounded-xl w-full flex-shrink-0 hover:shadow-lg transition duration-300 overflow-hidden">
                <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
                <div className="p-5">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">{blog.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{blog.excerpt}</p>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                      By {blog.author} • {blog.date}
                    </div>
                    <div className="text-xs text-gray-500">
                      {blog.readTime}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {currentBlogSlide > 0 && (
            <button 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-50"
              onClick={slideBlogsLeft}
            >
              <ChevronLeft size={20} />
            </button>
          )}
          
          {currentBlogSlide < healthBlogs.length - 3 && (
            <button 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-50"
              onClick={slideBlogsRight}
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mb-12 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-medium text-gray-800 mb-2">How does home collection work?</h3>
              <p className="text-sm text-gray-600">Our trained phlebotomists will visit your home at your preferred slot to collect the sample. They carry all necessary equipment and follow strict safety protocols.</p>
            </div>
            
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-medium text-gray-800 mb-2">How will I get my reports?</h3>
              <p className="text-sm text-gray-600">Your reports will be available digitally on our app and website within the promised turnaround time. We'll also email you a copy and you can download a PDF version.</p>
            </div>
            
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-medium text-gray-800 mb-2">Are there any preparation guidelines for tests?</h3>
              <p className="text-sm text-gray-600">Yes, certain tests require fasting or specific preparations. These details will be shared with you at the time of booking and our team will also remind you before your appointment.</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800 mb-2">What is the member price and how can I avail it?</h3>
              <p className="text-sm text-gray-600">Member prices are special discounted rates available to our Apollo Health Prime members. You can subscribe to our membership program to avail these prices on all tests and packages.</p>
            </div>
          </div>
        </div>
        
        {/* Cart Summary - Only show if cart has items */}
        {cart.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4 z-50">
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <ShoppingCart size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">{cart.length} {cart.length === 1 ? 'item' : 'items'} in cart</div>
                    <div className="text-sm text-gray-600">Total: ₹{cartTotal}</div>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button 
                    className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-blue-50 transition"
                    onClick={() => setCart([])}
                  >
                    Clear Cart
                  </button>
                  <button 
                    className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition"
                    onClick={() => alert("Proceeding to checkout")}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      {/* Mobile Fixed Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="flex justify-around">
          <button className="flex flex-col items-center py-3 px-4 text-blue-600">
            <Search size={20} />
            <span className="text-xs mt-1">Search</span>
          </button>
          <button className="flex flex-col items-center py-3 px-4 text-gray-500">
            <Heart size={20} />
            <span className="text-xs mt-1">Saved</span>
          </button>
          <button className="flex flex-col items-center py-3 px-4 text-gray-500" onClick={() => alert("Cart clicked")}>
            <ShoppingCart size={20} />
            <span className="text-xs mt-1">Cart</span>
          </button>
          <button className="flex flex-col items-center py-3 px-4 text-gray-500" onClick={() => setShowLoginModal(true)}>
            <User size={20} />
            <span className="text-xs mt-1">Account</span>
          </button>
        </div>
      </div>
      
      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
            <button 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={() => setShowLoginModal(false)}
            >
              <X size={20} />
            </button>
            
            <h2 className="text-xl font-bold text-gray-800 mb-6">Login or Sign Up</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <input 
                type="tel" 
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your 10-digit mobile number"
              />
            </div>
            
            <button 
              className="bg-blue-600 text-white w-full py-3 rounded-md font-medium hover:bg-blue-700 transition"
              onClick={() => alert("OTP would be sent")}
            >
              Continue
            </button>
            
            <div className="mt-4 text-center text-sm text-gray-600">
              By continuing, you agree to our <a href="#" className="text-blue-600">Terms of Service</a> and <a href="#" className="text-blue-600">Privacy Policy</a>
            </div>
          </div>
        </div>
      )}
      
      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-center justify-center z-50">
          <div className="bg-white rounded-t-xl md:rounded-xl max-w-md w-full p-6 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">Filter Tests</h2>
              <button 
                className="text-gray-500 hover:text-gray-800"
                onClick={() => setShowFilterModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Filter options would go here */}
            <div className="space-y-4 mb-6">
              {/* Price Range */}
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Price Range</h3>
                <div className="flex items-center space-x-3">
                  <input 
                    type="range" 
                    min="0" 
                    max="5000" 
                    className="w-full"
                    defaultValue="2500"
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>₹0</span>
                  <span>₹5000+</span>
                </div>
              </div>
              
              {/* Categories */}
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Categories</h3>
                <div className="space-y-2">
                  {['Diabetes', 'Thyroid', 'Full Body', 'Heart', 'Vitamins'].map((category, index) => (
                    <label key={index} className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Ratings */}
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Ratings</h3>
                <div className="space-y-2">
                  {[4, 3, 2].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">{rating}+ ★</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button 
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-md font-medium hover:bg-gray-50 transition"
                onClick={() => alert("Filters reset")}
              >
                Reset
              </button>
              <button 
                className="flex-1 bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition"
                onClick={() => {
                  alert("Filters applied");
                  setShowFilterModal(false);
                }}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
           


// // File: src/pages/LabTestsPage.js
// import { useState } from 'react';
// import { ChevronRight, ChevronLeft, Upload, FileText } from 'lucide-react';
// import { useSelector } from 'react-redux';
// import { selectCartItems } from '../../redux/slices/cartSlice';
// import TestCard from '../../components/UI/TestCard';
// import PackageCard from '../../components/UI/PackageCard';
// import CategoryCard from '../../components/UI/CategoryCard';
// import CartSummary from '../../components/UI/CartSummary';
// import { healthChecks, topBookedTests, popularPackages } from '../../data/testData';

// export default function LabTestsPage() {
//   // State management
//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentPackageSlide, setCurrentPackageSlide] = useState(0);
//   const [currentTestSlide, setCurrentTestSlide] = useState(0);
//   const [selectedCity, setSelectedCity] = useState('Delhi');
//   const [showCityDropdown, setShowCityDropdown] = useState(false);
//   const cartItems = useSelector(selectCartItems);

//   // Function to handle search
//   const handleSearch = (e) => {
//     e.preventDefault();
//     alert(`Searching for: ${searchQuery}`);
//     // In a real application, you would filter results based on the search query
//   };

//   // Function to handle category click
//   const handleCategoryClick = (category) => {
//     alert(`Selected category: ${category.name}`);
//     // In a real application, you would navigate to category page or filter results
//   };

//   // Functions to handle carousel navigation
//   const slideTestsLeft = () => {
//     setCurrentTestSlide(Math.max(0, currentTestSlide - 1));
//   };

//   const slideTestsRight = () => {
//     setCurrentTestSlide(Math.min(topBookedTests.length - 4, currentTestSlide + 1));
//   };

//   const slidePackagesLeft = () => {
//     setCurrentPackageSlide(Math.max(0, currentPackageSlide - 1));
//   };

//   const slidePackagesRight = () => {
//     setCurrentPackageSlide(Math.min(popularPackages.length - 4, currentPackageSlide + 1));
//   };

//   // Function to handle file upload
//   const handleFileUpload = () => {
//     // In a real application, this would open a file dialog
//     alert("Upload prescription functionality would open here");
//   };

//   // Function to view reports
//   const viewReports = () => {
//     // In a real application, this would navigate to reports page
//     alert("Navigating to reports page");
//   };

//   // Function to handle city selection
//   const handleCityChange = (city) => {
//     setSelectedCity(city);
//     setShowCityDropdown(false);
//     // In a real application, this would update available tests and pricing
//   };
  
//   return (
//     <div className="font-sans">
     
//       {/* Main Content */}
//       <main className="max-w-6xl mx-auto p-4 mt-20">
//         <div className="mb-6">
//           <div className="flex items-center mb-2">
//             <h1 className="text-xl font-bold text-gray-800">Lab tests in</h1>
//             <div className="relative ml-2">
//               <button 
//                 className="text-xl font-bold text-blue-600 flex items-center"
//                 onClick={() => setShowCityDropdown(!showCityDropdown)}
//               >
//                 {selectedCity} <ChevronRight size={20} className={`ml-1 transform ${showCityDropdown ? 'rotate-90' : ''} transition-transform`} />
//               </button>
              
//               {showCityDropdown && (
//                 <div className="absolute z-10 mt-1 w-40 bg-white rounded-md shadow-lg py-1">
//                   {['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata'].map((city) => (
//                     <button
//                       key={city}
//                       className={`block w-full text-left px-4 py-2 text-sm ${city === selectedCity ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
//                       onClick={() => handleCityChange(city)}
//                     >
//                       {city}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//           <p className="text-sm text-gray-700 mt-1">
//             {selectedCity}'s leading diagnostic centres offer a comprehensive range of lab tests using cutting-edge technology and expert care. Benefit from fast, accurate diagnostics with doorstep service a...
//           </p>
//           <button className="text-blue-600 text-sm font-medium mt-2">Read More</button>
//         </div>

//         {/* Doctor Created Health Checks */}
//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-bold text-gray-800">Doctor Created Health Checks (29)</h2>
//             <button 
//               className="text-blue-600 text-sm font-medium flex items-center"
//               onClick={() => alert("View all health checks")}
//             >
//               View All <ChevronRight size={16} />
//             </button>
//           </div>
          
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
//             {healthChecks.map(check => (
//               <CategoryCard 
//                 key={check.id} 
//                 category={check} 
//                 onClick={handleCategoryClick} 
//               />
//             ))}
//           </div>
//         </div>

//         {/* Top Booked Tests */}
//         <div className="mb-8 relative">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-bold text-gray-800">Top Booked Tests (44)</h2>
//             <button 
//               className="text-blue-600 text-sm font-medium flex items-center"
//               onClick={() => alert("View all tests")}
//             >
//               View All <ChevronRight size={16} />
//             </button>
//           </div>
          
//           <div className="flex gap-4 overflow-hidden">
//             {topBookedTests.slice(currentTestSlide, currentTestSlide + 4).map((test) => (
//               <TestCard key={test.id} test={test} />
//             ))}
//           </div>
          
//           {currentTestSlide > 0 && (
//             <button 
//               className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-1 shadow hover:bg-gray-100"
//               onClick={slideTestsLeft}
//             >
//               <ChevronLeft size={20} />
//             </button>
//           )}
          
//           {currentTestSlide < topBookedTests.length - 4 && (
//             <button 
//               className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-1 shadow hover:bg-gray-100"
//               onClick={slideTestsRight}
//             >
//               <ChevronRight size={20} />
//             </button>
//           )}
//         </div>

//         {/* Upload and Order + View Reports */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
//           <div 
//             className="bg-green-50 rounded-lg p-4 flex items-center justify-between cursor-pointer hover:bg-green-100 transition"
//             onClick={handleFileUpload}
//           >
//             <div className="flex items-center">
//               <div className="bg-white p-2 rounded-lg border border-gray-300 mr-3">
//                 <Upload size={20} className="text-gray-600" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-gray-800">Upload Prescription</h3>
//                 <p className="text-sm text-gray-600">Get tests recommended by doctor</p>
//               </div>
//             </div>
//             <ChevronRight size={20} className="text-gray-600" />
//           </div>
          
//           <div 
//             className="bg-blue-50 rounded-lg p-4 flex items-center justify-between cursor-pointer hover:bg-blue-100 transition"
//             onClick={viewReports}
//           >
//             <div className="flex items-center">
//               <div className="bg-white p-2 rounded-lg border border-gray-300 mr-3">
//                 <FileText size={20} className="text-gray-600" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-gray-800">View Reports</h3>
//                 <p className="text-sm text-gray-600">Check your previous test results</p>
//               </div>
//             </div>
//             <ChevronRight size={20} className="text-gray-600" />
//           </div>
//         </div>

//         {/* Popular Health Packages */}
//         <div className="mb-8 relative">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-bold text-gray-800">Popular Health Packages (36)</h2>
//             <button 
//               className="text-blue-600 text-sm font-medium flex items-center"
//               onClick={() => alert("View all packages")}
//             >
//               View All <ChevronRight size={16} />
//             </button>
//           </div>
          
//           <div className="flex gap-4 overflow-hidden">
//             {popularPackages.slice(currentPackageSlide, currentPackageSlide + 4).map((pack) => (
//               <PackageCard key={pack.id} package={pack} />
//             ))}
//           </div>
          
//           {currentPackageSlide > 0 && (
//             <button 
//               className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-1 shadow hover:bg-gray-100"
//               onClick={slidePackagesLeft}
//             >
//               <ChevronLeft size={20} />
//             </button>
//           )}
          
//           {currentPackageSlide < popularPackages.length - 4 && (
//             <button 
//               className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-1 shadow hover:bg-gray-100"
//               onClick={slidePackagesRight}
//             >
//               <ChevronRight size={20} />
//             </button>
//           )}
//         </div>

//         {/* Search Bar */}
//         <div className="mb-8">
//           <form onSubmit={handleSearch} className="flex">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search for tests, packages, and more..."
//               className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700 transition"
//             >
//               Search
//             </button>
//           </form>
//         </div>

//         {/* Cart Summary - Only show if there are items in cart */}
//         {cartItems.length > 0 && (
//           <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-10">
//             <div className="max-w-6xl mx-auto">
//               <CartSummary items={cartItems} />
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }