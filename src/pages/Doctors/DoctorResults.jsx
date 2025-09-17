import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, Filter, MapPin, Star, Clock } from 'lucide-react';

// API function to search doctors by symptoms
const searchDoctorsBySymptom = async (symptoms) => {
  if (!symptoms || symptoms.trim() === '') {
    return { result: [], count: 0 };
  }

  // Convert search term to comma-separated symptoms
  const symptomList = symptoms
    .split(',')
    .map(s => s.trim().toLowerCase())
    .filter(s => s.length > 0)
    .join(',');

  if (!symptomList) {
    return { result: [], count: 0 };
  }

  const response = await fetch(`https://medisawabackend.onrender.com/api/v1/doctors/searchBySymptom?symptom=${encodeURIComponent(symptomList)}`);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  
  // Return the API response structure
  return {
    result: data.result || [],
    count: data.count || 0,
    success: data.success
  };
};

const DoctorSearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [newSearchTerm, setNewSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);

  const symptoms = searchParams.get('symptoms') || '';

  useEffect(() => {
    setNewSearchTerm(symptoms);
  }, [symptoms]);

  // TanStack Query hook
  const {
    data: apiResponse,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['doctors', symptoms],
    queryFn: () => searchDoctorsBySymptom(symptoms),
    enabled: symptoms.trim() !== '',
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  // Extract doctors array from API response
  const doctors = apiResponse?.result || [];
  const doctorCount = apiResponse?.count || 0;

  const handleNewSearch = (e) => {
    e.preventDefault();
    if (newSearchTerm.trim()) {
      navigate(`/doctors/search-results?symptoms=${encodeURIComponent(newSearchTerm.trim())}`);
    }
  };

  const handleBackToSearch = () => {
    navigate('/doctors/search');
  };

  

  // Sort doctors based on selected criteria
  const sortedDoctors = [...doctors].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        // Since rating is not in the API response, we'll sort by experience as a fallback
        return (b.experience || 0) - (a.experience || 0);
      case 'experience':
        return (b.experience || 0) - (a.experience || 0);
      case 'fee':
        return (a.fee || 0) - (b.fee || 0);
      case 'name':
        return (a.name || '').localeCompare(b.name || '');
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Search */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={handleBackToSearch}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Search
            </button>
          </div>

          {/* New Search Bar */}
          <form onSubmit={handleNewSearch} className="flex gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search for doctors, specialties, or conditions"
                value={newSearchTerm}
                onChange={(e) => setNewSearchTerm(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-800 hover:bg-indigo-900 text-white px-6 py-3 rounded-lg font-medium transition-colors flex-shrink-0"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 text-gray-600"
                >
                  <Filter className="h-4 w-4" />
                </button>
              </div>

              <div className={`space-y-4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort by
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="experience">Most Experience</option>
                    <option value="fee">Lowest Fee</option>
                    <option value="name">Name (A-Z)</option>
                  </select>
                </div>

                {/* Specialization Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialization
                  </label>
                  <div className="space-y-2">
                    {['Neurologist', 'Cardiologist', 'General Medicine', 'Orthopedic', 'Pediatrician'].map((specialty) => (
                      <label key={specialty} className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <span className="ml-2 text-sm text-gray-700">{specialty}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Fee Range Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Consultation Fee
                  </label>
                  <div className="space-y-2">
                    {[
                      { label: 'Under ₹300', max: 300 },
                      { label: '₹300 - ₹500', min: 300, max: 500 },
                      { label: '₹500 - ₹1000', min: 500, max: 1000 },
                      { label: 'Above ₹1000', min: 1000 }
                    ].map((range, index) => (
                      <label key={index} className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <span className="ml-2 text-sm text-gray-700">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Doctors for "{symptoms}"
              </h1>
              {!isLoading && !isError && (
                <p className="text-gray-600">
                  {doctorCount} doctor{doctorCount !== 1 ? 's' : ''} found
                </p>
              )}
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-800"></div>
                <span className="ml-2 text-gray-600">Searching for doctors...</span>
              </div>
            )}

            {/* Error State */}
            {isError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                <p className="text-red-800 mb-4">
                  Error searching for doctors: {error?.message || 'Something went wrong'}
                </p>
                <button 
                  onClick={() => refetch()}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* No Results */}
            {!isLoading && !isError && doctors.length === 0 && (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No doctors found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    We couldn't find any doctors matching your search criteria.
                  </p>
                  <button
                    onClick={handleBackToSearch}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                  >
                    Try a New Search
                  </button>
                </div>
              </div>
            )}

            {/* Results List */}
            {!isLoading && !isError && sortedDoctors.length > 0 && (
              <div className="space-y-4">
                {sortedDoctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to display specialization name safely
function displaySpecialization(specialization) {
  if (!specialization) return 'General Medicine';
  if (typeof specialization === 'string') return specialization;
  if (typeof specialization === 'object' && specialization.name) return specialization.name;
  return 'General Medicine';
}

// Enhanced Doctor Card Component
const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

     const handleBookConsultation = (doctor, consultationType) => {
    // Create simplified doctor data object
    const doctorData = {
      id: doctor._id,
      name: doctor.name,
      image: doctor.image || '/api/placeholder/400/400',
      specialty: displaySpecialization(doctor.specialization),
      experience: doctor.experience ? `${doctor.experience}+ years` : 'Not specified',
      rating: doctor.rating || 0,
      reviews: doctor.reviewCount || 0,
      location: doctor.clinicAddress || doctor.address || 'Location not specified',
      education: doctor.education || doctor.qualifications || 'Not specified',
      bio: doctor.bio || '',
      consultationFee: doctor.fee ? `₹${doctor.fee}` : 'Not specified',
      specializations: Array.isArray(doctor.specializations) 
        ? doctor.specializations 
        : doctor.specializations 
          ? [doctor.specializations] 
          : [displaySpecialization(doctor.specialization)].filter(Boolean),
    };

    // Navigate to booking page with doctor data
    navigate(`/booking/${doctor._id}`, { 
      state: { 
        doctor: doctorData,
        consultationType: consultationType,
        fromSpecialty: displaySpecialization(doctor.specialization),
        specialtyId: doctor.specialization?._id || ''
      }
    });
  };
  // Format time display
  const formatTime = (time) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // Calculate discount percentage
  const discountPercentage = doctor.oldFee && doctor.fee ? 
    Math.round(((doctor.oldFee - doctor.fee) / doctor.oldFee) * 100) : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Doctor Image */}
        <div className="flex-shrink-0">
          {doctor.image ? (
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-indigo-800 font-semibold text-xl">
                {doctor.name?.charAt(0) || 'D'}
              </span>
            </div>
          )}
        </div>

        {/* Doctor Info */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                Dr. {doctor.name}
              </h3>
              <p className="text-indigo-600 font-medium mb-1">
                {doctor.specialization?.name || 'General Medicine'}
              </p>
              <div className="flex items-center text-gray-600 text-sm mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                {doctor.clinicAddress || doctor.address}
              </div>
              <div className="flex items-center text-gray-600 text-sm mb-2">
                <span className="font-medium">Department:</span>
                <span className="ml-1">{doctor.department?.name}</span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              {doctor.experience && (
                <div className="flex items-center text-gray-600 text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  {doctor.experience} years exp.
                </div>
              )}
              {doctor.gender && (
                <span className="text-sm text-gray-500">{doctor.gender}</span>
              )}
            </div>
          </div>

          {/* Symptoms */}
          {doctor.symptom && doctor.symptom.length > 0 && (
            <div className="mb-4">
              <span className="text-sm font-medium text-gray-700 mr-2">Treats:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {doctor.symptom.slice(0, 4).map((symptom, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full capitalize"
                  >
                    {symptom}
                  </span>
                ))}
                {doctor.symptom.length > 4 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    +{doctor.symptom.length - 4} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Consultation Info */}
          <div className="flex flex-wrap gap-4 mb-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Consultation Fee:</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-green-600">₹{doctor.fee}</span>
                {doctor.oldFee && doctor.oldFee > doctor.fee && (
                  <>
                    <span className="text-gray-400 line-through">₹{doctor.oldFee}</span>
                    <span className="text-green-600 text-xs font-medium bg-green-100 px-2 py-1 rounded">
                      {discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Timing */}
          {doctor.startTime && doctor.endTime && (
            <div className="mb-4 text-sm">
              <span className="text-gray-600">Available:</span>
              <span className="ml-2 text-gray-900 font-medium">
                {formatTime(doctor.startTime)} - {formatTime(doctor.endTime)}
              </span>
              {doctor.onLeave && (
                <span className="ml-2 text-red-600 font-medium">(Currently on leave)</span>
              )}
            </div>
          )}

          {/* Contact Info */}
          <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
            {doctor.contactNumber && (
              <span>Mobile: {doctor.contactNumber}</span>
            )}
            {doctor.clinicContactNumber && (
              <span>Clinic: {doctor.clinicContactNumber}</span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button 
             onClick={() => handleBookConsultation(doctor, 'clinic')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                doctor.onLeave 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
              disabled={doctor.onLeave}
            >
              {doctor.onLeave ? 'On Leave' : 'Book clinic visit Appointment'}
            </button>
            <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-2 rounded-md font-medium transition-colors">
              View Profile
            </button>
            <button className="border border-indigo-300 hover:border-indigo-400 text-indigo-600 px-4 py-2 rounded-md font-medium transition-colors">
              Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSearchResults;