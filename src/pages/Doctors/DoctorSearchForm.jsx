import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DoctorSearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Navigate to results page with search query
      const symptoms = searchTerm.trim();
      navigate(`/doctors/search-results?symptoms=${encodeURIComponent(symptoms)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-4 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xl text-gray-900 transition-all duration-300 bg-white"
              placeholder="Search for doctors, specialties, or conditions (e.g., fever, headache)"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
            />
          </div>
          <button 
            type="submit" 
            className="bg-indigo-800 hover:bg-indigo-900 text-white px-8 py-4 rounded-xl font-medium shadow-xl transition-all duration-300 flex-shrink-0 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Find Doctors
          </button>
        </div>
      </form>

      {/* Popular Searches */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Popular Searches</h3>
        <div className="flex flex-wrap gap-2">
          {[
            'fever, headache',
            'chest pain',
            'back pain',
            'diabetes',
            'hypertension',
            'skin rash',
            'stomach pain',
            'anxiety'
          ].map((symptom) => (
            <button
              key={symptom}
              onClick={() => {
                setSearchTerm(symptom);
                navigate(`/doctors/search-results?symptoms=${encodeURIComponent(symptom)}`);
              }}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors duration-200"
            >
              {symptom}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorSearchForm;