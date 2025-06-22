import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { 
  removeLabTest,
  increaseLabTestQuantity,
  decreaseLabTestQuantity,
  clearLabTests
} from '../redux/slices/labTestSlice';
import { 
  removeMedicine,
  increaseMedicineQuantity,
  decreaseMedicineQuantity,
  clearMedicines
} from '../redux/slices/medicineSlice';
import { 
  ArrowLeft, 
  Plus, 
  Minus, 
  Trash2, 
  ShoppingBag, 
  TestTube, 
  Pill,
  Clock,
  Shield,
  Users,
  Calendar,
  Thermometer,
  Heart,
  AlertCircle,
  Package
} from 'lucide-react';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  
  // Get cart data from both slices
  const labTests = useSelector(state => state.labTests);
  const medicines = useSelector(state => state.medicines);
  
  // Calculate totals
  const totalLabTestAmount = labTests.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalMedicineAmount = medicines.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalAmount = totalLabTestAmount + totalMedicineAmount;
  const totalItems = labTests.items.length + medicines.items.length;
  const totalQuantity = labTests.items.reduce((sum, item) => sum + item.quantity, 0) + 
                       medicines.items.reduce((sum, item) => sum + item.quantity, 0);
  
  // Filter items based on active tab
  const getFilteredItems = () => {
    switch (activeTab) {
      case 'labtests':
        return labTests.items;
      case 'medicines':
        return medicines.items;
      default:
        return [...labTests.items, ...medicines.items];
    }
  };
  
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  const handleRemoveItem = (item) => {
    if (item.type === 'labtest' || item.category === 'labtest') {
      dispatch(removeLabTest({ id: item.id }));
    } else {
      dispatch(removeMedicine({ id: item.id }));
    }
  };
  
  const handleIncreaseQuantity = (item) => {
    if (item.type === 'labtest' || item.category === 'labtest') {
      dispatch(increaseLabTestQuantity({ id: item.id }));
    } else {
      dispatch(increaseMedicineQuantity({ id: item.id }));
    }
  };
  
  const handleDecreaseQuantity = (item) => {
    if (item.type === 'labtest' || item.category === 'labtest') {
      dispatch(decreaseLabTestQuantity({ id: item.id }));
    } else {
      dispatch(decreaseMedicineQuantity({ id: item.id }));
    }
  };
  
  const handleClearAll = () => {
    dispatch(clearLabTests());
    dispatch(clearMedicines());
  };
  
  const handleClearCategory = () => {
    if (activeTab === 'labtests') {
      dispatch(clearLabTests());
    } else if (activeTab === 'medicines') {
      dispatch(clearMedicines());
    } else {
      handleClearAll();
    }
  };

  // Render individual cart item
  const renderCartItem = (item) => {
    const isLabTest = item.type === 'labtest' || item.category === 'labtest';
    const itemTotal = item.price * item.quantity;
    const originalTotal = item.originalPrice ? item.originalPrice * item.quantity : null;
    const discountPercent = item.originalPrice ? 
      Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100) : 0;

    return (
      <div key={`${item.id}-${item.type || item.category}`} className="p-4 hover:bg-gray-50 transition-colors">
        <div className="flex gap-4">
          {/* Item Image */}
          <div className="flex-shrink-0">
            {item.image ? (
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-16 h-16 rounded-lg object-cover border border-gray-200"
              />
            ) : (
              <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${
                isLabTest ? 'bg-blue-100' : 'bg-green-100'
              }`}>
                {isLabTest ? 
                  <TestTube className="text-blue-600" size={24} /> :
                  <Pill className="text-green-600" size={24} />
                }
              </div>
            )}
          </div>
          
          {/* Item Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 text-sm">{item.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    isLabTest 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {isLabTest ? 'Lab Test' : 'Medicine'}
                  </span>
                </div>
                
                {/* Description */}
                {item.description && (
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                )}
                
                {/* Lab Test Specific Details */}
                {isLabTest && (
                  <div className="flex flex-wrap gap-3 text-xs text-gray-600 mb-2">
                    {item.reportTime && (
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>Report in {item.reportTime}</span>
                      </div>
                    )}
                    {item.sampleType && (
                      <div className="flex items-center gap-1">
                        <Thermometer size={12} />
                        <span>{item.sampleType} sample</span>
                      </div>
                    )}
                    {item.homeCollection && (
                      <div className="flex items-center gap-1 text-green-600">
                        <Users size={12} />
                        <span>Home collection</span>
                      </div>
                    )}
                    {item.fastingRequired && (
                      <div className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full flex items-center gap-1">
                        <AlertCircle size={10} />
                        <span>Fasting required</span>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Medicine Specific Details */}
                {!isLabTest && (
                  <div className="flex flex-wrap gap-3 text-xs text-gray-600 mb-2">
                    {item.manufacturer && (
                      <div className="flex items-center gap-1">
                        <Package size={12} />
                        <span>{item.manufacturer}</span>
                      </div>
                    )}
                    {item.strip && (
                      <span>{item.strip}</span>
                    )}
                    {item.dosage && (
                      <span>{item.dosage}</span>
                    )}
                    {item.prescription && (
                      <div className="bg-red-100 text-red-700 px-2 py-1 rounded-full flex items-center gap-1">
                        <Shield size={10} />
                        <span>Prescription required</span>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Price */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-gray-900">₹{itemTotal.toLocaleString()}</span>
                  {originalTotal && (
                    <>
                      <span className="text-sm text-gray-500 line-through">₹{originalTotal.toLocaleString()}</span>
                      <span className="text-sm text-green-600 font-medium">{discountPercent}% off</span>
                    </>
                  )}
                  {item.quantity > 1 && (
                    <span className="text-xs text-gray-500">(₹{item.price} each)</span>
                  )}
                </div>
              </div>
            </div>
            
            {/* Quantity Controls and Remove */}
            <div className="flex items-center justify-between">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button 
                  className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
                  onClick={() => handleDecreaseQuantity(item)}
                  disabled={item.quantity <= 1}
                >
                  <Minus size={14} />
                </button>
                <span className="px-4 py-2 border-l border-r border-gray-300 min-w-[50px] text-center font-medium">
                  {item.quantity}
                </span>
                <button 
                  className="p-2 hover:bg-gray-100 transition-colors"
                  onClick={() => handleIncreaseQuantity(item)}
                >
                  <Plus size={14} />
                </button>
              </div>
              
              <button 
                className="text-red-600 text-sm font-medium hover:text-red-700 transition-colors flex items-center gap-1"
                onClick={() => handleRemoveItem(item)}
              >
                <Trash2 size={14} />
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  if (totalItems === 0) {
    return (
      <div className="max-w-6xl mx-auto p-4 min-h-screen flex flex-col items-center justify-center mt-16">
        <div className="text-center">
          <div className="mb-6 text-gray-400">
            <ShoppingBag size={80} className="mx-auto" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Your cart is empty</h2>
          <p className="text-gray-600 mb-8 text-lg">Explore our wide range of lab tests and medicines</p>
          <Link 
            to="/" 
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition inline-flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }
  
  const filteredItems = getFilteredItems();
  const filteredQuantity = filteredItems.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <div className="max-w-7xl mx-auto p-4 min-h-screen mt-20 mb-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
        <p className="text-gray-600">
          {labTests.items.length > 0 && `${labTests.items.length} lab tests`}
          {labTests.items.length > 0 && medicines.items.length > 0 && ', '}
          {medicines.items.length > 0 && `${medicines.items.length} medicines`}
          {' • '}
          {totalQuantity} total items
        </p>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex space-x-2 bg-gray-100 p-1 rounded-xl mb-8 max-w-2xl">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg font-medium transition-all ${
            activeTab === 'all'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <ShoppingBag className="mr-2" size={16} />
          All Items ({totalItems})
        </button>
        <button
          onClick={() => setActiveTab('labtests')}
          className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg font-medium transition-all ${
            activeTab === 'labtests'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <TestTube className="mr-2" size={16} />
          Lab Tests ({labTests.items.length})
        </button>
        <button
          onClick={() => setActiveTab('medicines')}
          className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg font-medium transition-all ${
            activeTab === 'medicines'
              ? 'bg-white text-green-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Pill className="mr-2" size={16} />
          Medicines ({medicines.items.length})
        </button>
      </div>
      
      <div className="flex flex-col xl:flex-row gap-8">
        <div className="xl:w-2/3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <div className="text-xl font-semibold text-gray-900">
                {filteredItems.length} {filteredItems.length === 1 ? 'Item' : 'Items'}
                {activeTab !== 'all' && (
                  <span className="text-base text-gray-500 ml-2 font-normal">
                    in {activeTab === 'labtests' ? 'Lab Tests' : 'Medicines'}
                  </span>
                )}
                <div className="text-sm text-gray-500 font-normal mt-1">
                  {filteredQuantity} total quantity
                </div>
              </div>
              {filteredItems.length > 0 && (
                <button 
                  className="text-red-600 text-sm font-medium flex items-center gap-2 hover:text-red-700 px-4 py-2 rounded-lg hover:bg-red-50 transition-all"
                  onClick={handleClearCategory}
                >
                  <Trash2 size={16} />
                  Clear {activeTab === 'all' ? 'All' : activeTab === 'labtests' ? 'Tests' : 'Medicines'}
                </button>
              )}
            </div>
            
            <div className="divide-y divide-gray-200">
              {filteredItems.map(renderCartItem)}
            </div>
          </div>
          
          <div className="mt-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
            >
              <ArrowLeft size={16} />
              Continue Shopping
            </Link>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="xl:w-1/3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            {/* Category breakdown */}
            {labTests.items.length > 0 && medicines.items.length > 0 && (
              <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                <div className="flex justify-between text-sm text-gray-700 mb-2">
                  <span className="flex items-center gap-2">
                    <TestTube size={14} className="text-blue-600" />
                    Lab Tests ({labTests.items.length} items)
                  </span>
                  <span className="font-medium">₹{totalLabTestAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-700">
                  <span className="flex items-center gap-2">
                    <Pill size={14} className="text-green-600" />
                    Medicines ({medicines.items.length} items)
                  </span>
                  <span className="font-medium">₹{totalMedicineAmount.toLocaleString()}</span>
                </div>
              </div>
            )}
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal ({totalQuantity} items)</span>
                <span className="font-medium">₹{totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Discount</span>
                <span className="text-green-600 font-medium">
                  - ₹{Math.round(totalAmount * 0.1).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Home Collection</span>
                <span className="text-green-600 font-medium">FREE</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Delivery Charges</span>
                <span className="text-green-600 font-medium">FREE</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between text-xl font-bold text-gray-900">
                <span>Total Amount</span>
                <span>₹{(totalAmount - Math.round(totalAmount * 0.1)).toLocaleString()}</span>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 text-green-800">
                <Heart size={16} />
                <span className="font-medium">
                  You're saving ₹{Math.round(totalAmount * 0.1).toLocaleString()} on this order!
                </span>
              </div>
            </div>
            
            <button 
              className="bg-blue-600 text-white w-full py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-lg"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
            
            <div className="mt-6">
              <div className="text-sm text-gray-600 mb-3 font-medium">We accept:</div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-100 text-gray-700 rounded-lg px-3 py-2 text-xs font-medium">
                  Credit/Debit Cards
                </span>
                <span className="bg-purple-100 text-purple-700 rounded-lg px-3 py-2 text-xs font-medium">
                  UPI
                </span>
                <span className="bg-blue-100 text-blue-700 rounded-lg px-3 py-2 text-xs font-medium">
                  Net Banking
                </span>
                <span className="bg-green-100 text-green-700 rounded-lg px-3 py-2 text-xs font-medium">
                  Wallets
                </span>
                <span className="bg-orange-100 text-orange-700 rounded-lg px-3 py-2 text-xs font-medium">
                  Cash on Delivery
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;