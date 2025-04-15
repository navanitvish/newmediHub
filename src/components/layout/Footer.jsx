// src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 py-8 mt-12">
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold mb-4">About NewmediHub </h3>
          <ul className="space-y-2 text-sm">
            <li><button className="text-gray-600 hover:text-gray-900">About Us</button></li>
            <li><button className="text-gray-600 hover:text-gray-900">Contact Us</button></li>
            <li><button className="text-gray-600 hover:text-gray-900">FAQs</button></li>
            <li><button className="text-gray-600 hover:text-gray-900">Health Queries</button></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-bold mb-4">Our Services</h3>
          <ul className="space-y-2 text-sm">
            <li><button className="text-gray-600 hover:text-gray-900">Lab Tests</button></li>
            <li><button className="text-gray-600 hover:text-gray-900">Health Packages</button></li>
            <li><button className="text-gray-600 hover:text-gray-900">Doctor Consultation</button></li>
            <li><button className="text-gray-600 hover:text-gray-900">Pharmacy</button></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-bold mb-4">Top Cities</h3>
          <ul className="space-y-2 text-sm">
            <li><button className="text-gray-600 hover:text-gray-900" onClick={() => handleCityChange('Delhi')}>Delhi</button></li>
            <li><button className="text-gray-600 hover:text-gray-900" onClick={() => handleCityChange('Mumbai')}>Mumbai</button></li>
            <li><button className="text-gray-600 hover:text-gray-900" onClick={() => handleCityChange('Bangalore')}>Bangalore</button></li>
            <li><button className="text-gray-600 hover:text-gray-900" onClick={() => handleCityChange('Hyderabad')}>Hyderabad</button></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-bold mb-4">Connect With Us</h3>
          <div className="flex space-x-4 mb-4">
            <button className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center">f</button>
            <button className="bg-blue-400 text-white w-8 h-8 rounded-full flex items-center justify-center">t</button>
            <button className="bg-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center">i</button>
            <button className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center">y</button>
          </div>
          <div className="text-sm text-gray-600">
            Customer Support: <span className="font-medium">1800-XXX-XXXX</span>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-300 mt-8 pt-6 text-center text-sm text-gray-600">
        &copy; 2025 Apollo 24/7. All rights reserved.
      </div>
    </div>
  </footer>
  );
};

export default Footer;