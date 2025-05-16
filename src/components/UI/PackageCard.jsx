// import React from 'react';
// import { ChevronRight, ChevronLeft, Calendar, MapPin, Clock, Users, Plus } from 'lucide-react';
// import { useDispatch } from 'react-redux';
// import { addToCart } from '../../redux/slices/cartSlice';

// const UpperLogicCardSlider = () => {
//   const [currentSlide, setCurrentSlide] = React.useState(0);
//   const maxVisibleItems = 4; // Show 4 items in the upper slider
//   const dispatch = useDispatch();
  
//   // Logic cards data
//   const logicCards = [
    // {
    //   id: 'logic1',
    //   icon: '🔬',
    //   name: 'Home Sample Collection',
    //   description: 'Get your samples collected from the comfort of your home',
    //   price: 299,
    //   originalPrice: 499,
    //   discount: 40,
    //   availability: 'Same day',
    //   locations: 250,
    //   tag: 'MOST CONVENIENT',
    //   rating: 4.8
    // },
    // {
    //   id: 'logic2',
    //   icon: '🏥',
    //   name: 'Lab Visit Appointment',
    //   description: 'Schedule a visit to our nearest diagnostic center',
    //   price: 199,
    //   originalPrice: 349,
    //   discount: 43,
    //   availability: '24/7',
    //   locations: 130,
    //   tag: 'BEST PRICE',
    //   rating: 4.6
    // },
    // {
    //   id: 'logic3',
    //   icon: '👩‍⚕️',
    //   name: 'Doctor Consultation',
    //   description: 'Online consultation with specialist doctors',
    //   price: 599,
    //   originalPrice: 999,
    //   discount: 40,
    //   availability: 'Within 2 hours',
    //   specialties: 18,
    //   tag: 'POPULAR',
    //   rating: 4.9
    // },
    // {
    //   id: 'logic4',
    //   icon: '📊',
    //   name: 'Health Assessment',
    //   description: 'Comprehensive health risk assessment',
    //   price: 399,
    //   originalPrice: 699,
    //   discount: 43,
    //   reportTime: '1 hour',
    //   parameters: 15,
    //   tag: 'QUICK',
    //   rating: 4.5
    // },
    // {
    //   id: 'logic5',
    //   icon: '💊',
    //   name: 'Medication Delivery',
    //   description: 'Get your prescribed medications delivered',
    //   price: 149,
    //   originalPrice: 249,
    //   discount: 40,
    //   deliveryTime: '2 hours',
    //   coverage: '95% cities',
    //   tag: 'RELIABLE',
    //   rating: 4.7
    // },
    // {
    //   id: 'logic6',
    //   icon: '🥗',
    //   name: 'Diet Consultation',
    //   description: 'Personalized nutrition and diet plans',
    //   price: 499,
    //   originalPrice: 899,
    //   discount: 44,
    //   sessionTime: '45 min',
    //   followUps: 2,
    //   tag: 'EFFECTIVE',
    //   rating: 4.8
    // }
//   ];
  
//   const slideLeft = () => {
//     setCurrentSlide(Math.max(0, currentSlide - 1));
//   };

//   const slideRight = () => {
//     setCurrentSlide(Math.min(logicCards.length - maxVisibleItems, currentSlide + 1));
//   };

//   // Function to handle adding a service to cart
//   const handleAddToCart = (service) => {
//     dispatch(addToCart({...service, type: 'service'}));
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-4 mb-8">
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800">Healthcare Services</h2>
//           <p className="text-gray-500 text-sm mt-1">Essential services to make your healthcare journey smoother</p>
//         </div>
//         <div className="flex space-x-3">
//           <button 
//             className="bg-gray-100 p-2.5 rounded-full hover:bg-gray-200 disabled:opacity-50 transition-colors"
//             onClick={slideLeft}
//             disabled={currentSlide === 0}
//           >
//             <ChevronLeft size={20} className="text-gray-700" />
//           </button>
//           <button 
//             className="bg-gray-100 p-2.5 rounded-full hover:bg-gray-200 disabled:opacity-50 transition-colors"
//             onClick={slideRight}
//             disabled={currentSlide >= logicCards.length - maxVisibleItems}
//           >
//             <ChevronRight size={20} className="text-gray-700" />
//           </button>
//         </div>
//       </div>
      
//       <div className="flex space-x-4 overflow-hidden">
//         {logicCards.slice(currentSlide, currentSlide + maxVisibleItems).map(card => (
//           <div key={card.id} className="flex-shrink-0 w-full md:w-66 space-y-4 p-4 bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
//             <div className="p-4 border-b border-gray-100 relative">
//               {card.tag && (
//                 <div className={`absolute top-[-0.5rem] right-3 text-xs font-bold px-2 py-0.5 rounded-full uppercase ${
//                   card.tag.includes('PRICE') ? 'bg-green-100 text-green-700' : 
//                   card.tag.includes('CONVENIENT') ? 'bg-indigo-100 text-indigo-700' : 
//                   card.tag.includes('POPULAR') ? 'bg-blue-100 text-blue-700' :
//                   card.tag.includes('QUICK') ? 'bg-orange-100 text-orange-700' :
//                   card.tag.includes('RELIABLE') ? 'bg-teal-100 text-teal-700' :
//                   'bg-purple-100 text-purple-700'
//                 }`}>
//                   {card.tag}
//                 </div>
//               )}
//               <div className="flex items-center mb-2">
//                 <div className="text-2xl mr-2">{card.icon}</div>
//                 <h3 className="font-bold text-gray-800 text-sm">{card.name}</h3>
//               </div>
//               <p className="text-xs text-gray-600 h-8 overflow-hidden">{card.description}</p>
//             </div>
            
//             <div className="p-4">
//               <div className="flex justify-between items-center mb-2">
//                 <div className="flex items-baseline">
//                   <span className="text-lg font-bold text-gray-900">₹{card.price}</span>
//                   <span className="text-xs text-gray-500 line-through ml-1">₹{card.originalPrice}</span>
//                 </div>
//                 <div className="bg-green-100 text-green-700 text-xs font-medium px-1.5 py-0.5 rounded">
//                   {card.discount}% OFF
//                 </div>
//               </div>
              
//               <div className="flex flex-col space-y-1.5 mb-3">
//                 {card.availability && (
//                   <div className="flex items-center text-xs text-gray-500">
//                     <Clock size={12} className="mr-1" />
//                     <span>Available: {card.availability}</span>
//                   </div>
//                 )}
                
//                 {card.locations && (
//                   <div className="flex items-center text-xs text-gray-500">
//                     <MapPin size={12} className="mr-1" />
//                     <span>{card.locations}+ locations</span>
//                   </div>
//                 )}
                
//                 {card.specialties && (
//                   <div className="flex items-center text-xs text-gray-500">
//                     <Users size={12} className="mr-1" />
//                     <span>{card.specialties} specialties</span>
//                   </div>
//                 )}
                
//                 {card.deliveryTime && (
//                   <div className="flex items-center text-xs text-gray-500">
//                     <Clock size={12} className="mr-1" />
//                     <span>Delivery: {card.deliveryTime}</span>
//                   </div>
//                 )}
                
//                 {card.sessionTime && (
//                   <div className="flex items-center text-xs text-gray-500">
//                     <Calendar size={12} className="mr-1" />
//                     <span>Session: {card.sessionTime}</span>
//                   </div>
//                 )}
//               </div>
              
//             <div className="flex justify-end mt-4"  >
//                 <button 
//                 className="items-center bg-gradient-to-r from-blue-500 to-indigo-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300"
//                 onClick={() => handleAddToCart(card)}
//               >
//                 Add 
//               </button>
//             </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UpperLogicCardSlider;


import React from 'react';
import CheckupPackageList from '../../components/UI/CheckupPackageList';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
const Womanwellness = () => {
    const dispatch = useDispatch();
  const handleAddToCart = (pkg) => {
    dispatch (addToCart({
      id: pkg.id,
      name: pkg.name,
      price: pkg.discountPrice,
      image: pkg.iconSrc,
      quantity: 1
    }));


   
  };
  
  // Sample data for diagnostic tests
  const diagnosticTests = [
    {
      id: 1,
      name: 'Women Wellness',
      iconSrc: '/api/placeholder/40/40',
      originalPrice: 600,
      discountPrice: 299,
      discount: '50% off',
      reportTime: '6 hours',
      tag: 'POPULAR'
  },
   {
      id: 1,
      name: 'hairfall check ',
      iconSrc: '/api/placeholder/40/40',
      originalPrice: 600,
      discountPrice: 299,
      discount: '50% off',
      reportTime: '6 hours',
      tag: 'POPULAR'
  },
   {
      id: 1,
      name: 'THS test check ',
      iconSrc: '/api/placeholder/40/40',
      originalPrice: 600,
      discountPrice: 299,
      discount: '50% off',
      reportTime: '6 hours',
      tag: 'POPULAR'
   },
    {
      id: 1,
      name: 'HBA1c ',
      iconSrc: '/api/placeholder/40/40',
      originalPrice: 600,
      discountPrice: 299,
      discount: '50% off',
      reportTime: '6 hours',
      tag: 'POPULAR'
  },
   {
      id: 1,
      name: ' LDH test',
      iconSrc: '/api/placeholder/40/40',
      originalPrice: 600,
      discountPrice: 299,
      discount: '50% off',
      reportTime: '6 hours',
      tag: 'POPULAR'
  },




  ];
  
  return (
    <CheckupPackageList
      title="Women Wellness " 
      packageCount={12}
      packages={diagnosticTests}
      viewAllLink="/diagnostic-tests"
      onAddToCart={handleAddToCart}
    />
  );
};

export default Womanwellness;

// Main component that combines both



