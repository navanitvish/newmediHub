// src/pages/CartPage.js
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, updateQuantity, clearCart } from '../redux/slices/cartSlice';
import { Trash2, ChevronLeft, ChevronRight, Minus, Plus, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, total, count } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  // Handle quantity change
  const handleQuantityChange = (id, type, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, type, quantity }));
  };

  // Handle remove item
  const handleRemoveItem = (id, type) => {
    dispatch(removeFromCart({ id, type }));
  };

  // Handle apply coupon
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode === 'HEALTH20') {
      setDiscount(Math.round(total * 0.2));
      alert('Coupon applied successfully!');
    } else {
      alert('Invalid coupon code.');
    }
  };

  // Handle checkout
  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=checkout');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="mr-4 flex items-center text-gray-600 hover:text-blue-600 transition"
          >
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>
          <h1 className="text-2xl font-bold">Your Cart</h1>
        </div>

        {count === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="flex justify-center mb-4">
              <ShoppingBag size={60} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added any tests or packages to your cart yet.</p>
            <Link
              to="/labs"
              className="inline-block bg-blue-600 text-white font-medium px-6 py-3 rounded-md hover:bg-blue-700 transition"
            >
              Browse Lab Tests
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold">Cart Items ({count})</h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <div key={`${item.type}-${item.id}`} className="p-4 flex flex-col sm:flex-row">
                      <div className="flex-grow mb-4 sm:mb-0">
                        <div className="flex items-start">
                          <div className="h-12 w-12 flex items-center justify-center bg-blue-100 rounded-lg text-blue-500 mr-4">
                            <span className="text-2xl">{item.icon || '🔬'}</span>
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-800">{item.name}</h3>
                            <p className="text-sm text-gray-500 mt-1">
                              {item.type === 'test' ? `${item.testsIncluded} Tests Included` : (
                                item.type === 'package' ? item.description : ''
                              )}
                            </p>
                            <div className="mt-2 flex items-center text-sm">
                              <span className="text-blue-600 font-semibold">₹{item.price}</span>
                              {item.originalPrice && (
                                <>
                                  <span className="text-gray-500 line-through ml-2">₹{item.originalPrice}</span>
                                  <span className="text-green-600 ml-2">{item.discount}% off</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.type, item.quantity - 1)}
                            className="p-2 text-gray-600 hover:text-blue-600"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-4">{item.quantity}</span>
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.type, item.quantity + 1)}
                            className="p-2 text-gray-600 hover:text-blue-600"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => handleRemoveItem(item.id, item.type)}
                          className="ml-4 p-2 text-red-500 hover:text-red-700 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-28">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold">Order Summary</h2>
                </div>
                
                <div className="p-4 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal ({count} items)</span>
                    <span className="font-medium">₹{total}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Discount</span>
                      <span className="font-medium text-green-600">- ₹{discount}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Service fee</span>
                    <span className="font-medium">₹50</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 flex justify-between">
                    <span className="font-medium">Total Amount</span>
                    <span className="font-bold text-lg">₹{total - discount + 50}</span>
                  </div>
                  
                  <form onSubmit={handleApplyCoupon} className="pt-4">
                    <div className="flex items-center">
                      <input
                        type="text"
                        className="flex-grow border border-gray-300 rounded-l-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <button 
                        type="submit"
                        className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-r-md hover:bg-blue-700 transition"
                      >
                        Apply
                      </button>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">Try "HEALTH20" for 20% off</div>
                  </form>
                  
                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-green-600 text-white font-medium py-3 rounded-md hover:bg-green-700 transition mt-6"
                  >
                    Proceed to Checkout
                  </button>
                  
                  <button 
                    onClick={() => navigate('/labs')}
                    className="w-full bg-gray-100 text-gray-700 font-medium py-3 rounded-md hover:bg-gray-200 transition"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}