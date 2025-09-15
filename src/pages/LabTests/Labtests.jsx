// File: src/pages/LabTestsPage.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addLabTest } from '../../redux/slices/labTestSlice';
import { 
  ChevronRight, ChevronLeft, Upload, FileText, Search, 
  Calendar, MapPin, Activity, ShieldCheck, Clock, Award, User, Heart,
  Thermometer, Droplet, ShieldPlus, Syringe, Camera, Smartphone
} from 'lucide-react';

import { topBookedTests } from '../../data/testData';
import PackageCard from '../../components/UI/PackageCard';
import ImageCarousel from '../../components/UI/ImageCarousel';
import TestCard from '../../components/UI/TestCard';
import DiagnosticTests from './DiagnosticTests';
import TopBookedTests from './topBookedTests';
import HealthCheckups from './HealthCheckup';
import HealthCategoriesPage from './HealthCategoriesPage';

export default function LabTestsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTestSlide, setCurrentTestSlide] = useState(0);

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

  const healthCategories = [
    { id: 1, name: "Diabetes", icon: <Droplet size={20} /> },
    { id: 2, name: "Thyroid", icon: <ShieldPlus size={20} /> },
    { id: 3, name: "Full Body Checkup", icon: <User size={20} /> },
    { id: 4, name: "Fever", icon: <Thermometer size={20} /> },
    { id: 5, name: "Heart", icon: <Heart size={20} color="red" /> },
    { id: 6, name: "Women's Health", icon: <Syringe size={20} /> },
    { id: 7, name: "Men's Health", icon: <FileText size={20} /> },
    { id: 8, name: "Covid-19", icon: <Thermometer size={20} /> }
  ];

  // Event Handlers
  const handleAddToCart = (item) => {
    dispatch(addLabTest({ ...item, type: item.testsIncluded ? 'package' : 'test' }));
    alert(`Added ${item.name} to cart!`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchQuery}`);
  };

  const handleCategoryClick = (category) => {
    alert(`Selected category: ${category.name}`);
  };

  const handlePrescriptionUpload = () => {
    navigate('/prescription-upload');
  };

  const slideTestsLeft = () => {
    setCurrentTestSlide(Math.max(0, currentTestSlide - 1));
  };

  const slideTestsRight = () => {
    setCurrentTestSlide(Math.min(topBookedTests.length - 3, currentTestSlide + 1));
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
     <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white"></div>
        <div className="absolute bottom-10 right-20 w-40 h-40 rounded-full bg-white"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-white"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 relative z-10">
        <div className="grid md:grid-cols-12 gap-8 items-center">
          {/* Left Content */}
          <div className="md:col-span-7 lg:col-span-6">
            <div className="bg-blue-800 bg-opacity-20 inline-block px-4 py-1 rounded-full mb-4">
              <div className="flex items-center space-x-2">
                <ShieldCheck size={16} className="text-blue-200" />
                <span className="text-blue-100 text-sm font-medium">NABL & ISO Certified Labs</span>
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white leading-tight">
              Advanced Diagnostics <span className="text-blue-200">for Better Health</span>
            </h1>
            
            <p className="text-blue-100 mb-6 text-lg max-w-lg">
              Book trusted diagnostic tests with home sample collection and get digital reports within 24 hours.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="flex items-center bg-white bg-opacity-10 px-3 py-1.5 rounded-lg">
                <Award size={16} className="text-yellow-600 mr-2" />
                <span className="text-sm text-black">5000+ Happy Customers</span>
              </div>
              <div className="flex items-center bg-white bg-opacity-10 px-3 py-1.5 rounded-lg">
                <Clock size={16} className="text-blue-500 mr-2" />
                <span className="text-sm text-black">Reports in 24hrs</span>
              </div>
              <div className="flex items-center bg-white bg-opacity-10 px-3 py-1.5 rounded-lg">
                <Activity size={16} className="text-green-500 mr-2" />
                <span className="text-sm text-black">98% Accuracy</span>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="bg-white rounded-xl shadow-lg p-1.5 flex items-center mb-6">
              <form onSubmit={handleSearch} className="flex w-full">
                <div className="flex items-center bg-gray-50 rounded-lg px-3 py-2 flex-grow">
                  <Search className="text-blue-600 mr-2" size={20} />
                  <input
                    type="text"
                    className="flex-grow bg-transparent px-1 py-1.5 focus:outline-none text-gray-800 placeholder-gray-500"
                    placeholder="Search for tests, packages, or health concerns..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="ml-2 bg-blue-600 text-black px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center"
                >
                  Search
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </form>
            </div>
            
            {/* Quick Actions */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg">
              <button className="flex flex-col items-center justify-center bg-white bg-opacity-10 hover:bg-opacity-20 transition-all duration-200 p-3 rounded-xl">
                <Calendar size={20} className="text-blue-500 mb-1" />
                <span className="text-black text-sm">Book Test</span>
              </button>
              <button className="flex flex-col items-center justify-center bg-white bg-opacity-10 hover:bg-opacity-20 transition-all duration-200 p-3 rounded-xl">
                <MapPin size={20} className="text-blue-500 mb-1" />
                <span className="text-black text-sm">Find Lab</span>
              </button>
              <button className="flex flex-col items-center justify-center bg-white bg-opacity-10 hover:bg-opacity-20 transition-all duration-200 p-3 rounded-xl">
                <Clock size={20} className="text-blue-500 mb-1" />
                <span className="text-black text-sm">View Reports</span>
              </button>
            </div>
          </div>
          
          {/* Right Content - Image with Decorative Elements */}
          <div className="md:col-span-5 lg:col-span-6 relative hidden md:block">
            <div className="relative">
              {/* Main Image */}
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white border-opacity-20">
                <img
                  src="https://cdn.dribbble.com/userupload/36558309/file/original-cb1503604100430683b58ba1453fb92b.png?resize=1024x768&vertical=center"
                  alt="Modern laboratory testing"
                  className="w-full h-auto object-cover"
                />
              </div>
              
              {/* Floating Card 1 */}
              <div className="absolute -left-8 top-12 bg-white rounded-lg shadow-lg p-3 animate-float">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <ShieldCheck size={20} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-800">Certified Testing</h3>
                    <p className="text-xs text-gray-500">ISO 15189 Standards</p>
                  </div>
                </div>
              </div>
              
              {/* Floating Card 2 */}
              <div className="absolute -right-6 bottom-16 bg-white rounded-lg shadow-lg p-3 animate-float-delayed">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <Activity size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-800">Accurate Results</h3>
                    <p className="text-xs text-gray-500">Digital Reports</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave Bottom Shape */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 transform">
        <svg className="relative block w-full h-8 sm:h-16" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
        </svg>
      </div>
    </section>

      {/* Upload Prescription Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-400">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700  p-3 rounded-full mr-4">
                  <Upload className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Upload Your Prescription</h2>
              </div>
              
              <p className="text-gray-600 mb-6 text-lg">
                Get tests recommended by your doctor. Upload your prescription and we'll help you find the right tests at the best prices.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button 
                  onClick={handlePrescriptionUpload}
                  className="flex items-center justify-center bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Take Photo
                </button>
                <button 
                  onClick={handlePrescriptionUpload}
                  className="flex items-center justify-center bg-white text-blue-500 border-2 border-blue-500 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium"
                >
                  <Smartphone className="w-5 h-5 mr-2" />
                  Upload from Gallery
                </button>
              </div>
              
              <div className="flex items-center text-sm text-gray-500">
                <ShieldCheck className="w-4 h-4 mr-2 text-green-500" />
                <span>Your prescription is safe and secure with us</span>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://plus.unsplash.com/premium_photo-1682141140357-4283cd7aae8b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzI1fHxkb2N0b3J8ZW58MHx8MHx8fDA%3D"
                alt="Doctor with prescription"
                className="rounded-xl shadow-lg w-full h-64 object-cover"
              />
              {/* <div className="absolute inset-0 bg-blue-500 bg-opacity-10 rounded-xl"></div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Health Categories */}
      <section className="max-w-7xl mx-auto px-4 mt-8">
        <HealthCategoriesPage />
      </section>

      {/* Top Booked Tests */}
      <TopBookedTests />

      {/* Health Checkups */}
      <section className="max-w-7xl mx-auto px-4 mt-8">
        <HealthCheckups />
      </section>

      {/* Health Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Health Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
          {healthCategories.map(category => (
            <div 
              key={category.id}
              className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center cursor-pointer hover:shadow-md transition"
              onClick={() => handleCategoryClick(category)}
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <h3 className="text-sm font-medium text-gray-800 text-center">{category.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Image Carousel */}
      <ImageCarousel />

      {/* Test Cards */}
      <section className="max-w-7xl mx-auto px-4 mt-8">
        <TestCard />
      </section>

      {/* Top Booked Lab Tests Slider */}
      {/* <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Top Booked Lab Tests</h2>
          <div className="flex space-x-2">
            <button 
              className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 disabled:opacity-50"
              onClick={slideTestsLeft}
              disabled={currentTestSlide === 0}
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 disabled:opacity-50"
              onClick={slideTestsRight}
              disabled={currentTestSlide >= topBookedTests.length - 3}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topBookedTests.slice(currentTestSlide, currentTestSlide + 3).map(test => (
            <div key={test.id} className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition">
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <div className="text-3xl mr-3">{test.icon}</div>
                  <h3 className="font-medium text-gray-800">{test.name}</h3>
                </div>
                
                <div className="mb-3 space-y-1">
                  <div className="flex items-center text-sm text-gray-600">
                    <span>Sample: {test.sampleType}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock size={16} className="mr-1" />
                    <span>Report in {test.reportHours} hours</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span>Fasting: {test.fastingRequired ? 'Required' : 'Not Required'}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <div>
                    <span className="font-bold text-gray-800">₹{test.price}</span>
                    {test.originalPrice && (
                      <>
                        <span className="text-sm text-gray-500 line-through ml-2">₹{test.originalPrice}</span>
                        <span className="text-sm text-green-600 ml-1">{test.discount}% off</span>
                      </>
                    )}
                  </div>
                  <button 
                    className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700"
                    onClick={() => handleAddToCart(test)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* Banner Images */}
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        <img 
          src="https://images.apollo247.in/pd-cms/cms/2023-09/Diag_Web_Desktop.jpg?tr=q-80,f-webp,w-1300,dpr-2,c-at_max" 
          alt="Diagnostic Banner" 
          className="w-full rounded-2xl"
        />
        
        <img 
          src="https://images.apollo247.in/images/banners/radoilogy-banner.png?tr=q-60,f-webp,w-1300,dpr-2,c-at_max" 
          alt="Radiology Banner" 
          className="w-full rounded-2xl"
        />
        
        <img 
          src="https://images.apollo247.in/images/category/certified_banner_web_updated.png?tr=q-80,f-webp,w-1300,dpr-2,c-at_max" 
          alt="Certified Banner" 
          className="w-full rounded-2xl"
        />
      </div>

      {/* Why Choose HealthLabs */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl font-bold text-gray-800 mb-8 text-center">Why Choose HealthLabs</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {labBenefits.map(benefit => (
              <div key={benefit.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diagnostic Tests */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <DiagnosticTests />
      </section>

      {/* Package Card Section */}
      <section>
        <PackageCard />
      </section>

      {/* App Download Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:w-1/2">
              <h2 className="text-2xl font-bold text-white mb-3">Download HealthLabs App</h2>
              <p className="text-blue-100 mb-6">
                Book tests, track orders, view reports, and get health insights on your mobile device.
              </p>
              <div className="flex space-x-4">
                <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center hover:bg-gray-800 transition">
                  <span className="mr-2">App Store</span>
                </button>
                <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center hover:bg-gray-800 transition">
                  <span className="mr-2">Google Play</span>
                </button>
              </div>
            </div>
            <div className="md:w-1/3">
              <img 
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                alt="Mobile app screenshot" 
                className="rounded-xl max-w-full h-auto max-h-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Floating Call Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="flex flex-col items-center bg-orange-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-orange-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="text-xs font-medium">CALL TO BOOK</span>
          <span className="text-xs">9413344297</span>
        </button>
      </div>
    </div>
  );
}