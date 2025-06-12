import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Award, MapPin, Info, CheckCircle, Calendar, Clock, User, ArrowLeft } from 'lucide-react';

const DoctorBookingModal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get doctor data from navigation state
  const { doctor, consultationType, fromSpecialty } = location.state || {};
  
  const [selectedAppointmentType, setSelectedAppointmentType] = useState('');
  const [selectedDate, setSelectedDate] = useState(15);
  const [selectedTime, setSelectedTime] = useState('');

  // Set default appointment type based on consultation type
  useEffect(() => {
    if (consultationType) {
      if (consultationType === 'video') {
        setSelectedAppointmentType('consultation');
      } else if (consultationType === 'clinic') {
        setSelectedAppointmentType('followup');
      }
    }
  }, [consultationType]);

  // Redirect if no doctor data
  if (!doctor) {
    navigate(-1);
    return null;
  }

  // Updated appointment types
  const appointmentTypes = [
    { 
      id: 'consultation', 
      name: consultationType === 'video' ? 'Video Consultation' : 'General Consultation', 
      icon: <User size={20} /> 
    },
    { id: 'followup', name: 'Follow-up Visit', icon: <Clock size={20} /> },
    { id: 'checkup', name: 'Health Checkup', icon: <CheckCircle size={20} /> }
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM'
  ];

  // Generate calendar dates (current month)
  const generateCalendarDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        day: date.getDate(),
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        isToday: i === 0,
        isSelected: date.getDate() === selectedDate
      });
    }
    return dates;
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="currentColor"/>
              <stop offset="50%" stopColor="transparent"/>
            </linearGradient>
          </defs>
          <path fill="url(#half)" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      );
    }

    return stars;
  };

  const handleAppointmentTypeSelect = (typeId) => {
    setSelectedAppointmentType(typeId);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleDateSelect = (day) => {
    setSelectedDate(day);
  };

  const handleConfirmBooking = () => {
    if (!selectedAppointmentType || !selectedTime) {
      alert('Please select appointment type and time slot');
      return;
    }
    
    const bookingData = {
      doctor: {
        id: doctor.id,
        name: doctor.name,
        specialty: doctor.specialty,
        consultationFee: doctor.consultationFee
      },
      appointmentType: selectedAppointmentType,
      consultationType: consultationType,
      date: selectedDate,
      time: selectedTime,
      fromSpecialty: fromSpecialty
    };
    
    console.log('Booking confirmed:', bookingData);
    alert(`Appointment booked successfully with Dr. ${doctor.name}!`);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={handleGoBack}></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          {/* Header with back button */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <button
              onClick={handleGoBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Doctors</span>
            </button>
            
            <button
              type="button"
              className="bg-white rounded-full p-2 hover:bg-gray-50"
              onClick={handleGoBack}
            >
              <span className="sr-only">Close</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Doctor Info Side */}
            <div className="md:w-1/3 bg-indigo-50 p-6">
              <div className="flex flex-col items-center">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                  onError={(e) => {
                    e.target.src = '/api/placeholder/400/400';
                  }}
                />
                <h3 className="mt-4 text-xl font-bold text-gray-800">
                  Dr. {doctor.name}
                </h3>
                <p className="text-indigo-600 font-medium">{doctor.specialty}</p>

                <div className="flex items-center mt-2">
                  <div className="flex mr-1">
                    {renderStars(doctor.rating)}
                  </div>
                  <span className="text-sm text-gray-600">({doctor.reviews})</span>
                </div>

                {/* Show consultation type indicator */}
                {consultationType && (
                  <div className="mt-3 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {consultationType === 'video' ? 'Video Consultation' : 'Clinic Visit'}
                  </div>
                )}

                {fromSpecialty && (
                  <div className="mt-2 text-sm text-gray-600">
                    From: {fromSpecialty}
                  </div>
                )}

                <div className="w-full mt-6 space-y-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Award size={16} className="mr-2 text-indigo-500" />
                    <span>{doctor.experience}</span>
                  </div>
                  
                  <div className="flex items-start text-sm text-gray-600">
                    <MapPin size={16} className="mr-2 text-indigo-500 mt-0.5" />
                    <span>{doctor.location}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Info size={16} className="mr-2 text-indigo-500" />
                    <span>{doctor.education}</span>
                  </div>
                  
                  {doctor.specializations && doctor.specializations.length > 0 && (
                    <div className="pt-2">
                      <p className="text-sm font-medium text-gray-700 mb-2">Specializations:</p>
                      <div className="flex flex-wrap gap-1">
                        {doctor.specializations.map((spec, index) => (
                          <span key={index} className="px-2 py-1 bg-white text-xs text-indigo-600 rounded-full border border-indigo-200">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {doctor.bio && (
                    <div className="pt-2">
                      <p className="text-sm text-gray-600">{doctor.bio}</p>
                    </div>
                  )}
                  
                  <div className="pt-4 border-t border-indigo-200">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Consultation Fee</p>
                      <p className="text-2xl font-bold text-indigo-600">{doctor.consultationFee}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form Side */}
            <div className="md:w-2/3 p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Book Appointment</h2>

              {/* Appointment Type Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Select Appointment Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {appointmentTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => handleAppointmentTypeSelect(type.id)}
                      className={`p-4 border-2 rounded-lg flex items-center gap-3 transition-all ${
                        selectedAppointmentType === type.id
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                          : 'border-gray-200 hover:border-indigo-300 text-gray-600'
                      }`}
                    >
                      {type.icon}
                      <span className="font-medium">{type.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Select Date</h3>
                <div className="grid grid-cols-7 gap-2">
                  {generateCalendarDates().map((date, index) => (
                    <button
                      key={index}
                      onClick={() => handleDateSelect(date.day)}
                      className={`p-3 text-center rounded-lg border transition-all ${
                        date.isSelected
                          ? 'border-indigo-500 bg-indigo-500 text-white'
                          : date.isToday
                          ? 'border-indigo-300 bg-indigo-50 text-indigo-700'
                          : 'border-gray-200 hover:border-indigo-300 text-gray-600'
                      }`}
                    >
                      <div className="text-xs">{date.dayName}</div>
                      <div className="text-lg font-semibold">{date.day}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slot Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Select Time Slot</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      className={`p-3 border rounded-lg text-center transition-all ${
                        selectedTime === time
                          ? 'border-indigo-500 bg-indigo-500 text-white'
                          : 'border-gray-200 hover:border-indigo-300 text-gray-600'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Booking Summary */}
              {selectedAppointmentType && selectedTime && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">Booking Summary</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><span className="font-medium">Doctor:</span> Dr. {doctor.name}</p>
                    <p><span className="font-medium">Type:</span> {appointmentTypes.find(t => t.id === selectedAppointmentType)?.name}</p>
                    <p><span className="font-medium">Date:</span> {selectedDate} June 2025</p>
                    <p><span className="font-medium">Time:</span> {selectedTime}</p>
                    <p><span className="font-medium">Fee:</span> {doctor.consultationFee}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleGoBack}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmBooking}
                  disabled={!selectedAppointmentType || !selectedTime}
                  className={`flex-1 px-6 py-3 rounded-lg transition-colors ${
                    selectedAppointmentType && selectedTime
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorBookingModal;