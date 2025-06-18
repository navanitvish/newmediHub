import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, Star, Heart, Eye } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const ProductCarousel = ({ 
  title, 
  viewAllLink, 
  products, 
  formatPrice = (price) => `₹${price}`,
  onAddToCart,
  onProductClick, // New prop for custom product click handler
  baseDetailsPath = '/product' // Base path for product details pages
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const carouselRef = useRef(null);
  const navigate = useNavigate();
  
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
  const handleAddToCart = (product, e) => {
    e.stopPropagation(); // Prevent triggering product click
    if (onAddToCart) {
      onAddToCart({
        id: product.id,
        name: product.name,
        price: product.discountPrice,
        image: product.image,
        quantity: 1,
        manufacturer: product.manufacturer,
        unit: product.unit
      });
    }
  };

  // Handle product click to open details
  const handleProductClick = (product) => {
    if (onProductClick) {
      onProductClick(product);
    } else {
      // Default behavior: navigate to product details page
      navigate(`${baseDetailsPath}/${product.id}`);
    }
  };

  // Handle quick view
  const handleQuickView = (product, e) => {
    e.stopPropagation(); // Prevent triggering product click
    // You can implement a modal or quick view functionality here
    console.log('Quick view for product:', product);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-8 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute -bottom-8 -right-12 w-40 h-40 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-20 blur-2xl"></div>
      </div>

      <div className="flex justify-between items-center mb-8 relative">
        <div>
          <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text mb-2">
            {title}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
        </div>
        {viewAllLink && (
          <Link 
            to={viewAllLink} 
            className="group text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2">
              View All
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform duration-300" />
            </span>
          </Link>
        )}
      </div>

      <div className="relative group/carousel">
        {/* Left scroll button */}
        <button 
          className={`absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300 hover:scale-105 ${scrollPosition <= 0 ? 'opacity-0 pointer-events-none' : 'opacity-0 group-hover/carousel:opacity-100'}`}
          onClick={() => scroll('left')}
          disabled={scrollPosition <= 0}
        >
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>

        {/* Enhanced Carousel container */}
        <div 
          ref={carouselRef}
          className="flex overflow-x-auto gap-8 pb-8 scrollbar-hide snap-x scroll-smooth px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div 
              key={product.id} 
              className="flex-none w-72 snap-start cursor-pointer"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              onClick={() => handleProductClick(product)}
            >
              <div className="bg-white border border-gray-100/50 rounded-2xl h-full flex flex-col shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden group/card relative">
                {/* Action buttons overlay */}
                <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 opacity-0 group-hover/card:opacity-100 transition-all duration-300">
                  <button 
                    className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-red-50 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors duration-200" />
                  </button>
                  <button 
                    className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-blue-50 transition-colors"
                    onClick={(e) => handleQuickView(product, e)}
                  >
                    <Eye className="w-4 h-4 text-gray-600 hover:text-blue-500 transition-colors duration-200" />
                  </button>
                </div>

                {/* Enhanced Badge */}
                {product.badge && (
                  <div className="p-4 pb-2">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full inline-block shadow-sm ${
                      product.badge === 'Top Seller' 
                        ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white' 
                        : product.badge === 'Special Offer'
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                        : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                    }`}>
                      {product.badge}
                    </span>
                  </div>
                )}
                
                {/* Product image */}
                <div className="p-4 flex justify-center bg-gradient-to-br from-gray-50 to-gray-100/50 relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-36 w-full object-cover rounded-xl group-hover/card:scale-105 transition-all duration-300 shadow-sm" 
                  />
                  {/* Rating badge */}
                  <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1 shadow-md flex items-center gap-1 opacity-0 group-hover/card:opacity-100 transition-all duration-300">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs font-medium text-gray-700">4.8</span>
                  </div>
                </div>
                
                {/* Product info */}
                <div className="p-5 flex-grow">
                  <h3 className="text-base font-semibold text-gray-900 line-clamp-2 leading-tight mb-3 group-hover/card:text-blue-900 transition-colors duration-300">
                    {product.name}
                  </h3>
                  
                  {/* Manufacturer info */}
                  {product.manufacturer && (
                    <p className="text-sm text-gray-600 mb-2">by {product.manufacturer}</p>
                  )}
                  
                  {/* Unit info */}
                  {product.unit && (
                    <p className="text-xs text-gray-500 mb-3">{product.unit}</p>
                  )}
                  
                  {/* Price section */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-xl text-gray-900">
                        {formatPrice(product.discountPrice)}
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        {product.originalPrice && product.originalPrice > product.discountPrice && (
                          <span className="text-gray-400 text-xs line-through font-medium">
                            MRP {formatPrice(product.originalPrice)}
                          </span>
                        )}
                        {product.discount && (
                          <span className="text-emerald-600 text-xs font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                            {product.discount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Stock status */}
                  <div className="mb-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      product.inStock 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                    {product.totalSold && (
                      <span className="text-xs text-gray-500 ml-2">
                        {product.totalSold} sold
                      </span>
                    )}
                  </div>
                  
                  {/* Add to cart button */}
                  <button 
                    className={`w-full font-semibold py-2.5 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group/button text-sm ${
                      product.inStock 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    onClick={(e) => handleAddToCart(product, e)}
                    disabled={!product.inStock}
                  >
                    <span className="relative flex items-center justify-center gap-2">
                      <ShoppingCart className="w-4 h-4 transform group-hover/button:rotate-6 transition-transform duration-300" />
                      {product.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right scroll button */}
        <button 
          className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300 hover:scale-105 opacity-0 group-hover/carousel:opacity-100"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="h-5 w-5 text-gray-700" />
        </button>

        {/* Progress indicator */}
        <div className="flex justify-center mt-8 gap-2">
          {[...Array(Math.ceil(products.length / 3))].map((_, index) => (
            <div 
              key={index} 
              className="w-2 h-2 rounded-full bg-gray-300 transition-all duration-300 hover:bg-blue-500"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};