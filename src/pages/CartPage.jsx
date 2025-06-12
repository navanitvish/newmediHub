// File: src/pages/CartPage.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { 
  selectCartItems, 
  selectCartTotalAmount,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart
} from '../redux/slices/cartSlice';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  
  const handleCheckout = () => {
    // Navigate to checkout page
    navigate('/checkout');
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-4 min-h-screen flex flex-col items-center justify-center mt-16">
        <div className="text-center">
          <div className="mb-4 text-gray-400">
            <ShoppingBag size={80} className="mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Explore our wide range of tests and health packages</p>
          <Link 
            to="/" 
            className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition inline-flex items-center"
          >
            <ArrowLeft size={16} className="mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-6xl mx-auto p-4 min-h-screen mt-20 mb-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Your Cart</h1>
        <p className="text-gray-600 mt-1">Review your tests and packages before checkout</p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <div className="text-lg font-medium text-gray-800">
                {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
              </div>
              <button 
                className="text-red-600 text-sm font-medium flex items-center hover:text-red-700"
                onClick={() => dispatch(clearCart())}
              >
                <Trash2 size={16} className="mr-1" />
                Clear Cart
              </button>
            </div>
            
            <div className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.type}`} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between">
                    <div className="flex-1">
                      <div className="flex items-start">
                        <div className="text-3xl mr-3">{item.icon}</div>
                        <div>
                          <h3 className="font-medium text-gray-800">{item.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {item.type === 'package' ? 
                              `${item.tests || item.testsIncluded} Tests Included` : 
                              `Sample: ${item.sampleType || 'Blood'}`
                            }
                          </p>
                          
                          <div className="mt-2 flex items-center text-xs text-gray-600">
                            <div className="flex items-center mr-3">
                              <span>Reports in {item.reportHours || 24} hrs</span>
                            </div>
                            {item.fastingRequired !== undefined && (
                              <div className="flex items-center">
                                <span>Fasting: {item.fastingRequired ? 'Required' : 'Not Required'}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <div className="mb-2">
                        <span className="font-bold text-gray-800">₹{item.price}</span>
                        {item.originalPrice && (
                          <>
                            <span className="text-sm text-gray-500 line-through ml-2">₹{item.originalPrice}</span>
                            <span className="text-sm text-green-600 ml-1">{item.discount}% off</span>
                          </>
                        )}
                      </div>
                      
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button 
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          onClick={() => dispatch(decreaseQuantity({ id: item.id, type: item.type }))}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-3 py-1 border-l border-r border-gray-300">{item.quantity}</span>
                        <button 
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          onClick={() => dispatch(increaseQuantity({ id: item.id, type: item.type }))}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      
                      <button 
                        className="mt-2 text-red-600 text-xs font-medium hover:text-red-700"
                        onClick={() => dispatch(removeFromCart({ id: item.id, type: item.type }))}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6">
            <Link 
              to="/" 
              className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700"
            >
              <ArrowLeft size={16} className="mr-1" />
              Continue Shopping
            </Link>
          </div>
        </div>
        
        <div className="lg:w-1/3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sticky top-24">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>₹{totalAmount}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Discount</span>
                <span className="text-green-600">- ₹{Math.round(totalAmount * 0.1)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Home Collection Charges</span>
                <span className="text-green-600">FREE</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-3 mb-5">
              <div className="flex justify-between font-bold text-gray-800">
                <span>Total</span>
                <span>₹{totalAmount - Math.round(totalAmount * 0.1)}</span>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-100 rounded-md p-3 mb-5">
              <div className="text-sm text-green-800 font-medium">
                You're saving ₹{Math.round(totalAmount * 0.1)} on this order
              </div>
            </div>
            
            <button 
              className="bg-blue-600 text-white w-full py-3 rounded-md font-medium hover:bg-blue-700 transition"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
            
            <div className="mt-4">
              <div className="text-sm text-gray-600 mb-2">We accept:</div>
              <div className="flex space-x-2">
                <div className="bg-gray-200 text-gray-600 rounded px-2 py-1 text-xs">Credit Card</div>
                <div className="bg-gray-200 text-gray-600 rounded px-2 py-1 text-xs">Debit Card</div>
                <div className="bg-gray-200 text-gray-600 rounded px-2 py-1 text-xs">UPI</div>
                <div className="bg-gray-200 text-gray-600 rounded px-2 py-1 text-xs">Net Banking</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;