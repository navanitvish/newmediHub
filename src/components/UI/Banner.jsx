import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BannerCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);
  
  // Banner data
  const banners = [
    {
      id: 1,
      image: 'https://images.apollo247.in/os/prod-media/creative-1744648844529-nivea_luminous_824x412.jpg?tr=q-60,f-webp,w-450,dpr-1,c-at_max',
      alt: 'Seven Seas Supplement',
      description: 'Power of 5 Ingredients for Multivitamin Supplement',
      ctaText: 'Order now',
      bgColor: 'bg-red-700'
    },
    {
      id: 2,
      image: 'https://images.apollo247.in/os/prod-media/creative-1745115518037-chicco_diapers_no_offer.jpg?tr=q-60,f-webp,w-450,dpr-1,c-at_max',
      alt: 'Neurobion Forte',
      description: 'Helps Relieve Tingling, Numbness, and Weakness',
      ctaText: 'Order now',
      bgColor: 'bg-blue-600'
    },
    {
      id: 3,
      image: 'https://images.apollo247.in/os/prod-media/creative-1744642750950-sevenseas_824x412.png?tr=q-60,f-webp,w-450,dpr-1,c-at_max',
      alt: 'Evion Vitamin E',
      description: 'Powerful Antioxidant to Repair & Protect cells',
      ctaText: 'Order now',
      bgColor: 'bg-green-600'
    },
    {
      id: 4,
      image: 'https://images.apollo247.in/os/prod-media/creative-1744643858710-neurobion_824x412.png?tr=q-60,f-webp,w-450,dpr-1,c-at_max',
      alt: 'Diabetes Care',
      description: 'Complete range of diabetes management products',
      ctaText: 'Shop now',
      bgColor: 'bg-purple-600'
    },
    {
      id: 5,
      image: 'https://images.apollo247.in/os/prod-media/creative-1744864759648-onetouch_app_web.jpg?tr=q-60,f-webp,w-450,dpr-1,c-at_max',
      alt: 'Immunity Boosters',
      description: 'Strengthen your immune system naturally',
      ctaText: 'Explore',
      bgColor: 'bg-amber-600'
    }
  ];

  // Get visible banners (3 at a time)
  const getVisibleBanners = () => {
    const totalBanners = banners.length;
    
    // Ensure we always have 3 banners visible
    return [
      banners[currentIndex],
      banners[(currentIndex + 1) % totalBanners],
      banners[(currentIndex + 2) % totalBanners]
    ];
  };

  // Auto-scroll functionality
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
      }, 4000); // Change every 4 seconds
      
      return () => clearInterval(interval);
    }
  }, [isPaused, banners.length]);

  // Navigate to previous set
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex - 1 + banners.length) % banners.length
    );
  };

  // Navigate to next set
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % banners.length
    );
  };

  // Handle mouse enter/leave for pausing auto-scroll
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <div 
      className="relative max-w-7xl mx-auto my-8"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Left navigation button */}
      <button 
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-70 rounded-full p-2 shadow-lg hover:bg-opacity-100 transition-all"
        onClick={prevSlide}
        aria-label="Previous banners"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* Banners container */}
      <div 
        ref={carouselRef}
        className="flex gap-4 px-10 transition-all duration-500 ease-in-out"
      >
        {getVisibleBanners().map((banner) => (
          <div 
            key={banner.id} 
            className="flex-1 min-w-0 transition-all duration-500"
          >
            <div className={`relative ${banner.bgColor} rounded-lg overflow-hidden h-64`}>
              <img 
                src={banner.image} 
                alt={banner.alt} 
                className="w-full h-full object-cover"
              />
              
            
            </div>
          </div>
        ))}
      </div>

      {/* Right navigation button */}
      <button 
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-70 rounded-full p-2 shadow-lg hover:bg-opacity-100 transition-all"
        onClick={nextSlide}
        aria-label="Next banners"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Pagination indicators */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                ? 'w-8 bg-blue-600' 
                : 'bg-gray-300'
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide set ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;