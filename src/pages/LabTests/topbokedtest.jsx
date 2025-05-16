import { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function TestCardsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sliderRef = useRef(null);
  
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
    {
      id: 2,
      name: 'HbA1c Test (Hemoglobin A1c)',
      testsIncluded: 3,
      price: 550,
      originalPrice: 733,
      discount: '25% off',
      memberPrice: 440,
      icon: '📊'
    },
    {
      id: 3,
      name: 'FBS (Fasting Blood Sugar Test)',
      testsIncluded: 1,
      price: 100,
      originalPrice: 133,
      discount: '25% off',
      memberPrice: 80,
      icon: '📊'
    },
    {
      id: 4,
      name: 'Lipid Profile Test',
      testsIncluded: 8,
      price: 962,
      originalPrice: 1283,
      discount: '25% off',
      memberPrice: 770,
      icon: '❤️'
    },
    {
      id: 5,
      name: 'Thyroid Profile Test',
      testsIncluded: 3,
      price: 700,
      originalPrice: 933,
      discount: '25% off',
      memberPrice: 560,
      icon: '🦋'
    },
    {
      id: 6,
      name: 'Vitamin D Test',
      testsIncluded: 1,
      price: 450,
      originalPrice: 600,
      discount: '25% off',
      memberPrice: 360,
      icon: '☀️'
    },
    {
      id: 7,
      name: 'Complete Health Checkup',
      testsIncluded: 85,
      price: 2500,
      originalPrice: 3333,
      discount: '25% off',
      memberPrice: 2000,
      icon: '📋'
    },
    {
      id: 8,
      name: 'Kidney Function Test',
      testsIncluded: 10,
      price: 750,
      originalPrice: 1000,
      discount: '25% off',
      memberPrice: 600,
      icon: '🫘'
    }
  ];

  const totalSlides = testCards.length;
  // Changed from totalSlides - 4 to totalSlides - 1 to allow sliding to the last card
  const maxIndex = totalSlides - 1;

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
        <h2 className="text-2xl font-bold">Top Booked Tests ({testCards.length})</h2>
        <button className="text-blue-700 font-medium">View All</button>
      </div>

      <div className="relative overflow-hidden">
        {/* Navigation buttons */}
        {currentIndex > 0 && (
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg p-2 rounded-full hover:bg-gray-100 z-10"
            aria-label="Previous slide"
            disabled={isAnimating}
          >
            <ChevronLeft size={20} />
          </button>
        )}
        
        {currentIndex < maxIndex && (
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
              // Modified to only move one card at a time (25% divided by 4)
              transform: `translateX(-${currentIndex * 25 / 4}%)` 
            }}
          >
            {testCards.map((card) => (
              <div key={card.id} className="w-full sm:w-1/2 lg:w-1/4 flex-shrink-0 px-2">
                <div className="border rounded-lg overflow-hidden shadow-sm h-full">
                  <div className="p-4 flex items-start">
                    <div className="bg-gray-100 p-3 rounded-lg mr-3">
                      <span className="text-2xl">{card.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm mb-1">{card.name}</h3>
                      <p className="text-gray-500 text-xs">{card.testsIncluded} Tests Included</p>
                    </div>
                  </div>
                  <div className="p-4 pt-0 flex justify-between items-center">
                    <div>
                      <div className="flex items-center">
                        <span className="font-bold text-lg">₹{card.price}</span>
                        <span className="text-gray-400 text-xs line-through ml-1">₹{card.originalPrice}</span>
                        <span className="text-green-600 text-xs ml-1">{card.discount}</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <div className="bg-yellow-500 h-3 w-3 rounded-full mr-1"></div>
                        <span>Member price <span className="font-medium">₹{card.memberPrice}</span></span>
                        <svg className="w-3 h-3 text-gray-500 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </div>
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