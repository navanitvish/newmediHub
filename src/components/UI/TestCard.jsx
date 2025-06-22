import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addLabTest } from '../../redux/slices/labTestSlice';

// Dummy test data
const tests = [
  {
    id: 'test1',
    icon: '🧪',
    name: 'Complete Blood Count',
    testsIncluded: 8,
    price: 599,
    originalPrice: 999,
    discount: 40,
    memberPrice: 499
  },
  {
    id: 'test2',
    icon: '🔬',
    name: 'Lipid Profile Test',
    testsIncluded: 4,
    price: 799,
    originalPrice: 1299,
    discount: 38,
    memberPrice: 699
  },
  {
    id: 'test3',
    icon: '🩸',
    name: 'Blood Glucose Test',
    testsIncluded: 2,
    price: 399,
    originalPrice: 699,
    discount: 43
  },
  {
    id: 'test4',
    icon: '❤️',
    name: 'Cardiac Risk Markers',
    testsIncluded: 6,
    price: 1099,
    originalPrice: 1999,
    discount: 45,
    memberPrice: 899
  },
  {
    id: 'test5',
    icon: '🦠',
    name: 'Thyroid Function Test',
    testsIncluded: 3,
    price: 699,
    originalPrice: 1199,
    discount: 42,
    memberPrice: 599
  }
];

export default function TestCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const cardWidth = 256; // Width of each card (w-64) in pixels
  const visibleCards = 3; // Number of cards visible at once
  const maxIndex = tests.length - visibleCards;

  // Handle next slide
  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Handle previous slide
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Update slider position when currentIndex changes
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
  }, [currentIndex]);

  return (
    <div className="relative w-full">
      {/* Card container with overflow hidden */}
      <div className="overflow-hidden w-full">
        {/* Slider */}
        <div 
          ref={sliderRef}
          className="flex transition-transform duration-300 ease-in-out"
          style={{ width: `${tests.length * cardWidth}px` }}
        >
          {tests.map(test => (
            <TestCardItem key={test.id} testData={test} />
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between w-full absolute top-1/2 transform -translate-y-1/2 px-2">
        <button 
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`bg-white rounded-full p-2 shadow-md z-10 ${
            currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
          }`}
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={handleNext}
          disabled={currentIndex >= maxIndex}
          className={`bg-white rounded-full p-2 shadow-md z-10 ${
            currentIndex >= maxIndex ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
          }`}
          aria-label="Next slide"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 mx-1 rounded-full ${
              currentIndex === index ? 'bg-teal-600' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// Individual test card item
function TestCardItem({ testData: test }) {
  const dispatch = useDispatch();
  
  const handleAddToCart = () => {
    dispatch(addLabTest({...test, type: 'test'}));
  };
  
  return (
    <div className="w-64 px-2">
      <div className="border border-gray-300 rounded-lg w-full hover:shadow-md transition">
        <div className="flex items-center p-4 border-b">
          {/* Icon can be uncommented if needed */}
          {/* <div className="text-2xl mr-3">{test.icon}</div> */}
          <div>
            <div className="text-sm font-medium">{test.name}</div>
            <div className="text-xs text-gray-500">{test.testsIncluded} Tests Included</div>
          </div>
        </div>
        <div className="p-3">
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-baseline">
              <span className="font-bold">₹{test.price}</span>
              <span className="text-xs text-gray-500 line-through ml-1">₹{test.originalPrice}</span>
              <span className="text-xs text-green-600 ml-1">{test.discount}% off</span>
            </div>
          </div>
          {test.memberPrice && (
            <div className="flex items-baseline mb-2">
              <div className="text-xs bg-yellow-100 rounded-sm px-1">👨‍⚕️ Member price:</div>
              <span className="text-xs font-medium ml-1">₹{test.memberPrice}</span>
              <span className="text-xs ml-1">▼</span>
            </div>
          )}
          <button
            className="items-center bg-gradient-to-r from-blue-500 to-indigo-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300"
            onClick={handleAddToCart}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}