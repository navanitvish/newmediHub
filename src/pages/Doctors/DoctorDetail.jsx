import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Clock, 
  Star, 
  Users, 
  BookOpen,
  Video,
  MessageCircle,
  Heart,
  Share2,
  CheckCircle,
  AlertCircle,
  Stethoscope,
  GraduationCap,
  Building
} from 'lucide-react';

const DoctorDetailsPage = () => {
  const [doctor, setDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const { id } = useParams();
  console.log(id);
  

  // Mock doctor ID for demo - in real app this would come from useParams
  const doctorId = id;

  useEffect(() => {
    fetchDoctorDetails();
  }, [doctorId]);

  const fetchDoctorDetails = async () => {
    try {
      setIsLoading(true);
      // Replace with your actual API endpoint
      const token = localStorage.getItem('smartmeditoken');
      const response = await fetch(`https://medisawabackend.onrender.com/api/v1/doctors/${doctorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      
      if (data.success && data.result) {
        // Transform API response to match component structure
        const apiData = data.result;
        const doctorInfo = apiData.doctorId || {};
        
        const transformedDoctor = {
          _id: apiData._id,
          name: apiData.name,
          specialty: doctorInfo.specialization?.name || 'General Practitioner',
          qualification: 'MD', // Default since not in API
          experience: `${doctorInfo.experience || 0} years`,
          rating: 4.5, // Default since not in API
          totalReviews: 25, // Default since not in API
          consultationFee: doctorInfo.fee || 0,
          image: apiData.image || doctorInfo.image || "https://cdn-icons-png.flaticon.com/512/194/194915.png",
          about: `${apiData.name} is a dedicated ${doctorInfo.specialization?.name || 'medical'} professional with ${doctorInfo.experience || 0} years of experience in providing quality healthcare services.`,
          education: [
            {
              degree: "Doctor of Medicine (MD)",
              institution: "Medical College",
              year: "2015" // Default since not in API
            }
          ],
          experience_details: [
            {
              position: `${doctorInfo.specialization?.name || 'Medical'} Specialist`,
              hospital: "Healthcare Center",
              duration: `${new Date().getFullYear() - (doctorInfo.experience || 2)} - Present`
            }
          ],
          specializations: [
            doctorInfo.specialization?.name || 'General Medicine'
          ],
          contact: {
            phone: doctorInfo.contactNumber ? `+91 ${doctorInfo.contactNumber}` : apiData.mobile,
            email: apiData.email,
            address: doctorInfo.clinicAddress || apiData.address || "Healthcare Center"
          },
          department: doctorInfo.department?.name || 'General',
          gender: doctorInfo.gender || 'Not specified',
          dob: doctorInfo.dob || 'Not specified',
          startTime: doctorInfo.startTime || '09:00',
          endTime: doctorInfo.endTime || '17:00',
          clinicContactNumber: doctorInfo.clinicContactNumber || null,
          bookingBeforeTime: doctorInfo.bookingBeforeTime || 1,
          onLeave: doctorInfo.onLeave || false,
          availability: {
            consultationTypes: ["In-person", "Video Call", "Phone Call"],
            timeSlots: generateTimeSlots(doctorInfo.startTime || '09:00', doctorInfo.endTime || '17:00')
          }
        };
        
        setDoctor(transformedDoctor);
      } else {
        throw new Error('Doctor not found');
      }
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  // Helper function to generate time slots based on start and end time
  const generateTimeSlots = (startTime, endTime) => {
    const slots = [];
    const start = new Date(`2000-01-01 ${startTime}:00`);
    const end = new Date(`2000-01-01 ${endTime}:00`);
    
    const current = new Date(start);
    const consultationTypes = ['video', 'in-person', 'phone'];
    
    while (current < end) {
      const timeString = current.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
      
      slots.push({
        time: timeString,
        available: Math.random() > 0.3, // Random availability for demo
        type: consultationTypes[Math.floor(Math.random() * consultationTypes.length)]
      });
      
      current.setHours(current.getHours() + 1); // 1-hour slots
    }
    
    return slots;
  };

  console.log("doctor", doctor);

  const handleBookAppointment = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
    alert(`Booking appointment for ${timeSlot.time} (${timeSlot.type})`);
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Dr. ${doctor.name}`,
        text: `Check out Dr. ${doctor.name}, ${doctor.specialty}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="flex items-center mb-6">
            <div className="h-6 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-sm border">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-48 h-48 bg-gray-200 rounded-xl mx-auto lg:mx-0"></div>
              <div className="flex-1 space-y-4">
                <div className="h-8 bg-gray-200 rounded w-64"></div>
                <div className="h-6 bg-gray-200 rounded w-48"></div>
                <div className="h-4 bg-gray-200 rounded w-96"></div>
                <div className="flex gap-4">
                  <div className="h-12 bg-gray-200 rounded w-32"></div>
                  <div className="h-12 bg-gray-200 rounded w-32"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button 
          onClick={() => window.history.back()} 
          className="flex items-center text-blue-500 hover:text-blue-600 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
        <div className="text-center py-20">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Doctor Details</h3>
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!doctor) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button 
        onClick={() => window.history.back()} 
        className="flex items-center text-blue-500 hover:text-blue-600 mb-6 transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Doctors
      </button>

      {/* Doctor Header Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Doctor Image */}
          <div className="flex-shrink-0 mx-auto lg:mx-0">
            <div className="relative">
              <img 
                src={doctor.image}
                alt={doctor.name}
                className="w-48 h-48 rounded-xl object-cover"
              />
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
                doctor.onLeave 
                  ? 'bg-red-500 text-white' 
                  : 'bg-green-500 text-white'
              }`}>
                {doctor.onLeave ? 'On Leave' : 'Available'}
              </div>
            </div>
          </div>

          {/* Doctor Info */}
          <div className="flex-1 text-center lg:text-left">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Dr. {doctor.name}</h1>
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
                  <Stethoscope className="w-5 h-5 text-blue-500" />
                  <span className="text-xl text-blue-600 font-semibold">{doctor.specialty}</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                  <GraduationCap className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-600">{doctor.qualification}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">{doctor.experience} experience</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                  <Building className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-600">{doctor.department}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">{doctor.gender}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={handleToggleFavorite}
                  className={`p-3 rounded-full transition-all ${
                    isFavorite 
                      ? 'bg-red-100 text-red-500 hover:bg-red-200' 
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-3 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all"
                >
                  <Share2 className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Rating and Contact */}
            <div className="flex flex-col lg:flex-row gap-6 mb-6">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(star => (
                    <Star 
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.floor(doctor.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold">{doctor.rating}</span>
                <span className="text-gray-600">({doctor.totalReviews} reviews)</span>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{doctor.contact.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{doctor.contact.phone}</span>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="text-lg text-gray-700">Working Hours:</span>
                <span className="text-lg font-semibold text-blue-600">{doctor.startTime} - {doctor.endTime}</span>
              </div>
            </div>

            {/* Consultation Fee */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <span className="text-lg text-gray-700">Consultation Fee:</span>
                <span className="text-2xl font-bold text-green-600">₹{doctor.consultationFee}</span>
              </div>
            </div>

            {/* Action Buttons */}
            {/* <div className="flex flex-col sm:flex-row gap-4">
              <button 
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all font-semibold flex items-center justify-center gap-2"
                disabled={doctor.onLeave}
              >
                <Calendar className="w-5 h-5" />
                {doctor.onLeave ? 'Doctor on Leave' : 'Book Appointment'}
              </button>
              <button 
                className="flex-1 border-2 border-blue-500 text-blue-500 px-8 py-4 rounded-lg hover:bg-blue-50 transition-all font-semibold flex items-center justify-center gap-2"
                disabled={doctor.onLeave}
              >
                <Video className="w-5 h-5" />
                Video Consultation
              </button>
            </div> */}
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="border-b border-gray-100">
          <nav className="flex space-x-8 px-8" aria-label="Tabs">
            {[
              { id: 'overview', name: 'Overview', icon: BookOpen },
              { id: 'availability', name: 'Availability', icon: Clock }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                  selectedTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-8">
          {/* Overview Tab */}
          {selectedTab === 'overview' && (
            <div className="space-y-8">
              {/* About */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">About Dr. {doctor.name}</h3>
                <p className="text-gray-600 leading-relaxed">{doctor.about}</p>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Education</h3>
                <div className="space-y-4">
                  {doctor.education.map((edu, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <GraduationCap className="w-6 h-6 text-blue-500 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-800">{edu.degree}</h4>
                        <p className="text-gray-600">{edu.institution}</p>
                        <span className="text-sm text-gray-500">{edu.year}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Experience</h3>
                <div className="space-y-4">
                  {doctor.experience_details.map((exp, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <Building className="w-6 h-6 text-green-500 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-800">{exp.position}</h4>
                        <p className="text-gray-600">{exp.hospital}</p>
                        <span className="text-sm text-gray-500">{exp.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specializations */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Specializations</h3>
                <div className="flex flex-wrap gap-3">
                  {doctor.specializations.map((spec, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">{doctor.contact.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium">{doctor.contact.phone}</p>
                    </div>
                  </div>
                  {doctor.clinicContactNumber && (
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <Building className="w-5 h-5 text-purple-500" />
                      <div>
                        <p className="text-sm text-gray-600">Clinic Phone</p>
                        <p className="font-medium">+91 {doctor.clinicContactNumber}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="font-medium">{doctor.contact.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Availability Tab */}
          {selectedTab === 'availability' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Available Time Slots</h3>
              
              {/* Consultation Types */}
              <div className="mb-8">
                <h4 className="font-medium text-gray-700 mb-4">Consultation Options</h4>
                <div className="flex flex-wrap gap-4">
                  {doctor.availability.consultationTypes.map(type => (
                    <div key={type} className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg">
                      <CheckCircle className="w-4 h-4" />
                      <span>{type}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Working Hours Info */}
              <div className="mb-8 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-2">Working Hours</h4>
                <div className="flex items-center gap-2 text-blue-700">
                  <Clock className="w-5 h-5" />
                  <span>{doctor.startTime} - {doctor.endTime}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Book appointments at least {doctor.bookingBeforeTime} hour(s) in advance
                </p>
              </div>

              {/* Time Slots */}
              <div>
                <h4 className="font-medium text-gray-700 mb-4">Today's Availability</h4>
                {doctor.onLeave ? (
                  <div className="text-center py-8">
                    <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                    <p className="text-lg text-red-600 font-medium">Doctor is currently on leave</p>
                    <p className="text-gray-600">Please check back later or contact the clinic</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {doctor.availability.timeSlots.map((slot, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          slot.available
                            ? 'border-green-200 bg-green-50 hover:border-green-300 cursor-pointer'
                            : 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                        }`}
                        onClick={() => slot.available && handleBookAppointment(slot)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-800">{slot.time}</span>
                          {slot.type === 'video' && <Video className="w-4 h-4 text-blue-500" />}
                          {slot.type === 'phone' && <Phone className="w-4 h-4 text-green-500" />}
                          {slot.type === 'in-person' && <Users className="w-4 h-4 text-purple-500" />}
                        </div>
                        <span className={`text-sm ${slot.available ? 'text-green-600' : 'text-gray-500'}`}>
                          {slot.available ? 'Available' : 'Booked'}
                        </span>
                        <div className="text-xs text-gray-600 mt-1 capitalize">{slot.type}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailsPage;