// import { useState, useRef, useEffect } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';


// const ValueDealsCarousel = () => {
//   const [scrollPosition, setScrollPosition] = useState(0);
//   const carouselRef = useRef(null);
//   const dispatch = useDispatch();
  
//   // Products data
//   const products = [
    // {
    //   id: 1,
    //   name: 'Apollo Life Premium Citrus Refreshing Wet Wipes, 60 count',
    //   originalPrice: 160,
    //   discountPrice: 144,
    //   discount: '10% off',
    //   image: '/api/placeholder/120/120',
    //   badge: 'Bestseller'
    // },
    // {
    //   id: 2,
    //   name: 'Apollo Life Aloe Vera Skin Care Gel, 200 gm (2×100 gm)',
    //   originalPrice: 160,
    //   discountPrice: 144,
    //   discount: '10% off',
    //   image: '/api/placeholder/120/120',
    //   badge: 'Buy 1 Get 1'
    // },
    // {
    //   id: 3,
    //   name: 'Apollo Essentials Sandal Soap, 250 gm (2×125 gm)',
    //   originalPrice: 200,
    //   discountPrice: 180,
    //   discount: '10% off',
    //   image: '/api/placeholder/120/120',
    //   badge: 'Buy 1 Get 1'
    // },
    // {
    //   id: 4,
    //   name: 'Apollo Pharmacy ORS Orange Flavour Drink, 200ml',
    //   originalPrice: 125,
    //   discountPrice: 103.3,
    //   discount: '17% off',
    //   image: '/api/placeholder/120/120',
    //   badge: 'Bestseller'
    // },
    // {
    //   id: 5,
    //   name: 'Apollo Life Neem Tulsi Face Wash, 150 ml (2×75 ml)',
    //   originalPrice: 160,
    //   discountPrice: 144,
    //   discount: '10% off',
    //   image: '/api/placeholder/120/120',
    //   badge: 'Buy 1 Get 1'
    // },
    // {
    //   id: 6,
    //   name: 'Apollo Essentials Lemon Grass Hand Wash, 500 ml',
    //   originalPrice: 160,
    //   discountPrice: 144,
    //   discount: '10% off',
    //   image: '/api/placeholder/120/120',
    //   badge: 'Bestseller'
    // },
    // {
    //   id: 7,
    //   name: 'Apollo Multivitamin Tablets, 100 count',
    //   originalPrice: 180,
    //   discountPrice: 162,
    //   discount: '10% off',
    //   image: '/api/placeholder/120/120',
    //   badge: 'Buy 1 Get 1'
    // },
    // {
    //   id: 8,
    //   name: 'Apollo Hand Sanitizer, 100ml',
    //   originalPrice: 120,
    //   discountPrice: 108,
    //   discount: '10% off',
    //   image: '/api/placeholder/120/120',
    //   badge: 'Bestseller'
    // }
//   ];

//   const scroll = (direction) => {
//     const container = carouselRef.current;
//     if (!container) return;
    
//     const scrollAmount = direction === 'left' ? -container.offsetWidth : container.offsetWidth;
//     container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    
//     // Update scroll position after scrolling
//     setTimeout(() => {
//       setScrollPosition(container.scrollLeft);
//     }, 500);
//   };

//   // Update scroll position on window resize
//   useEffect(() => {
//     const handleResize = () => {
//       if (carouselRef.current) {
//         setScrollPosition(carouselRef.current.scrollLeft);
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Format price with rupee symbol
//   const formatPrice = (price) => {
//     return `₹${price}`;
//   };

//   // Handle adding product to cart
//   const handleAddToCart = (product) => {
//     dispatch(addToCart({
//       id: product.id,
//       name: product.name,
//       price: product.discountPrice,
//       image: product.image,
//       quantity: 1
//     }));
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold">Value Deals at Rs 100</h2>
//         <a href="#" className="text-teal-600 hover:underline text-sm">View All</a>
//       </div>

//       <div className="relative">
//         {/* Left scroll button */}
//         <button 
//           className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 ${scrollPosition <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
//           onClick={() => scroll('left')}
//           disabled={scrollPosition <= 0}
//         >
//           <ChevronLeft className="h-6 w-6 text-gray-700" />
//         </button>

//         {/* Carousel container */}
//         <div 
//           ref={carouselRef}
//           className="flex overflow-x-auto gap-4 pb-6 scrollbar-hide snap-x"
//           style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//         >
//           {products.map((product) => (
//             <div key={product.id} className="flex-none w-64 snap-start">
//               <div className="border rounded-lg h-full flex flex-col">
//                 {/* Badge */}
//                 <div className="p-2">
//                   <span className={`text-xs px-2 py-1 rounded-full inline-block ${
//                     product.badge === 'Bestseller' 
//                       ? 'bg-purple-100 text-purple-800' 
//                       : 'bg-blue-100 text-blue-800'
//                   }`}>
//                     {product.badge}
//                   </span>
//                 </div>
                
//                 {/* Product image */}
//                 <div className="p-4 flex justify-center">
//                   <img 
//                     src={product.image} 
//                     alt={product.name} 
//                     className="h-32 object-contain" 
//                   />
//                 </div>
                
//                 {/* Product info */}
//                 <div className="p-4 flex-grow">
//                   <h3 className="text-sm font-medium text-gray-800 line-clamp-2 h-10">
//                     {product.name}
//                   </h3>
//                 </div>
                
//                 {/* Price section */}
//                 <div className="p-4 pt-0">
//                   <div className="flex items-center mb-3">
//                     <span className="font-bold text-lg">
//                       {formatPrice(product.discountPrice)}
//                     </span>
//                     <span className="text-gray-500 text-xs line-through ml-2">
//                       MRP {formatPrice(product.originalPrice)}
//                     </span>
//                     <span className="text-green-600 text-xs ml-2">
//                       {product.discount}
//                     </span>
//                   </div>
                  
//                   {/* Add button */}
//                   <button 
//                     className="w-full py-2 bg-teal-700 text-white rounded hover:bg-teal-800 transition-colors"
//                     onClick={() => handleAddToCart(product)}
//                   >
//                     ADD
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Right scroll button */}
//         <button 
//           className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
//           onClick={() => scroll('right')}
//         >
//           <ChevronRight className="h-6 w-6 text-gray-700" />
//         </button>
//       </div>
//     </div>
//   );

// };

// export default ValueDealsCarousel;



import { useDispatch } from 'react-redux';
import { ProductCarousel } from "../../components/UI/ProductCarousel";
import { addToCart } from '../../redux/slices/cartSlice';


export const ValueDealsCarousel = () => {
  const dispatch = useDispatch();
  // This could come from a context, redux, or props
  const handleAddToCart = (product) => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.discountPrice,
      image: product.image,
      quantity: 1
    }));
  };
  
  // Example products data
  const valueDealsProducts = [
    {
      id: 1,
      name: 'Apollo Life Premium Citrus Refreshing Wet Wipes, 60 count',
      originalPrice: 160,
      discountPrice: 144,
      discount: '10% off',
      image: '/api/placeholder/120/120',
      badge: 'Bestseller'
    },
    {
      id: 2,
      name: 'Apollo Life Aloe Vera Skin Care Gel, 200 gm (2×100 gm)',
      originalPrice: 160,
      discountPrice: 144,
      discount: '10% off',
      image: '/api/placeholder/120/120',
      badge: 'Buy 1 Get 1'
    },
    {
      id: 1,
      name: 'Apollo Life Premium Citrus Refreshing Wet Wipes, 60 count',
      originalPrice: 160,
      discountPrice: 144,
      discount: '10% off',
      image: '/api/placeholder/120/120',
      badge: 'Bestseller'
    },
    {
      id: 2,
      name: 'Apollo Life Aloe Vera Skin Care Gel, 200 gm (2×100 gm)',
      originalPrice: 160,
      discountPrice: 144,
      discount: '10% off',
      image: '/api/placeholder/120/120',
      badge: 'Buy 1 Get 1'
    },
    {
      id: 3,
      name: 'Apollo Essentials Sandal Soap, 250 gm (2×125 gm)',
      originalPrice: 200,
      discountPrice: 180,
      discount: '10% off',
      image: '/api/placeholder/120/120',
      badge: 'Buy 1 Get 1'
    },
    {
      id: 4,
      name: 'Apollo Pharmacy ORS Orange Flavour Drink, 200ml',
      originalPrice: 125,
      discountPrice: 103.3,
      discount: '17% off',
      image: '/api/placeholder/120/120',
      badge: 'Bestseller'
    },
    {
      id: 5,
      name: 'Apollo Life Neem Tulsi Face Wash, 150 ml (2×75 ml)',
      originalPrice: 160,
      discountPrice: 144,
      discount: '10% off',
      image: '/api/placeholder/120/120',
      badge: 'Buy 1 Get 1'
    },
    {
      id: 6,
      name: 'Apollo Essentials Lemon Grass Hand Wash, 500 ml',
      originalPrice: 160,
      discountPrice: 144,
      discount: '10% off',
      image: '/api/placeholder/120/120',
      badge: 'Bestseller'
    },
    {
      id: 7,
      name: 'Apollo Multivitamin Tablets, 100 count',
      originalPrice: 180,
      discountPrice: 162,
      discount: '10% off',
      image: '/api/placeholder/120/120',
      badge: 'Buy 1 Get 1'
    },
    {
      id: 8,
      name: 'Apollo Hand Sanitizer, 100ml',
      originalPrice: 120,
      discountPrice: 108,
      discount: '10% off',
      image: '/api/placeholder/120/120',
      badge: 'Bestseller'
    }
    // Add more products as needed...
  ];
  
  return (
    <ProductCarousel
      title="Value Deals at Rs 100"
      viewAllLink="#value-deals"
      products={valueDealsProducts}
      onAddToCart={handleAddToCart}
    />
  );
};