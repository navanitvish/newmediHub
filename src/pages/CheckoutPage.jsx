// File: src/pages/CheckoutPage.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  selectCartItems, 
  selectCartTotalAmount,
  clearCart
} from '../redux/slices/cartSlice';
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  Clock,
  CreditCard,
  Smartphone,
  Building,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    gender: ''
  });
  
  const [addressInfo, setAddressInfo] = useState({
    address: '',
    city: '',
    state: '',
    pincode: '',
    landmark: ''
  });
  
  const [appointmentInfo, setAppointmentInfo] = useState({
    date: '',
    timeSlot: '',
    collectionType: 'home'
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    upiId: ''
  });

  const discountAmount = Math.round(totalAmount * 0.1);
  const finalAmount = totalAmount - discountAmount;

  // Redirect if cart is empty
  if (cartItems.length === 0) {
    navigate('/');
    return null;
  }

  const timeSlots = [
    '07:00 AM - 09:00 AM',
    '09:00 AM - 11:00 AM', 
    '11:00 AM - 01:00 PM',
    '02:00 PM - 04:00 PM',
    '04:00 PM - 06:00 PM',
    '06:00 PM - 08:00 PM'
  ];

  const handleInputChange = (section, field, value) => {
    switch(section) {
      case 'customer':
        setCustomerInfo(prev => ({ ...prev, [field]: value }));
        break;
      case 'address':
        setAddressInfo(prev => ({ ...prev, [field]: value }));
        break;
      case 'appointment':
        setAppointmentInfo(prev => ({ ...prev, [field]: value }));
        break;
      case 'payment':
        setPaymentInfo(prev => ({ ...prev, [field]: value }));
        break;
    }
  };

  const validateStep = (step) => {
    switch(step) {
      case 1:
        return customerInfo.firstName && customerInfo.lastName && 
               customerInfo.email && customerInfo.phone && 
               customerInfo.age && customerInfo.gender;
      case 2:
        return addressInfo.address && addressInfo.city && 
               addressInfo.state && addressInfo.pincode;
      case 3:
        return appointmentInfo.date && appointmentInfo.timeSlot;
      case 4:
        if (paymentMethod === 'card') {
          return paymentInfo.cardNumber && paymentInfo.expiryDate && 
                 paymentInfo.cvv && paymentInfo.cardName;
        } else if (paymentMethod === 'upi') {
          return paymentInfo.upiId;
        }
        return true;
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    } else {
      alert('Please fill all required fields');
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Create order data
      const orderData = {
        orderId: 'ORD' + Date.now(),
        items: cartItems,
        customer: customerInfo,
        address: addressInfo,
        appointment: appointmentInfo,
        payment: {
          method: paymentMethod,
          amount: finalAmount,
          status: 'completed'
        },
        orderDate: new Date().toISOString(),
        status: 'confirmed'
      };
      
      // Clear cart and redirect to success page
      dispatch(clearCart());
      alert(`Payment Successful! Order ID: ${orderData.orderId}`);
      navigate('/order-success', { state: { orderData } });
      
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium
            ${currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
            {currentStep > step ? <CheckCircle size={20} /> : step}
          </div>
          {step < 4 && (
            <div className={`w-12 h-1 mx-2 ${currentStep > step ? 'bg-blue-600' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderCustomerInfo = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <User size={20} className="mr-2" />
        Personal Information
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
          <input
            type="text"
            value={customerInfo.firstName}
            onChange={(e) => handleInputChange('customer', 'firstName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter first name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
          <input
            type="text"
            value={customerInfo.lastName}
            onChange={(e) => handleInputChange('customer', 'lastName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter last name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
          <input
            type="email"
            value={customerInfo.email}
            onChange={(e) => handleInputChange('customer', 'email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email address"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
          <input
            type="tel"
            value={customerInfo.phone}
            onChange={(e) => handleInputChange('customer', 'phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter phone number"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
          <input
            type="number"
            value={customerInfo.age}
            onChange={(e) => handleInputChange('customer', 'age', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter age"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
          <select
            value={customerInfo.gender}
            onChange={(e) => handleInputChange('customer', 'gender', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderAddressInfo = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <MapPin size={20} className="mr-2" />
        Address Information
      </h3>
      
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Address *</label>
          <textarea
            value={addressInfo.address}
            onChange={(e) => handleInputChange('address', 'address', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter complete address"
            rows={3}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
            <input
              type="text"
              value={addressInfo.city}
              onChange={(e) => handleInputChange('address', 'city', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter city"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
            <input
              type="text"
              value={addressInfo.state}
              onChange={(e) => handleInputChange('address', 'state', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter state"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">PIN Code *</label>
            <input
              type="text"
              value={addressInfo.pincode}
              onChange={(e) => handleInputChange('address', 'pincode', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter PIN code"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Landmark</label>
            <input
              type="text"
              value={addressInfo.landmark}
              onChange={(e) => handleInputChange('address', 'landmark', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter landmark"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppointmentInfo = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <Calendar size={20} className="mr-2" />
        Schedule Appointment
      </h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Collection Type</label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="home"
              checked={appointmentInfo.collectionType === 'home'}
              onChange={(e) => handleInputChange('appointment', 'collectionType', e.target.value)}
              className="mr-2"
            />
            Home Collection (FREE)
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="center"
              checked={appointmentInfo.collectionType === 'center'}
              onChange={(e) => handleInputChange('appointment', 'collectionType', e.target.value)}
              className="mr-2"
            />
            Visit Center
          </label>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date *</label>
          <input
            type="date"
            value={appointmentInfo.date}
            onChange={(e) => handleInputChange('appointment', 'date', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Time Slot *</label>
          <select
            value={appointmentInfo.timeSlot}
            onChange={(e) => handleInputChange('appointment', 'timeSlot', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Time Slot</option>
            {timeSlots.map(slot => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const renderPaymentInfo = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <CreditCard size={20} className="mr-2" />
        Payment Information
      </h3>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
            { id: 'upi', label: 'UPI', icon: Smartphone },
            { id: 'netbanking', label: 'Net Banking', icon: Building },
            { id: 'cod', label: 'Cash on Delivery', icon: AlertCircle }
          ].map(method => (
            <label key={method.id} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                value={method.id}
                checked={paymentMethod === method.id}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-3"
              />
              <method.icon size={20} className="mr-2 text-gray-600" />
              <span className="text-sm">{method.label}</span>
            </label>
          ))}
        </div>
      </div>
      
      {paymentMethod === 'card' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Card Number *</label>
            <input
              type="text"
              value={paymentInfo.cardNumber}
              onChange={(e) => handleInputChange('payment', 'cardNumber', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
            <input
              type="text"
              value={paymentInfo.expiryDate}
              onChange={(e) => handleInputChange('payment', 'expiryDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="MM/YY"
              maxLength={5}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
            <input
              type="text"
              value={paymentInfo.cvv}
              onChange={(e) => handleInputChange('payment', 'cvv', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="123"
              maxLength={4}
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name *</label>
            <input
              type="text"
              value={paymentInfo.cardName}
              onChange={(e) => handleInputChange('payment', 'cardName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter name as on card"
            />
          </div>
        </div>
      )}
      
      {paymentMethod === 'upi' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">UPI ID *</label>
          <input
            type="text"
            value={paymentInfo.upiId}
            onChange={(e) => handleInputChange('payment', 'upiId', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="yourname@paytm"
          />
        </div>
      )}
      
      {paymentMethod === 'netbanking' && (
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-800">You will be redirected to your bank's website to complete the payment.</p>
        </div>
      )}
      
      {paymentMethod === 'cod' && (
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <p className="text-green-800">Pay ₹{finalAmount} in cash when our phlebotomist arrives for sample collection.</p>
        </div>
      )}
    </div>
  );

  const renderOrderSummary = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sticky top-24">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>
      
      <div className="space-y-3 mb-4">
        {cartItems.map((item) => (
          <div key={`${item.id}-${item.type}`} className="flex justify-between items-start text-sm">
            <div className="flex-1">
              <div className="font-medium text-gray-800">{item.name}</div>
              <div className="text-gray-500">Qty: {item.quantity}</div>
            </div>
            <div className="font-medium">₹{item.price * item.quantity}</div>
          </div>
        ))}
      </div>
      
      <div className="border-t border-gray-200 pt-3 space-y-2">
        <div className="flex justify-between text-gray-700">
          <span>Subtotal</span>
          <span>₹{totalAmount}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Discount</span>
          <span className="text-green-600">- ₹{discountAmount}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Home Collection</span>
          <span className="text-green-600">FREE</span>
        </div>
        <div className="flex justify-between font-bold text-gray-800 text-lg border-t pt-2">
          <span>Total</span>
          <span>₹{finalAmount}</span>
        </div>
      </div>
      
      <div className="mt-4 bg-green-50 border border-green-100 rounded-md p-3">
        <div className="text-sm text-green-800 font-medium">
          You're saving ₹{discountAmount} on this order
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-4 min-h-screen mt-20 mb-10">
      <div className="mb-6">
        <button 
          onClick={() => navigate('/cart')}
          className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 mb-4"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Cart
        </button>
        
        <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>
        <p className="text-gray-600 mt-1">Complete your order in few simple steps</p>
      </div>
      
      {renderStepIndicator()}
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          {currentStep === 1 && renderCustomerInfo()}
          {currentStep === 2 && renderAddressInfo()}
          {currentStep === 3 && renderAppointmentInfo()}
          {currentStep === 4 && renderPaymentInfo()}
          
          <div className="flex justify-between mt-6">
            {currentStep > 1 && (
              <button 
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50"
              >
                Previous
              </button>
            )}
            
            {currentStep < 4 ? (
              <button 
                onClick={handleNextStep}
                className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
              >
                Next
              </button>
            ) : (
              <button 
                onClick={handlePayment}
                disabled={!validateStep(4) || isProcessing}
                className="ml-auto px-6 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  `Pay ₹${finalAmount}`
                )}
              </button>
            )}
          </div>
        </div>
        
        <div className="lg:w-1/3">
          {renderOrderSummary()}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;