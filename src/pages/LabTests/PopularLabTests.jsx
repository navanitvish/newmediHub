import { useState, useRef } from 'react';
import { ChevronRight, ChevronLeft, Activity, ArrowRight } from 'lucide-react';

export default function PopularLabTests() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  
  const labTests = [
    {
      id: 1,
      name: 'CBC Test (Complete Blood Count)',
      testsIncluded: '30 Tests Included',
      color: 'bg-blue-100',
      iconColor: 'text-blue-500',
    },
    {
      id: 2,
      name: 'HbA1c Test (Hemoglobin A1c)',
      testsIncluded: '3 Tests Included',
      color: 'bg-green-100',
      iconColor: 'text-green-500',
    },
    {
      id: 3,
      name: 'FBS (Fasting Blood Sugar) Test',
      testsIncluded: '1 Test Included',
      color: 'bg-purple-100',
      iconColor: 'text-purple-500',
    },
    {
      id: 4,
      name: 'Lipid Profile Test',
      testsIncluded: '8 Tests Included',
      color: 'bg-orange-100',
      iconColor: 'text-orange-500',
    },
    {
      id: 5,
      name: 'Thyroid Profile Test',
      testsIncluded: '4 Tests Included',
      color: 'bg-pink-100',
      iconColor: 'text-pink-500',
    },
    {
      id: 6,
      name: 'Vitamin D Test',
      testsIncluded: '1 Test Included',
      color: 'bg-cyan-100',
      iconColor: 'text-cyan-500',
    }
  ];
  
  const totalSlides = labTests.length;
  const visibleSlides = 3;
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === totalSlides - visibleSlides ? prevIndex : prevIndex + 1
    );
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? prevIndex : prevIndex - 1
    );
  };

  const handleCardClick = (id) => {
    // This would handle navigation in a real application
    console.log(`Navigating to test details for ID: ${id}`);
    // Example: router.push(`/tests/${id}`);
  };

  // Show/hide navigation buttons based on current position
  const showLeftArrow = currentIndex > 0;
  const showRightArrow = currentIndex < totalSlides - visibleSlides;
  
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12  rounded-xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Popular Lab Tests</h1>
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            className={`${showLeftArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'} 
                        transition-opacity duration-300 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 border border-gray-200`}
            disabled={!showLeftArrow}
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} className="text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className={`${showRightArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'} 
                        transition-opacity duration-300 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 border border-gray-200`}
            disabled={!showRightArrow}
            aria-label="Next slide"
          >
            <ChevronRight size={20} className="text-gray-700" />
          </button>
        </div>
      </div>
      
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-all duration-500 ease-in-out gap-6"
          style={{ transform: `translateX(-${currentIndex * (100 / totalSlides) * (totalSlides/visibleSlides)}%)` }}
        >
          {labTests.map((test) => (
            <div 
              key={test.id} 
              className="min-w-[calc(33.333%-16px)] flex-shrink-0 py-6"
              onClick={() => handleCardClick(test.id)}
            >
              <div className={`${test.color} rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 h-full cursor-pointer transform hover:translate-y-[-4px] border border-gray-100 group`}>
                <div className="flex items-start">
                  <div className={`${test.iconColor} p-3 rounded-lg bg-white shadow-sm mr-4`}>
                    <Activity size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1 text-lg group-hover:text-blue-700 transition-colors">{test.name}</h3>
                    <p className="text-gray-600 font-medium">{test.testsIncluded}</p>
                  </div>
                  <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight size={20} className="text-blue-600" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}