// File: src/components/PackageCard.js
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';

export default function PackageCard({ pack }) {
  const dispatch = useDispatch();
  
  const handleAddToCart = () => {
    dispatch(addToCart({...pack, type: 'package'}));
  };
  
  return (
    <div className="border border-gray-300 rounded-lg w-64 flex-shrink-0 hover:shadow-md transition">
      <div className="flex flex-col items-center p-4 border-b relative">
        <div className="absolute top-0 left-0 bg-purple-200 text-purple-800 text-xs px-2 py-0.5 rounded-tl-lg rounded-br-lg uppercase font-medium">
          Package
        </div>
        <div className="text-3xl mb-1">{pack.icon}</div>
        <div className="text-sm font-medium text-center">{pack.name}</div>
        <div className="text-xs text-gray-500 text-center">{pack.description}</div>
        {pack.tag && (
          <div className={`text-xs uppercase mt-1 font-bold ${
            pack.tag.includes('VALUE') ? 'text-green-600' : 
            pack.tag.includes('BEST') ? 'text-red-600' : 
            'text-blue-600'
          }`}>
            {pack.tag}
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-baseline">
            <span className="font-bold">₹{pack.price}</span>
            <span className="text-xs text-gray-500 line-through ml-1">₹{pack.originalPrice}</span>
            <span className="text-xs text-green-600 ml-1">{pack.discount}% off</span>
          </div>
        </div>
        {pack.memberPrice && (
          <div className="flex items-baseline mb-2">
            <div className="text-xs bg-yellow-100 rounded-sm px-1">👨‍⚕️ Member price:</div>
            <span className="text-xs font-medium ml-1">₹{pack.memberPrice}</span>
            <span className="text-xs ml-1">▼</span>
          </div>
        )}
        <button 
          className="bg-teal-600 text-white rounded w-full py-1.5 text-sm font-medium mb-2 hover:bg-teal-700 transition"
          onClick={handleAddToCart}
        >
          Add
        </button>
        <div className="flex items-center justify-center text-xs text-gray-500">
          <span className="mr-1">📋</span>
          <span>Reports within: {pack.reportHours} hours</span>
        </div>
      </div>
    </div>
  );
}