import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter, MapPin, Star, Clock, Video, Calendar, ArrowLeft } from 'lucide-react';
import App from './../../App';

export default function ConsultationRouteHandler() {
  // Get specialty ID from URL parameters
  const { specialtyId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get specialty information from navigation state if available
  const specialtyName = location.state?.specialtyName || 'Specialists';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    experience: '',
    rating: '',
    consultationFee: '',
    availability: '',
    consultationType: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');

  // Fetch doctors by specialty using the API
  const { data: doctorsResponse, isLoading, error, refetch } = useQuery({
    queryKey: ['doctors', specialtyId],
    queryFn: async () => {
      if (!specialtyId) {
        throw new Error('Specialty ID is required');
      }
      
      const response = await fetch(
        `https://medisewa.onrender.com/api/v1/doctors/search/${specialtyId}?type=Specialist`
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch doctors: ${response.status}`);
      }
      
      return response.json();
    },
    enabled: !!specialtyId,
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });

  // Extract doctors from API response
  const doctors = doctorsResponse?.result || [];

  // Helper function to safely convert specialization to searchable string
  const getSpecializationString = (specialization) => {
    if (!specialization) return '';
    if (typeof specialization === 'string') return specialization;
    if (specialization.name) return specialization.name;
    if (Array.isArray(specialization)) return specialization.join(' ');
    return String(specialization);
  };

  // Helper function to display specialization properly
  const displaySpecialization = (specialization) => {
    if (!specialization) return '';
    if (typeof specialization === 'string') return specialization;
    if (specialization.name) return specialization.name;
    if (Array.isArray(specialization)) return specialization.join(', ');
    return String(specialization);
  };

  // Filter doctors based on search term and filters
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         getSpecializationString(doctor.specialization).toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.bio?.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesFilters = true;
    
    if (filters.experience) {
      const expRange = filters.experience.split('-');
      if (expRange.length === 2 && doctor.experience) {
        matchesFilters = matchesFilters && doctor.experience >= parseInt(expRange[0]) && doctor.experience <= parseInt(expRange[1]);
      }
    }
    
    if (filters.rating && doctor.rating) {
      matchesFilters = matchesFilters && doctor.rating >= parseFloat(filters.rating);
    }
    
    if (filters.consultationFee && doctor.fee) {
      const feeRange = filters.consultationFee.split('-');
      if (feeRange.length === 2) {
        matchesFilters = matchesFilters && doctor.fee >= parseInt(feeRange[0]) && doctor.fee <= parseInt(feeRange[1]);
      }
    }
    
    return matchesSearch && matchesFilters;
  });

  // Sort doctors based on selected sort option
  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'experience':
        return (b.experience || 0) - (a.experience || 0);
      case 'fee-low':
        return (a.fee || 0) - (b.fee || 0);
      case 'fee-high':
        return (b.fee || 0) - (a.fee || 0);
      default:
        return 0;
    }
  });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      experience: '',
      rating: '',
      consultationFee: '',
      availability: '',
      consultationType: ''
    });
  };

  // Simplified booking handler - only pass essential data
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
        fromSpecialty: specialtyName,
        specialtyId: specialtyId
      }
    });
  };

  const goBack = () => {
    navigate(-1);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading doctors...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading doctors: {error.message}</p>
          <button 
            onClick={() => refetch()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Specialties</span>
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {specialtyName} Specialists
              </h1>
              <p className="text-gray-600 mt-1">Book appointments with verified doctors</p>
            </div>
            
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search doctors, conditions..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden bg-blue-600 text-white p-2 rounded-lg"
                >
                  <Filter size={16} />
                </button>
              </div>
              
              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Experience Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                  <select
                    value={filters.experience}
                    onChange={(e) => handleFilterChange('experience', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Any Experience</option>
                    <option value="0-5">0-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10-15">10-15 years</option>
                    <option value="15-50">15+ years</option>
                  </select>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <select
                    value={filters.rating}
                    onChange={(e) => handleFilterChange('rating', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Any Rating</option>
                    <option value="4.5">4.5+ Stars</option>
                    <option value="4.0">4.0+ Stars</option>
                    <option value="3.5">3.5+ Stars</option>
                  </select>
                </div>

                {/* Consultation Fee Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Fee</label>
                  <select
                    value={filters.consultationFee}
                    onChange={(e) => handleFilterChange('consultationFee', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Any Fee</option>
                    <option value="0-500">₹0 - ₹500</option>
                    <option value="500-800">₹500 - ₹800</option>
                    <option value="800-1200">₹800 - ₹1200</option>
                    <option value="1200-10000">₹1200+</option>
                  </select>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={clearFilters}
                  className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Main Content - Doctor Listings */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Available Doctors
                <span className="text-gray-500 font-normal ml-2">({sortedDoctors.length} found)</span>
              </h2>
              
              {/* Sort Options */}
              <select 
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="relevance">Sort by Relevance</option>
                <option value="rating">Sort by Rating</option>
                <option value="experience">Sort by Experience</option>
                <option value="fee-low">Fee: Low to High</option>
                <option value="fee-high">Fee: High to Low</option>
              </select>
            </div>

            {/* Doctor Cards */}
            <div className="space-y-6">
              {sortedDoctors.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Search size={48} className="mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria or filters</p>
                </div>
              ) : (
                sortedDoctors.map((doctor) => (
                  <div key={doctor._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Doctor Image */}
                      <div className="md:w-32 md:h-32 w-24 h-24 flex-shrink-0">
                        <img
                          src={doctor.image || '/api/placeholder/400/400'}
                          alt={doctor.name}
                          className="w-full h-full rounded-lg object-cover"
                        />
                      </div>

                      {/* Doctor Info */}
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                              {doctor.name}
                            </h3>
                            
                            <div className="space-y-2 mb-4">
                              <p className="text-blue-600 font-medium">
                                {displaySpecialization(doctor.specialization)}
                              </p>
                              
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Clock size={16} />
                                  <span>{doctor.experience ? `${doctor.experience}+ years` : 'Experience not specified'}</span>
                                </div>
                                
                                {doctor.rating && (
                                  <div className="flex items-center gap-1">
                                    <Star size={16} className="text-yellow-400 fill-current" />
                                    <span>{doctor.rating}</span>
                                    {doctor.reviewCount && (
                                      <span className="text-gray-400">({doctor.reviewCount} reviews)</span>
                                    )}
                                  </div>
                                )}
                              </div>
                              
                              {(doctor.clinicAddress || doctor.address) && (
                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                  <MapPin size={16} />
                                  <span>{doctor.clinicAddress || doctor.address}</span>
                                </div>
                              )}
                            </div>

                            {doctor.bio && (
                              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                {doctor.bio}
                              </p>
                            )}
                          </div>

                          {/* Consultation Options */}
                          <div className="md:text-right">
                            <div className="mb-4">
                              <span className="text-2xl font-bold text-gray-900">
                                {doctor.fee ? `₹${doctor.fee}` : 'Fee not specified'}
                              </span>
                              {doctor.fee && (
                                <p className="text-sm text-gray-600">Consultation fee</p>
                              )}
                            </div>

                            <div className="space-y-2">
                              <button
                                onClick={() => handleBookConsultation(doctor, 'video')}
                                className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                              >
                                <Video size={16} />
                                Book online Appointment
                              </button>
                              
                              <button
                                onClick={() => handleBookConsultation(doctor, 'clinic')}
                                className="w-full md:w-auto bg-white text-blue-600 border border-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                              >
                                <Calendar size={16} />
                                Book Clinic Visit Appointment
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Load More Button (if needed for pagination) */}
            {sortedDoctors.length > 0 && sortedDoctors.length >= 10 && (
              <div className="text-center mt-8">
                <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                  Load More Doctors
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}