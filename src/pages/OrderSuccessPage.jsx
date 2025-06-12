// File: src/pages/OrderSuccessPage.js
import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, MapPin, User, Phone, Mail, Download, Home } from 'lucide-react';

const OrderSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state?.orderData;

  // Redirect if no order data
  if (!orderData) {
    navigate('/');
    return null;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-screen mt-20 mb-10">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h1>
        <p className="text-gray-600">Thank you for choosing our diagnostic services</p>
      </div>

      {/* Order Details Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Order Details</h2>
            <p className="text-gray-600 mt-1">Order ID: <span className="font-medium">{orderData.orderId}</span></p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              {orderData.status.charAt(0).toUpperCase() + orderData.status.slice(1)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Order Summary</h3>
            <div className="space-y-2">
              {orderData.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.name} x {item.quantity}</span>
                  <span className="font-medium">₹{item.price * item.quantity}</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total Amount</span>
                  <span>₹{orderData.payment.amount}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-800 mb-2">Payment Information</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium capitalize">{orderData.payment.method}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Status:</span>
                <span className="font-medium text-green-600 capitalize">{orderData.payment.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Order Date:</span>
                <span className="font-medium">{formatDate(orderData.orderDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Order Time:</span>
                <span className="font-medium">{formatTime(orderData.orderDate)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <User size={20} className="mr-2" />
          Customer Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Name</p>
            <p className="font-medium">{orderData.customer.firstName} {orderData.customer.lastName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Age & Gender</p>
            <p className="font-medium">{orderData.customer.age} years, {orderData.customer.gender}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-medium">{orderData.customer.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Phone</p>
            <p className="font-medium">{orderData.customer.phone}</p>
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <MapPin size={20} className="mr-2" />
          {orderData.appointment.collectionType === 'home' ? 'Collection Address' : 'Registered Address'}
        </h3>
        <div className="text-gray-700">
          <p>{orderData.address.address}</p>
          <p>{orderData.address.city}, {orderData.address.state} - {orderData.address.pincode}</p>
          {orderData.address.landmark && <p>Landmark: {orderData.address.landmark}</p>}
        </div>
      </div>

      {/* Appointment Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Calendar size={20} className="mr-2" />
          Appointment Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600">Collection Type</p>
            <p className="font-medium capitalize">
              {orderData.appointment.collectionType === 'home' ? 'Home Collection' : 'Visit Center'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Date</p>
            <p className="font-medium">{formatDate(orderData.appointment.date)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Time Slot</p>
            <p className="font-medium">{orderData.appointment.timeSlot}</p>
          </div>
        </div>
        
        {orderData.appointment.collectionType === 'home' && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start">
              <Clock size={16} className="text-blue-600 mt-1 mr-2" />
              <div>
                <p className="text-sm font-medium text-blue-800">Sample Collection Instructions</p>
                <p className="text-sm text-blue-700 mt-1">
                  Our phlebotomist will arrive at your location during the selected time slot. 
                  Please ensure someone is available at the provided address.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* What's Next */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">What's Next?</h3>
        <div className="space-y-3">
          <div className="flex items-start">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">1</div>
            <div>
              <p className="font-medium text-gray-800">Confirmation Call</p>
              <p className="text-sm text-gray-600">You'll receive a confirmation call within 30 minutes</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">2</div>
            <div>
              <p className="font-medium text-gray-800">Sample Collection</p>
              <p className="text-sm text-gray-600">
                {orderData.appointment.collectionType === 'home' 
                  ? 'Our trained phlebotomist will visit your location'
                  : 'Visit our center at the scheduled time'
                }
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">3</div>
            <div>
              <p className="font-medium text-gray-800">Reports Ready</p>
              <p className="text-sm text-gray-600">Digital reports will be available within 24-48 hours</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={() => window.print()}
          className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition"
        >
          <Download size={16} className="mr-2" />
          Download Receipt
        </button>
        
        <Link 
          to="/"
          className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition"
        >
          <Home size={16} className="mr-2" />
          Back to Home
        </Link>
      </div>

      {/* Help Section */}
      <div className="mt-8 text-center">
        <p className="text-gray-600 mb-2">Need help with your order?</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
          <a href="tel:+911234567890" className="flex items-center text-blue-600 hover:text-blue-700">
            <Phone size={16} className="mr-1" />
            Call: +91 12345 67890
          </a>
          <a href="mailto:support@example.com" className="flex items-center text-blue-600 hover:text-blue-700">
            <Mail size={16} className="mr-1" />
            Email: support@example.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;