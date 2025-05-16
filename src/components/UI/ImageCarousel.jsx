// import { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// export default function ImageCarousel() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isTransitioning, setIsTransitioning] = useState(false);

//   // Sample carousel data - simplified to just use images
//   const slides = [
//     {
//       id: 1,
     
//       image: "https://images.apollo247.in/pd-cms/cms/2024-10/circle_offer_web_carousel.png?tr=q-80,f-webp,w-1300,dpr-2,c-at_max"
//     },
//     {
//       id: 2,
    
//       image: "https://images.apollo247.in/pd-cms/cms/2023-08/Call%20centre_0.png?tr=q-80,f-webp,w-1300,dpr-2,c-at_max"
//     },
//     {
//       id: 3,
     
//       image: "https://images.apollo247.in/pd-cms/cms/2023-08/Pro%20Health.png?tr=q-80,f-webp,w-1300,dpr-2,c-at_max"
//     },
//     {
//       id: 4,
      
//       image: "https://images.apollo247.in/pd-cms/cms/2023-08/Radiology_0.png?tr=q-80,f-webp,w-1300,dpr-2,c-at_max"
//     },
//     {
//       id: 5,
//       image: "https://images.apollo247.in/pd-cms/cms/2023-09/Diag_Web_Desktop.jpg?tr=q-80,f-webp,w-1300,dpr-2,c-at_max"
//     }
//   ];

//   // Auto-advance slides
//   useEffect(() => {
//     const interval = setInterval(() => {
//       goToNextSlide();
//     }, 2000);
    
//     return () => clearInterval(interval);
//   }, [currentSlide]);

//   const goToPrevSlide = () => {
//     if (isTransitioning) return;
//     setIsTransitioning(true);
//     setTimeout(() => setIsTransitioning(false), 500);
//     setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
//   };

//   const goToNextSlide = () => {
//     if (isTransitioning) return;
//     setIsTransitioning(true);
//     setTimeout(() => setIsTransitioning(false), 500);
//     setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
//   };

//   const goToSlide = (index) => {
//     if (isTransitioning || index === currentSlide) return;
//     setIsTransitioning(true);
//     setTimeout(() => setIsTransitioning(false), 500);
//     setCurrentSlide(index);
//   };

//   return (
//     <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-lg ">
//       {/* Carousel container */}
//       <div className="relative h-64 md:h-80">
//         {/* Slides */}
//         {slides.map((slide, index) => (
//           <div
//             key={slide.id}
//             className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
//               index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
//             }`}
//           >
//             <div className={`flex justify-center items-center h-full w-full `}>
//               <img 
//                 src={slide.image} 
//                 alt={`Slide ${slide.id}`} 
//                 className="max-h-full max-w-full object-contain"
//               />
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Navigation arrows */}
//       <button
//         onClick={goToPrevSlide}
//         className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full p-1 focus:outline-none"
//         aria-label="Previous slide"
//       >
//         <ChevronLeft className="w-6 h-6 text-white stroke-2" />
//       </button>
      
//       <button
//         onClick={goToNextSlide}
//         className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full p-1 focus:outline-none"
//         aria-label="Next slide"
//       >
//         <ChevronRight className="w-6 h-6 text-white stroke-2" />
//       </button>

//       {/* Pagination dots */}
//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => goToSlide(index)}
//             className={`w-2 h-2 rounded-full focus:outline-none ${
//               index === currentSlide 
//                 ? "bg-white w-4" 
//                 : "bg-white bg-opacity-50 hover:bg-opacity-75"
//             }`}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';

export default function ImageCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Sample carousel data with actual image URLs
   const slides = [
    {
      id: 1,
     
      image: "https://images.apollo247.in/pd-cms/cms/2024-10/circle_offer_web_carousel.png?tr=q-80,f-webp,w-1300,dpr-2,c-at_max"
    },
    {
      id: 2,
    
      image: "https://images.apollo247.in/pd-cms/cms/2023-08/Call%20centre_0.png?tr=q-80,f-webp,w-1300,dpr-2,c-at_max"
    },
    {
      id: 3,
     
      image: "https://images.apollo247.in/pd-cms/cms/2023-08/Pro%20Health.png?tr=q-80,f-webp,w-1300,dpr-2,c-at_max"
    },
    {
      id: 4,
      
      image: "https://images.apollo247.in/pd-cms/cms/2023-08/Radiology_0.png?tr=q-80,f-webp,w-1300,dpr-2,c-at_max"
    },
    {
      id: 5,
      image: "https://images.apollo247.in/pd-cms/cms/2023-09/Diag_Web_Desktop.jpg?tr=q-80,f-webp,w-1300,dpr-2,c-at_max"
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 3000);
    
    return () => clearInterval(interval);
  }, [currentSlide]);

  const goToNextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 500);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 500);
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-lg">
      {/* Carousel container */}
      <div className="relative h-64 md:h-80">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="flex justify-center items-center h-full w-full">
              <img 
                src={slide.image} 
                alt={`Slide ${slide.id}`} 
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full focus:outline-none ${
              index === currentSlide 
                ? "bg-black w-4" 
                : "bg-black bg-opacity-50 hover:bg-opacity-75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}