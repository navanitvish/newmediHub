import { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useGetQuery } from '../../api/apiCall';
import API_ENDPOINTS from '../../api/apiEndpoint';

export default function TestCardsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sliderRef = useRef(null);

  // Fetch data from API
  const { data: topLabBookedData, isLoading } = useGetQuery(
    `${API_ENDPOINTS.LAB.GET_TOP_BOOKED}`
  );

  // Handle API response which returns a single result object
  // Transform it into an array for rendering
  const topbook = topLabBookedData && topLabBookedData.success ? [topLabBookedData.result] : [];

  console.log('topbook:', topbook);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="text-gray-500">Loading...</span>
      </div>
    );
  }

  if (!topbook.length) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="text-gray-500">No tests found.</span>
      </div>
    );
  }

  // Fallback testCards data in case needed for development
  const testCards = [
    {
      id: 1,
      name: 'CBC Test (Complete Blood Count)',
      testsIncluded: 30,
      price: 437,
      originalPrice: 583,
      discount: '25% off',
      memberPrice: 350,
      icon: '🔬'
    },
    // other test cards...
  ];

  // Use either the API data or fallback data
  const displayCards = topbook.length > 0 ? topbook : testCards;
  
  const totalSlides = displayCards.length;
  const maxIndex = Math.max(0, totalSlides - 1);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  useEffect(() => {
    const handleTransitionEnd = () => {
      setIsAnimating(false);
    };

    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('transitionend', handleTransitionEnd);
    }

    return () => {
      if (slider) {
        slider.removeEventListener('transitionend', handleTransitionEnd);
      }
    };
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {topLabBookedData?.msg || "Top Booked Tests"} ({displayCards.length})
        </h2>
        <button className="text-blue-700 font-medium">View All</button>
      </div>

      <div className="relative overflow-hidden">
        {/* Navigation buttons - only show if we have multiple slides */}
        {totalSlides > 1 && currentIndex > 0 && (
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg p-2 rounded-full hover:bg-gray-100 z-10"
            aria-label="Previous slide"
            disabled={isAnimating}
          >
            <ChevronLeft size={20} />
          </button>
        )}
        
        {totalSlides > 1 && currentIndex < maxIndex && (
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg p-2 rounded-full hover:bg-gray-100 z-10"
            aria-label="Next slide"
            disabled={isAnimating}
          >
            <ChevronRight size={20} />
          </button>
        )}

        {/* Slider container */}
        <div className="overflow-hidden px-8">
          <div 
            ref={sliderRef}
            className="flex transition-transform duration-500 ease-in-out" 
            style={{ 
              transform: `translateX(-${currentIndex * 25 / 4}%)` 
            }}
          >
            {displayCards.map((card) => (
              <div key={card._id} className="w-full sm:w-1/2 lg:w-1/4 flex-shrink-0 px-2">
                <div className="border rounded-lg overflow-hidden shadow-sm h-full">
                  <div className="p-4 flex items-start">
                    <div className="bg-gray-100 p-3 rounded-lg mr-3">
                      <span className="text-2xl">{card.icon || '📋'}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm mb-1">{card.name}</h3>
                      <p className="text-gray-500 text-xs">
                        {card.description || `${card.testsIncluded || 1} Tests Included`}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 pt-0 flex justify-between items-center">
                    <div>
                      <div className="flex items-center">
                        <span className="font-bold text-lg">₹{card.price}</span>
                        {card.originalPrice && (
                          <>
                            <span className="text-gray-400 text-xs line-through ml-1">
                              ₹{card.originalPrice}
                            </span>
                            <span className="text-green-600 text-xs ml-1">
                              {card.discount || '25% off'}
                            </span>
                          </>
                        )}
                      </div>
                      {card.memberPrice && (
                        <div className="flex items-center text-xs">
                          <div className="bg-yellow-500 h-3 w-3 rounded-full mr-1"></div>
                          <span>Member price <span className="font-medium">₹{card.memberPrice}</span></span>
                          <svg className="w-3 h-3 text-gray-500 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </div>
                      )}
                    </div>
                    <button className="bg-teal-600 text-white py-2 px-6 rounded-md text-sm hover:bg-teal-700">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}