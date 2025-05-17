import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const ProductCarousel = ({ 
  title, 
  viewAllLink, 
  products, 
  formatPrice = (price) => `₹${price}`,
  onAddToCart 
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef(null);
  
  const scroll = (direction) => {
    const container = carouselRef.current;
    if (!container) return;
    
    const scrollAmount = direction === 'left' ? -container.offsetWidth : container.offsetWidth;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    
    // Update scroll position after scrolling
    setTimeout(() => {
      setScrollPosition(container.scrollLeft);
    }, 500);
  };

  // Update scroll position on window resize
  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current) {
        setScrollPosition(carouselRef.current.scrollLeft);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle adding product to cart
  const handleAddToCart = (product) => {
    if (onAddToCart) {
      onAddToCart({
        id: product.id,
        name: product.name,
        price: product.discountPrice,
        image: product.image,
        quantity: 1
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        {viewAllLink && (
          <a href={viewAllLink} className="text-teal-600 hover:underline text-sm">View All</a>
        )}
      </div>

      <div className="relative">
        {/* Left scroll button */}
        <button 
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 ${scrollPosition <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => scroll('left')}
          disabled={scrollPosition <= 0}
        >
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </button>

        {/* Carousel container */}
        <div 
          ref={carouselRef}
          className="flex overflow-x-auto gap-4 pb-6 scrollbar-hide snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div key={product.id} className="flex-none w-64 snap-start">
              <div className="border rounded-lg h-full flex flex-col">
                {/* Badge */}
                {product.badge && (
                  <div className="p-2">
                    <span className={`text-xs px-2 py-1 rounded-full inline-block ${
                      product.badge === 'Bestseller' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {product.badge}
                    </span>
                  </div>
                )}
                
                {/* Product image */}
                <div className="p-2 flex justify-center">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-32 w-full object-cover" 
                  />
                </div>
                
                {/* Product info */}
                <div className="p-4 flex-grow">
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-2 h-10">
                    {product.name}
                  </h3>
                </div>
                
                {/* Price section */}
                <div className="p-4 pt-0">
                  <div className="flex items-center mb-3">
                    <span className="font-bold text-lg">
                      {formatPrice(product.discountPrice)}
                    </span>
                    {product.originalPrice && (
                      <>
                        <span className="text-gray-500 text-xs line-through ml-2">
                          MRP {formatPrice(product.originalPrice)}
                        </span>
                        {product.discount && (
                          <span className="text-green-600 text-xs ml-2">
                            {product.discount}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                  
                  {/* Add button */}
                  <button 
                    className="w-full items-center bg-gradient-to-r from-blue-500 to-indigo-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-300"
                    onClick={() => handleAddToCart(product)}
                  >
                    ADD
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right scroll button */}
        <button 
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="h-6 w-6 text-gray-700" />
        </button>
      </div>
    </div>
  );
};