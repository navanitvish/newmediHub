// File: src/components/TestCard.js
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';

export default function TestCard({ test }) {
  const dispatch = useDispatch();
  
  const handleAddToCart = () => {
    dispatch(addToCart({...test, type: 'test'}));
  };
  
  return (
    <div className="border border-gray-300 rounded-lg w-64 flex-shrink-0 hover:shadow-md transition">
      <div className="flex items-center p-4 border-b">
        <div className="text-2xl mr-3">{test.icon}</div>
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
        <div className="flex items-baseline mb-2">
          <div className="text-xs bg-yellow-100 rounded-sm px-1">👨‍⚕️ Member price:</div>
          <span className="text-xs font-medium ml-1">₹{test.memberPrice}</span>
          <span className="text-xs ml-1">▼</span>
        </div>
        <button 
          className="bg-teal-600 text-white rounded w-full py-1.5 text-sm font-medium hover:bg-teal-700 transition"
          onClick={handleAddToCart}
        >
          Add
        </button>
      </div>
    </div>
  );
}