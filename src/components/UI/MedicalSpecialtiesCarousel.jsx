import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export default function MedicalSpecialtiesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredId, setHoveredId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Check if mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { data: apiResponse, isLoading, error } = useQuery({
    queryKey: ['specialties'],
    queryFn: async () => {
      const response = await fetch('https://medisewa.onrender.com/api/v1/specializations');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }
  });

  // Extract the specialties from the API response
  const specialtiesData = apiResponse?.result || [];

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center py-12">
          <div className="text-gray-600">Loading specialties...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center py-12">
          <div className="text-red-600">Error loading specialties: {error.message}</div>
        </div>
      </div>
    );
  }

  // Ensure specialtiesData exists and is an array
  if (!specialtiesData || !Array.isArray(specialtiesData) || specialtiesData.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center py-12">
          <div className="text-gray-600">No specialties available</div>
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Browse by Specialties</h2>
          <p className="text-gray-600">Find the right specialist for your specific health needs</p>
        </div>
        {isMobile && (
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className="bg-white rounded-full p-3 shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-300"
              aria-label="Previous specialty"
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <button
              onClick={handleNext}
              className="bg-white rounded-full p-3 shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-300"
              aria-label="Next specialty"
            >
              <ChevronRight size={20} className="text-gray-600" />
            </button>
          </div>
        )}
      </div>
      
      {/* Desktop view - Two rows grid layout */}
      <div className="hidden md:grid grid-cols-6 lg:grid-cols-8 gap-4">
        {specialtiesData.map((specialty, index) => (
          <div
            key={specialty._id}
            className="bg-gray-50  w-30 rounded-xl hover:border  hover:border-blue-500 hover:border-2 transition-all duration-300 ease-in-out cursor-pointer"
            onMouseEnter={() => setHoveredId(index)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => handleSpecialtyClick(specialty)}
          >
            <div className="p-2 flex flex-col items-center text-center h-full">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm">
                <img 
                  src={specialty.image} 
                  alt={specialty.name} 
                  className="w-full h-full  object-cover rounded-full "
                  onError={(e) => {
                    e.target.src = '/api/placeholder/32/32';
                  }}
                />
              </div>
              <h3 className="text-md font-medium text-gray-800 text-center">
                {specialty.name}
              </h3>
              {specialty.doctorCount !== undefined && (
                <p className="text-md text-gray-500 mt-1">
                  {specialty.doctorCount} doctor{specialty.doctorCount !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Mobile carousel view */}
      <div className="md:hidden relative">
        <div className="overflow-hidden">
          <div
            className="flex gap-4 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {Array.from({ length: pageCount }).map((_, pageIndex) => (
              <div key={`page-${pageIndex}`} className="flex gap-4 min-w-full">
                {specialtiesData
                  .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                  .map((specialty, specIndex) => (
                    <div
                      key={specialty._id}
                      className="bg-gray-50 rounded-xl w-1/2 flex-shrink-0 cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => handleSpecialtyClick(specialty)}
                    >
                      <div className="p-4 flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-2 shadow-sm">
                          <img 
                            src={specialty.image} 
                            alt={specialty.name} 
                            className="w-10 h-10 object-cover"
                            onError={(e) => {
                              e.target.src = '/api/placeholder/24/24';
                            }}
                          />
                        </div>
                        <h3 className="text-xs font-medium text-gray-800 text-center">
                          {specialty.name}
                        </h3>
                        {specialty.doctorCount !== undefined && (
                          <p className="text-xs text-gray-500 mt-1">
                            {specialty.doctorCount} doctor{specialty.doctorCount !== 1 ? 's' : ''}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
        
        {/* Mobile navigation buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrev}
            className="bg-white rounded-full p-3 shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-300"
            aria-label="Previous specialty"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          <button
            onClick={handleNext}
            className="bg-white rounded-full p-3 shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-300"
            aria-label="Next specialty"
          >
            <ChevronRight size={20} className="text-gray-600" />
          </button>
          </div>
          
        </div>
        
       
      </div>

    
  );
}