"use client";

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from 'react-hot-toast';
import {
  ArrowLeft,
  User,
  Calendar,
  CreditCard,
  CheckCircle,
  Plus,
  Minus,
  Trash2,
  Stethoscope,
} from "lucide-react";
import useAuth from "../hooks/useAuth";

// Redux imports
import {
  removeLabTest,
  increaseLabTestQuantity,
  decreaseLabTestQuantity,
  clearLabTests,
} from "../redux/slices/labTestSlice";
import {
  removeMedicine,
  increaseMedicineQuantity,
  decreaseMedicineQuantity,
  clearMedicines,
} from "../redux/slices/medicineSlice";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  // Get booking data from navigation state (for doctor appointments)
  const { bookingData } = location.state || {};
  
  const userData = React.useMemo(() => user?.result || {}, [user]);
  console.log(user);
  console.log("Booking Data:", bookingData);

  // Get cart items from Redux store
  const labTests = useSelector((state) => state.labTests.items || []);
  const medicines = useSelector((state) => state.medicines.items || []);

  // Combine all items including doctor appointment
  const cartItems = [...labTests, ...medicines];
  const allItems = bookingData ? [bookingData, ...cartItems] : cartItems;

  // Calculate total with doctor appointment fee
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  
  const appointmentFee = bookingData ? 
    parseInt(bookingData.doctor.consultationFee.replace('₹', '').replace(',', '')) : 0;
  
  const totalAmount = cartTotal + appointmentFee;
  const discountAmount = Math.round(totalAmount * 0.1);
  const finalAmount = totalAmount - discountAmount;

  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // Form data - pre-populate with user data if authenticated
  const [formData, setFormData] = useState({
    // User ID for backend
    userId: user?._id || "",

    // Appointment (will be overridden if bookingData exists)
    date: bookingData?.date || "",
    timeSlot: bookingData?.time || "",

    // Payment
    paymentMethod: "razorpay",
  });

  // Update form data when user data changes
  useEffect(() => {
    if (user && isAuthenticated) {
      setFormData((prev) => ({
        ...prev,
        userId: user._id || "",
      }));
    }
  }, [user, isAuthenticated]);

  // Update form data when booking data is available
  useEffect(() => {
    if (bookingData) {
      setFormData((prev) => ({
        ...prev,
        date: bookingData.date,
        timeSlot: bookingData.time,
      }));
    }
  }, [bookingData]);

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpay = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => setRazorpayLoaded(true);
      script.onerror = () => console.error("Failed to load Razorpay script");
      document.body.appendChild(script);
    };

    if (!window.Razorpay) {
      loadRazorpay();
    } else {
      setRazorpayLoaded(true);
    }
  }, []);

  // Redirect if cart is empty and no booking data
  if (allItems.length === 0) {
    navigate("/");
    return null;
  }

  const timeSlots = [
    "07:00 AM - 09:00 AM",
    "09:00 AM - 11:00 AM",
    "11:00 AM - 01:00 PM",
    "02:00 PM - 04:00 PM",
    "04:00 PM - 06:00 PM",
    "06:00 PM - 08:00 PM",
  ];

  // Redux action handlers
  const handleRemoveItem = (item) => {
    if (item.type === "lab" || labTests.find((lab) => lab.id === item.id)) {
      dispatch(removeLabTest(item.id));
    } else {
      dispatch(removeMedicine(item.id));
    }
  };

  const handleIncreaseQuantity = (item) => {
    if (item.type === "lab" || labTests.find((lab) => lab.id === item.id)) {
      dispatch(increaseLabTestQuantity(item.id));
    } else {
      dispatch(increaseMedicineQuantity(item.id));
    }
  };

  const handleDecreaseQuantity = (item) => {
    if (item.type === "lab" || labTests.find((lab) => lab.id === item.id)) {
      dispatch(decreaseLabTestQuantity(item.id));
    } else {
      dispatch(decreaseMedicineQuantity(item.id));
    }
  };

  const clearAllCarts = () => {
    dispatch(clearLabTests());
    dispatch(clearMedicines());
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return isAuthenticated && user; // Just check if user is authenticated
      case 2:
        // If booking data exists, appointment is already scheduled
        if (bookingData) return true;
        return formData.date && formData.timeSlot;
      case 3:
        return true; // Razorpay handles payment validation
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    } else {
       toast.error('Please fill all required fields.');
    }
  };

  // Determine item type for API call
  const getItemType = () => {
    if (bookingData && medicines.length === 0 && labTests.length === 0) return "appointment";
    if (medicines.length > 0 && labTests.length === 0 && !bookingData) return "medicine";
    if (labTests.length > 0 && medicines.length === 0 && !bookingData) return "test";
    return "mixed"; // If multiple types exist
  };

  const handleRazorpayPayment = async () => {
    if (!razorpayLoaded) {
      toast.error("Payment system is loading. Please try again")
      return;
    }

    setIsProcessing(true);

    try {
      // Create order on backend
      const token = localStorage.getItem("smartmeditoken");
      console.log(token);

      // Prepare order data according to new format
      const orderPayload = {
        amount: (finalAmount * 100).toString(), // Convert to paise
        type: getItemType(),
      };

      const orderResponse = await fetch(
        "https://medisawabackend.onrender.com/api/v1/payment/generateOrder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderPayload),
        }
      );
      console.log("Response status:", orderResponse.status);
      console.log("Response headers:", [...orderResponse.headers.entries()]);

      const orderData = await orderResponse.json();
      console.log("orderData:", orderData);

      // Extract relevant fields
      const razorpayOrderId = orderData?.order?.id;
      const amount = orderData?.order?.amount;
      const currency = orderData?.order?.currency || "INR";
      const transactionId = orderData?.result?._id;
      const pay_amount = (orderData?.order?.amount / 100).toString();

      if (!orderResponse.ok) {
        throw new Error(orderData.error || "Failed to create order");
      }

      // Razorpay options
      const options = {
        key: "rzp_test_AbH4EMmGnjMnzc",
        amount: amount,
        currency: currency,
        name: "HealthCare Services",
        description: bookingData ? 
          `Appointment with Dr. ${bookingData.doctor.name}` : 
          "Lab Tests & Medicines",
        order_id: razorpayOrderId,
        handler: async (response) => {
          try {
            // Prepare verification data according to new format
            const verifyPayload = {
              data: {
                razorpay_signature: response.razorpay_signature,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
              },
              transactionId: transactionId || orderData.id,
              pay_amount: pay_amount,
              type: getItemType(),
            };

            console.log("verifyPayload", verifyPayload);

            // Add specific IDs based on item type
            if (bookingData) {
              verifyPayload.doctorId = bookingData.doctor.id;
            }
            if (medicines.length > 0) {
              verifyPayload.medicineId = medicines[0].id;
            }
            if (labTests.length > 0) {
              verifyPayload.testId = labTests[0].id;
            }

            // Verify payment on backend
            const verifyResponse = await fetch(
              "https://medisawabackend.onrender.com/api/v1/payment/verifyPayment",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(verifyPayload),
              }
            );

            const verifyData = await verifyResponse.json();

            if (verifyResponse.ok && verifyData.success) {
              // Payment successful - clear cart items (not booking data)
              toast.success('Payment successful.');
              clearAllCarts();

              const finalOrderData = {
                orderId: verifyData.orderId || response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                items: allItems,
                customer: {
                  userId: userData.userId,
                  name: userData.name,
                  email: userData.email,
                  phone: userData.mobile,
                  address: userData.address,
                },
                appointment: bookingData ? {
                  doctorId: bookingData.doctor.id,
                  doctorName: bookingData.doctor.name,
                  appointmentType: bookingData.appointmentType,
                  consultationType: bookingData.consultationType,
                  date: bookingData.date,
                  timeSlot: bookingData.time,
                  consultationFee: bookingData.doctor.consultationFee,
                } : {
                  date: formData.date,
                  timeSlot: formData.timeSlot,
                },
                payment: {
                  method: "razorpay",
                  amount: finalAmount,
                  status: "completed",
                },
                orderDate: new Date().toISOString(),
                status: "confirmed",
              };
              
              toast.success('Payment successful')
              console.log("Final Order Data:", finalOrderData);
              navigate("/order-success", { state: { orderData: finalOrderData } });
            } else {
              throw new Error("Payment verification failed");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: userData.name,
          email: userData.email,
          contact: userData.mobile,
        },
        notes: {
          appointment_date: formData.date,
          appointment_time: formData.timeSlot,
          ...(bookingData && { doctor_name: bookingData.doctor.name }),
        },
        theme: {
          color: "#2563eb",
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          },
        },
      };

      console.log("Razorpay options:", options);

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error('Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  // Step indicator component (updated for 3 steps)
  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-medium
            ${
              currentStep >= step
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {currentStep > step ? <CheckCircle size={20} /> : step}
          </div>
          {step < 3 && (
            <div
              className={`w-12 h-1 mx-2 ${
                currentStep > step ? "bg-blue-600" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  // Personal Information Step - Display user data only
  const PersonalInfoStep = () => (
    <div className="space-y-6">
      {isAuthenticated && user ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <User size={20} className="mr-2" />
            Personal Information
          </h3>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-sm border border-blue-200 p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                <img
                  src={
                    userData.image ||
                    "https://cdn-icons-png.flaticon.com/512/194/194915.png"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-800">
                  {userData.name}
                </h4>
                <p className="text-sm text-gray-600">{userData.email}</p>
                <p className="text-sm text-gray-600">{userData.mobile}</p>
                {userData.address && (
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {userData.address}
                  </p>
                )}
                <div className="flex items-center mt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle size={12} className="mr-1" />
                    Verified Account
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center py-8">
            <p className="text-gray-600">
              Please login to continue with checkout
            </p>
          </div>
        </div>
      )}
    </div>
  );

  // Appointment Step (now step 2)
  const AppointmentStep = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <Calendar size={20} className="mr-2" />
        Appointment Details
      </h3>

      {bookingData ? (
        // Show booked doctor appointment details
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6">
          <div className="flex items-center mb-4">
            <Stethoscope size={24} className="text-green-600 mr-3" />
            <div>
              <h4 className="text-lg font-semibold text-gray-800">
                Appointment Scheduled
              </h4>
              <p className="text-sm text-gray-600">
                Your appointment has been scheduled with the doctor
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700">Doctor</label>
                <p className="text-gray-900">Dr. {bookingData.doctor.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Specialty</label>
                <p className="text-gray-900">{bookingData.doctor.specialty}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Consultation Fee</label>
                <p className="text-gray-900 font-semibold text-green-600">
                  {bookingData.doctor.consultationFee}
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700">Date</label>
                <p className="text-gray-900">{bookingData.date}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Time</label>
                <p className="text-gray-900">{bookingData.time}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Type</label>
                <p className="text-gray-900 capitalize">
                  {bookingData.consultationType} - {bookingData.appointmentType}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Show appointment scheduling form for other services
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="date"
            value={formData.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={formData.timeSlot}
            onChange={(e) => handleInputChange("timeSlot", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Time Slot *</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );

  // Payment Step (now step 3)
  const PaymentStep = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <CreditCard size={20} className="mr-2" />
        Payment Information
      </h3>

      <div className="space-y-4">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="razorpay"
              name="payment"
              value="razorpay"
              checked={formData.paymentMethod === "razorpay"}
              onChange={(e) =>
                handleInputChange("paymentMethod", e.target.value)
              }
              className="mr-2"
            />
            <label htmlFor="razorpay" className="font-medium text-blue-800">
              Pay with Razorpay
            </label>
          </div>
          <p className="text-sm text-blue-600 ml-6">
            Secure payment with Credit Card, Debit Card, Net Banking, UPI &
            Wallets
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="cod"
              name="payment"
              value="cod"
              checked={formData.paymentMethod === "cod"}
              onChange={(e) =>
                handleInputChange("paymentMethod", e.target.value)
              }
              className="mr-2"
            />
            <label htmlFor="cod" className="font-medium text-gray-800">
              Cash on Delivery
            </label>
          </div>
          <p className="text-sm text-gray-600 ml-6">
            Pay ₹{finalAmount} in cash when our representative arrives
          </p>
        </div>
      </div>
    </div>
  );

  // Enhanced Order Summary with cart management
  const OrderSummary = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sticky top-24">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Order Summary</h2>
        <span className="text-sm text-gray-500">({allItems.length} items)</span>
      </div>

      <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
        {/* Doctor Appointment Item */}
        {bookingData && (
          <div className="border border-green-200 rounded-lg p-3 bg-green-50">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <div className="font-medium text-gray-800 text-sm">
                  Dr. {bookingData.doctor.name}
                </div>
                <div className="text-xs text-green-600 capitalize">
                  {bookingData.consultationType} Consultation
                </div>
                <div className="text-xs text-gray-500">
                  {bookingData.date} at {bookingData.time}
                </div>
              </div>
              <div className="flex items-center">
                <Stethoscope size={16} className="text-green-600 mr-2" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Consultation Fee</span>
              <div className="font-medium text-sm text-green-600">
                {bookingData.doctor.consultationFee}
              </div>
            </div>
          </div>
        )}

        {/* Cart Items */}
        {cartItems.map((item, index) => (
          <div key={index} className="border border-gray-100 rounded-lg p-3">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <div className="font-medium text-gray-800 text-sm">
                  {item.name}
                </div>
                <div className="text-xs text-gray-500 capitalize">
                  {item.type === "test" ||
                  labTests.find((lab) => lab.id === item.id)
                    ? "Lab Test"
                    : "Medicine"}
                </div>
              </div>
              <button
                onClick={() => handleRemoveItem(item)}
                className="text-red-500 hover:text-red-700 p-1"
                title="Remove item"
              >
                <Trash2 size={14} />
              </button>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleDecreaseQuantity(item)}
                  disabled={item.quantity <= 1}
                  className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                >
                  <Minus size={12} />
                </button>
                <span className="text-sm font-medium w-8 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleIncreaseQuantity(item)}
                  className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  <Plus size={12} />
                </button>
              </div>
              <div className="font-medium text-sm">
                ₹{item.price * item.quantity}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-3 space-y-2">
        {appointmentFee > 0 && (
          <div className="flex justify-between text-gray-700">
            <span>Consultation Fee</span>
            <span>₹{appointmentFee}</span>
          </div>
        )}
        {cartTotal > 0 && (
          <div className="flex justify-between text-gray-700">
            <span>Cart Subtotal</span>
            <span>₹{cartTotal}</span>
          </div>
        )}
        <div className="flex justify-between text-gray-700">
          <span>Subtotal</span>
          <span>₹{totalAmount}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Discount (10%)</span>
          <span className="text-green-600">- ₹{discountAmount}</span>
        </div>
        <div className="flex justify-between font-bold text-gray-800 text-lg border-t pt-2">
          <span>Total</span>
          <span>₹{finalAmount}</span>
        </div>
      </div>

      {cartItems.length > 0 && (
        <button
          onClick={clearAllCarts}
          className="w-full mt-4 px-4 py-2 text-sm text-red-600 border border-red-200 rounded-md hover:bg-red-50"
        >
          Clear Cart Items
        </button>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-4 min-h-screen mt-20 mb-10">
      <Toaster position="top-right" />
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 mb-4"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back
        </button>

        <h1 className="text-2xl font-bold text-gray-800">
          {bookingData ? 'Complete Appointment Booking' : 'Checkout'}
        </h1>
        <p className="text-gray-600 mt-1">
          Complete your order in few simple steps
        </p>
      </div>

      <StepIndicator />

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          {currentStep === 1 && <PersonalInfoStep />}
          {currentStep === 2 && <AppointmentStep />}
          {currentStep === 3 && <PaymentStep />}

          <div className="flex justify-between mt-6">
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50"
              >
                Previous
              </button>
            )}

            {currentStep < 3 ? (
              <button
                onClick={handleNextStep}
                className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
              >
                Next
              </button>
            ) : (
              <div className="ml-auto space-x-3">
                {formData.paymentMethod === "razorpay" ? (
                  <button
                    onClick={handleRazorpayPayment}
                    disabled={
                      !validateStep(3) || isProcessing || !razorpayLoaded
                    }
                    className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      `Pay ₹${finalAmount} with Razorpay`
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      const orderData = {
                        orderId: "ORD" + Date.now(),
                        items: allItems,
                        customer: {
                          userId: formData.userId,
                          name: user.name,
                          email: user.email,
                          phone: user.mobile,
                          address: user.address,
                        },
                        appointment: {
                          date: formData.date,
                          timeSlot: formData.timeSlot,
                        },
                        payment: {
                          method: "cod",
                          amount: finalAmount,
                          status: "pending",
                        },
                        orderDate: new Date().toISOString(),
                        status: "confirmed",
                      };

                      // Clear all carts for COD as well
                      clearAllCarts();

                      navigate("/order-success", { state: { orderData } });
                    }}
                    disabled={!validateStep(3)}
                    className="px-6 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 disabled:opacity-50"
                  >
                    Place Order (COD)
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="lg:w-1/3">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
