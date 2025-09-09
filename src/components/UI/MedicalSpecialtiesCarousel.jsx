import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Stethoscope, Users, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MedicalSpecialtiesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [specialtiesData, setSpecialtiesData] = useState([]);

  // Check if mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch specialties data
  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://medisawabackend.onrender.com/api/v1/specializations');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSpecialtiesData(data?.result || []);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpecialties();
  }, []);

  // Handle loading state with skeleton
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-12">
          <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg w-80 mb-4 animate-pulse bg-[length:200%_100%]"></div>
          <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
        </div>
        
        <div className="hidden md:grid grid-cols-6 lg:grid-cols-8 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 animate-pulse">
              <div className="w-20 h-20 bg-gray-200 rounded-2xl mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto"></div>
            </div>
          ))}
        </div>
        
        <div className="md:hidden flex gap-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl w-1/2 shadow-md p-5 border border-gray-100 animate-pulse">
              <div className="w-16 h-16 bg-gray-200 rounded-xl mx-auto mb-3"></div>
              <div className="h-3 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-100 rounded-3xl p-8 text-center shadow-lg backdrop-blur-sm">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Stethoscope className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-red-700 mb-2">Unable to Load Specialties</h3>
          <p className="text-red-600 mb-4">{error.message}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full transition-colors duration-200 font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Ensure specialtiesData exists and is an array
  if (!specialtiesData || !Array.isArray(specialtiesData) || specialtiesData.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-100 rounded-3xl p-8 text-center shadow-lg backdrop-blur-sm">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Stethoscope className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-blue-700 mb-2">No Specialties Available</h3>
          <p className="text-blue-600">Please check back later for available medical specialties.</p>
        </div>
      </div>
    );
  }

  // For mobile carousel navigation
  const itemsPerPage = 4;
  const pageCount = Math.ceil(specialtiesData.length / itemsPerPage);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % pageCount);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + pageCount) % pageCount);
  };

  const handleSpecialtyClick = (specialty) => {
    // Navigate to the consultation page with the specialty ID
    navigate(`/consultation/${specialty._id}`, {
      state: {
        specialtyId: specialty._id,
        specialtyName: specialty.name
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Enhanced Header Section */}
      <div className="relative mb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 rounded-3xl blur-3xl"></div>
        <div className="relative flex flex-col lg:flex-row lg:justify-between lg:items-center">
          <div className="mb-8 lg:mb-0">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                  Medical Specialties
                </h2>
                <div className="h-1.5 w-32 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full mt-2"></div>
              </div>
            </div>
            <p className="text-gray-600 text-xl font-medium max-w-2xl leading-relaxed">
              Discover the perfect specialist for your health journey with our comprehensive medical expertise
            </p>
          </div>
          
          {/* Mobile Navigation Buttons */}
          {isMobile && specialtiesData.length > itemsPerPage && (
            <div className="flex gap-3 justify-center lg:justify-end">
              <button
                onClick={handlePrev}
                className="group bg-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 text-gray-700 hover:text-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200"
                aria-label="Previous specialty"
              >
                <ChevronLeft size={24} className="transition-transform group-hover:-translate-x-0.5" />
              </button>
              <button
                onClick={handleNext}
                className="group bg-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 text-gray-700 hover:text-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200"
                aria-label="Next specialty"
              >
                <ChevronRight size={24} className="transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Desktop Grid Layout - Enhanced */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6 gap-6">
        {specialtiesData.map((specialty, index) => (
          <div
            key={specialty._id}
            className={`group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-md hover:shadow-2xl p-6 transition-all duration-500 ease-out cursor-pointer border-2 border-gray-100/50 hover:border-blue-200/50 transform hover:-translate-y-3 overflow-hidden ${
              hoveredId === index ? 'ring-4 ring-blue-200/50 shadow-blue-100/50' : ''
            }`}
            onMouseEnter={() => setHoveredId(index)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => handleSpecialtyClick(specialty)}
          >
            {/* Enhanced gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative flex flex-col items-center text-center h-full">
              {/* Enhanced image container */}
              <div className="relative mb-5">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500 ring-2 ring-gray-100/50 group-hover:ring-blue-200/50 group-hover:scale-110">
                  <img 
                    src={specialty.image} 
                    alt={specialty.name} 
                    className="w-14 h-14 object-cover rounded-2xl transition-all duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = '/api/placeholder/56/56';
                    }}
                  />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100 flex items-center justify-center">
                  <ArrowRight size={12} className="text-white" />
                </div>
              </div>

              {/* Enhanced title */}
              <h3 className="text-base font-bold text-gray-800 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-700 group-hover:via-indigo-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300 mb-3 leading-snug">
                {specialty.name}
              </h3>

              {/* Enhanced doctor count badge */}
              {specialty.doctorCount !== undefined && (
                <div className="group-hover:scale-105 transition-transform duration-300">
                  <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-100/80 to-indigo-100/80 hover:from-blue-200/80 hover:to-indigo-200/80 text-blue-700 px-3 py-1.5 rounded-full text-sm font-semibold border border-blue-200/30 backdrop-blur-sm">
                    <Users size={14} />
                    <span>{specialty.doctorCount}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Mobile Carousel - Enhanced */}
      <div className="md:hidden relative">
        <div className="overflow-hidden rounded-3xl shadow-inner bg-gradient-to-r from-gray-50/50 to-blue-50/50 p-2">
          <div
            className="flex gap-4 transition-transform duration-700 ease-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {Array.from({ length: pageCount }).map((_, pageIndex) => (
              <div key={`page-${pageIndex}`} className="flex gap-4 min-w-full p-2">
                {specialtiesData
                  .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                  .map((specialty) => (
                    <div
                      key={specialty._id}
                      className="bg-white/90 backdrop-blur-sm rounded-3xl w-1/2 flex-shrink-0 cursor-pointer hover:shadow-xl transition-all duration-300 shadow-lg border-2 border-gray-100/50 hover:border-blue-200/50 transform hover:scale-105 overflow-hidden"
                      onClick={() => handleSpecialtyClick(specialty)}
                    >
                      <div className="p-5 flex flex-col items-center text-center relative">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-xl"></div>
                        
                        <div className="relative mb-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl flex items-center justify-center shadow-md ring-2 ring-gray-100/50">
                            <img 
                              src={specialty.image} 
                              alt={specialty.name} 
                              className="w-12 h-12 object-cover rounded-xl"
                              onError={(e) => {
                                e.target.src = '/api/placeholder/48/48';
                              }}
                            />
                          </div>
                        </div>
                        
                        <h3 className="text-sm font-bold text-gray-800 text-center mb-3 leading-tight">
                          {specialty.name}
                        </h3>
                        
                        {specialty.doctorCount !== undefined && (
                          <div className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-100/80 to-indigo-100/80 text-blue-700 px-2.5 py-1 rounded-full text-xs font-semibold border border-blue-200/30">
                            <Users size={12} />
                            <span>{specialty.doctorCount}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
        
        {/* Enhanced Mobile Navigation */}
        {specialtiesData.length > itemsPerPage && (
          <div className="flex justify-center items-center mt-8 gap-6">
            <button
              onClick={handlePrev}
              className="group bg-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 text-gray-700 hover:text-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200"
              aria-label="Previous specialty"
            >
              <ChevronLeft size={22} className="transition-transform group-hover:-translate-x-0.5" />
            </button>
            
            {/* Enhanced page indicators */}
            <div className="flex items-center gap-2">
              {Array.from({ length: pageCount }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`rounded-full transition-all duration-300 transform hover:scale-110 ${
                    index === currentIndex 
                      ? 'w-8 h-3 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg' 
                      : 'w-3 h-3 bg-gray-300 hover:bg-gray-400 shadow-sm'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={handleNext}
              className="group bg-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 text-gray-700 hover:text-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200"
              aria-label="Next specialty"
            >
              <ChevronRight size={22} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}