// File: src/components/CartSummary.js
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';

export default function CartSummary() {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  
  if (cartItems.length === 0) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4 z-40">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <div className="font-medium">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in cart</div>
            <div className="text-sm text-gray-600">Total: ₹{cartTotal}</div>
          </div>
          <Link 
            to="/checkout"
            className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}