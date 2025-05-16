import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Calendar,
  Star,
  MapPin,
  Clock,
  PhoneCall,
  Video,
  Info,
  Filter,
  Heart,
  Award,
  Users,
  CheckCircle
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import TestimonialsSection from './TestimonialsSection';

const DoctorPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredId, setHoveredId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const doctors = [
    {
      icons: "/api/placeholder/64/64",
      specialty: "General Physician",
      description: "Primary healthcare provider for various conditions"
    },
    {
      icons: "/api/placeholder/64/64",
      specialty: "Obstetrics & Gynaecology",
      description: "Women's reproductive health specialist"
    },
    {
      icons: "/api/placeholder/64/64",
      specialty: "Orthopaedics",
      description: "Bone and joint specialist"
    },
    {
      icons: "/api/placeholder/64/64",
      specialty: "Neurology",
      description: "Brain and nervous system specialist"
    },
    {
      icons: "/api/placeholder/64/64",
      specialty: "Cardiology",
      description: "Heart and cardiovascular system specialist"
    },
    {
      icons: "/api/placeholder/64/64",
      specialty: "Urology",
      description: "Urinary tract and male reproductive specialist"
    },
    {
      icons: "/api/placeholder/64/64",
      specialty: "Gastroenterology",
      description: "Digestive system specialist"
    },
    {
      icons: "/api/placeholder/64/64",
      specialty: "Psychiatry",
      description: "Mental health and disorders specialist"
    },
    {
      icons: "/api/placeholder/64/64",
      specialty: "Pulmonology",
      description: "Lung and respiratory system specialist"
    },
    {
      icons: "/api/placeholder/64/64",
      specialty: "Endocrinology",
      description: "Hormones and metabolism specialist"
    },
    {
      icons: "/api/placeholder/64/64",
      specialty: "Nephrology",
      description: "Kidney health specialist"
    },
    {
      icons: "/api/placeholder/64/64",
      specialty: "Neurosurgery",
      description: "Surgical treatment of nervous system disorders"
    },
    {
      icons: "/api/placeholder/64/64",
      specialty: "Rheumatology",
      description: "Joint, muscle, and autoimmune diseases specialist"
    },
    {
      icons: "/api/placeholder/64/64",
      specialty: "Surgical Gastroenterology",
      description: "Surgical treatment for GI diseases"
    },
    {
      icons: "/api/placeholder/64/64",
      specialty: "Infectious Disease",
      description: "Treatment of contagious and infectious diseases"
    },
    {
      icons: "/api/placeholder/64/64",
      specialty: "General & Laparoscopic Surgeon",
      description: "Specialist in minimal access techniques"
    },
    {
      icons: "/api/placeholder/64/64",
      specialty: "Psychology",
      description: "Specialist in mental processes and behavior"
    },
    {
      icons: "/api/placeholder/64/64",
      specialty: "Medical Oncology",
      description: "Cancer diagnosis and treatment specialist"
    },
    {
      icons: "/api/placeholder/64/64",
      specialty: "Diabetology",
      description: "Diabetes management and treatment expert"
    },
    {
      icons: "/api/placeholder/64/64",
      specialty: "Dentist",
      description: "Oral health and dental care specialist"
    }
  ];

  // Enhanced featured doctors data
  const featuredDoctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      image: "/api/placeholder/96/96",
      rating: 4.9,
      reviews: 127,
      experience: "15+ years",
      location: "Downtown Medical Center",
      available: true,
      nextAvailable: "Today",
      education: "Harvard Medical School",
      languages: ["English", "Spanish"],
      consultationFee: "$150",
      specializations: ["Heart Disease", "Hypertension"]
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Neurology",
      image: "/api/placeholder/96/96",
      rating: 4.8,
      reviews: 94,
      experience: "12+ years",
      location: "Central Hospital",
      available: true,
      nextAvailable: "Tomorrow",
      education: "Johns Hopkins University",
      languages: ["English", "Mandarin"],
      consultationFee: "$180",
      specializations: ["Migraines", "Epilepsy"]
    },
    {
      id: 3,
      name: "Dr. Priya Patel",
      specialty: "Obstetrics & Gynaecology",
      image: "/api/placeholder/96/96",
      rating: 4.9,
      reviews: 156,
      experience: "10+ years",
      location: "Women's Health Clinic",
      available: false,
      nextAvailable: "May 16",
      education: "Stanford Medical School",
      languages: ["English", "Hindi", "Gujarati"],
      consultationFee: "$165",
      specializations: ["Prenatal Care", "Fertility"]
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialty: "Orthopaedics",
      image: "/api/placeholder/96/96",
      rating: 4.7,
      reviews: 88,
      experience: "20+ years",
      location: "Joint & Bone Center",
      available: true,
      nextAvailable: "Today",
      education: "Mayo Medical School",
      languages: ["English"],
      consultationFee: "$195",
      specializations: ["Sports Injuries", "Joint Replacement"]
    }
  ];

  // Enhanced testimonials with more details
  const testimonials = [
    {
      id: 1,
      name: "Jessica Thompson",
      specialty: "Cardiology Patient",
      avatar: "/api/placeholder/48/48",
      rating: 5,
      text: "The online appointment booking was so convenient. Dr. Johnson was thorough and took the time to explain everything clearly. She answered all my questions about my heart condition and created a treatment plan that perfectly fits my lifestyle. Highly recommend!",
      date: "April 2025"
    },
    {
      id: 2,
      name: "Robert Garcia",
      specialty: "Orthopaedic Patient",
      avatar: "/api/placeholder/48/48",
      rating: 5,
      text: "I was nervous about my knee surgery, but Dr. Wilson and his team made me feel comfortable throughout the process. The follow-up care was excellent, and my recovery has been faster than expected. The physical therapy recommendations were spot-on.",
      date: "March 2025"
    },
    {
      id: 3,
      name: "Aisha Williams",
      specialty: "Neurology Patient",
      avatar: "/api/placeholder/48/48",
      rating: 5,
      text: "The telehealth consultation saved me so much time. Dr. Chen diagnosed my condition accurately and the prescribed treatment worked perfectly. He explained the complex neurological terms in a way that was easy to understand. Would definitely consult again.",
      date: "May 2025"
    }
  ];

  // Common stats for the stats section
  const stats = [
    {
      value: "1000+",
      label: "Expert Doctors",
      icon: <Users className="h-6 w-6 text-indigo-500" />
    },
    {
      value: "24/7",
      label: "Medical Support",
      icon: <Clock className="h-6 w-6 text-indigo-500" />
    },
    {
      value: "98%",
      label: "Patient Satisfaction",
      icon: <Award className="h-6 w-6 text-indigo-500" />
    }
  ];

  // Available appointment types
  const appointmentTypes = [
    {
      id: 'video',
      name: 'Video Consultation',
      icon: <Video className="h-5 w-5" />
    },
    {
      id: 'clinic',
      name: 'Clinic Visit',
      icon: <MapPin className="h-5 w-5" />
    },
    {
      id: 'phone',
      name: 'Phone Call',
      icon: <PhoneCall className="h-5 w-5" />
    }
  ];

  // Available time slots
  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "1:00 PM", "1:30 PM",
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
    "4:00 PM", "4:30 PM", "5:00 PM"
  ];

  const totalCards = doctors.length;
  const cardsToShow = window.innerWidth >= 1024 ? 5 : window.innerWidth >= 768 ? 3 : 2;

  const [visibleCardsCount, setVisibleCardsCount] = useState(cardsToShow);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCardsCount(5);
      } else if (window.innerWidth >= 768) {
        setVisibleCardsCount(3);
      } else {
        setVisibleCardsCount(2);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalCards - visibleCardsCount : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalCards - visibleCardsCount ? 0 : prevIndex + 1
    );
  };

  // Handle click on a specialty card
  const handleSpecialtyClick = (specialty) => {
    // Navigate to the consultation page with the selected specialty
    navigate('/consultation', { state: { specialty } });
  };

  // Handle doctor selection and modal open
  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  // Filter function for specialties
  const filteredSpecialties = selectedFilter === 'all'
    ? doctors
    : doctors.filter(doctor =>
      doctor.specialty.toLowerCase().includes(selectedFilter.toLowerCase())
    );

  // Function to render star ratings
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        size={16}
        fill={i < Math.floor(rating) ? "#FBBF24" : "#E5E7EB"}
        className={i < Math.floor(rating) ? "" : "opacity-50"}
      />
    ));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero section with gradient background and animated elements */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 overflow-hidden">
        <div className="absolute inset-0">
          <svg className="absolute left-0 top-0 h-full w-full" viewBox="0 0 1440 800" fill="none" preserveAspectRatio="xMidYMid slice">
            <path
              d="M1440 0H0V800H1440V0Z"
              fill="url(#paint0_linear)"
            />
            <g opacity="0.15">
              <circle cx="1080" cy="400" r="120" fill="white" />
              <circle cx="360" cy="600" r="80" fill="white" />
              <circle cx="180" cy="200" r="40" fill="white" />
              <circle cx="1200" cy="150" r="60" fill="white" />
              <circle cx="900" cy="700" r="100" fill="white" />
            </g>
            <defs>
              <linearGradient id="paint0_linear" x1="0" y1="0" x2="1440" y2="800" gradientUnits="userSpaceOnUse">
                <stop stopColor="#4338CA" />
                <stop offset="1" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto pt-20 pb-28 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Your Health, Our Priority
            </h1>
            <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Connect with top specialists for personalized care and expert medical advice
            </p>

            {/* Enhanced Search Component with Animated Shadow */}
            <div className="max-w-3xl mx-auto mt-8 relative">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-12 pr-4 py-4 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xl text-gray-900 transition-all duration-300"
                    placeholder="Search for doctors, specialties, or conditions"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="bg-indigo-800 hover:bg-indigo-900 text-white px-8 py-4 rounded-xl font-medium shadow-xl transition-all duration-300 flex-shrink-0 hover:scale-105">
                  Find Doctors
                </button>
              </div>

              <div className="flex justify-center flex-wrap gap-3 mt-6">
                <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm transition-all flex items-center gap-1 hover:scale-105">
                  <Calendar size={16} /> Book Appointment
                </button>
                <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm transition-all flex items-center gap-1 hover:scale-105">
                  <MapPin size={16} /> Near Me
                </button>
                <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm transition-all flex items-center gap-1 hover:scale-105">
                  <Star size={16} /> Top Rated
                </button>
                <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm transition-all flex items-center gap-1 hover:scale-105">
                  <Filter size={16} /> Filter Options
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced wave shape divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="#f9fafb" preserveAspectRatio="none">
            <path d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,80C672,64,768,64,864,74.7C960,85,1056,107,1152,106.7C1248,107,1344,85,1392,74.7L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </div>

      {/* Enhanced Stats section with better visual appeal */}
      <div className="max-w-7xl mx-auto -mt-16 relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl p-8 text-center transform transition-all hover:scale-105 group"
            >
              <div className="bg-indigo-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-100 transition-colors">
                {stat.icon}
              </div>
              <div className="text-indigo-600 font-bold text-3xl md:text-4xl mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Doctor Specialties Section with Cards */}
      <div className="max-w-7xl mx-auto mt-24 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Medical Specialties</h2>
            <p className="text-gray-600">Find the right specialist for your specific health needs</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className="bg-white rounded-full p-3 shadow-md hover:shadow-lg hover:bg-indigo-50 transition-all duration-300"
              aria-label="Previous specialty"
            >
              <ChevronLeft size={20} className="text-indigo-600" />
            </button>
            <button
              onClick={handleNext}
              className="bg-white rounded-full p-3 shadow-md hover:shadow-lg hover:bg-indigo-50 transition-all duration-300"
              aria-label="Next specialty"
            >
              <ChevronRight size={20} className="text-indigo-600" />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCardsCount)}%)`,
            }}
          >
            {filteredSpecialties.map((doctor, index) => (
              <div
                key={index}
                className=" rounded-2xl  hover:shadow-xl flex-shrink-0 transform transition-all duration-300 ease-in-out cursor-pointer border border-gray-100"
                style={{
                  width: `calc(${100 / visibleCardsCount}% - ${(visibleCardsCount - 1) * 24 / visibleCardsCount}px)`
                }}
                onMouseEnter={() => setHoveredId(index)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => handleSpecialtyClick(doctor.specialty)}
              >
                <div className="p-6 flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                    <img src={doctor.icons} alt="" className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {doctor.specialty}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {doctor.description}
                  </p>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Featured Doctors Section */}
      <div className="max-w-7xl mx-auto mt-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Top-Rated Doctors</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Connect with our highly experienced and trusted healthcare professionals</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 transition-all duration-300 ease-in-out cursor-pointer border border-gray-100 group"
              onClick={() => handleDoctorClick(doctor)}
            >
              <div className="relative mb-4">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-24 h-24 object-cover rounded-lg mx-auto"
                />
                <button className="absolute top-0 right-0 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors">
                  <Heart size={16} className="text-red-500" />
                </button>
                {doctor.available && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Available {doctor.nextAvailable}
                  </div>
                )}
              </div>

              <h3 className="text-lg font-semibold text-gray-800 text-center group-hover:text-indigo-600 transition-colors">
                {doctor.name}
              </h3>
              <p className="text-sm text-gray-500 text-center mb-3">
                {doctor.specialty}
              </p>

              <div className="flex items-center justify-center mb-3">
                <div className="flex mr-1">
                  {renderStars(doctor.rating)}
                </div>
                <span className="text-sm text-gray-600">({doctor.reviews})</span>
              </div>

              <div className="flex flex-col gap-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <Clock size={14} className="mr-2 text-gray-400" />
                  {doctor.experience} experience
                </div>
                <div className="flex items-center">
                  <MapPin size={14} className="mr-2 text-gray-400" />
                  {doctor.location}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mt-2 flex justify-between items-center">
                <div className="text-gray-600 font-medium">
                  <span className="text-sm">Fee:</span> <span className="text-indigo-600">{doctor.consultationFee}</span>
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
            View all doctors <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
      {/* testimonail */}
      <TestimonialsSection />


      {/* How It Works Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Simple process to get the care you need in just a few steps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="bg-indigo-100 rounded-full w-20 h-20 flex items-center justify-center mb-6 relative">
              <Search className="h-8 w-8 text-indigo-600" />
              <div className="absolute -right-2 -top-2 bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                1
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Find a Doctor</h3>
            <p className="text-gray-600">
              Search for specialists based on your health needs, read reviews, and check their availability
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="bg-indigo-100 rounded-full w-20 h-20 flex items-center justify-center mb-6 relative">
              <Calendar className="h-8 w-8 text-indigo-600" />
              <div className="absolute -right-2 -top-2 bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                2
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Book Appointment</h3>
            <p className="text-gray-600">
              Select your preferred consultation type, date, and time that works best for your schedule
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="bg-indigo-100 rounded-full w-20 h-20 flex items-center justify-center mb-6 relative">
              <Video className="h-8 w-8 text-indigo-600" />
              <div className="absolute -right-2 -top-2 bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                3
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Get Consultation</h3>
            <p className="text-gray-600">
              Meet with your doctor in person or through video call and receive personalized care
            </p>
          </div>
        </div>
      </div>

      {/* Doctor Booking Modal */}
      {showModal && selectedDoctor && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setShowModal(false)}></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-full p-2 hover:bg-gray-50"
                  onClick={() => setShowModal(false)}
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
                      src={selectedDoctor.image}
                      alt={selectedDoctor.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                    />
                    <h3 className="mt-4 text-xl font-bold text-gray-800">{selectedDoctor.name}</h3>
                    <p className="text-indigo-600 font-medium">{selectedDoctor.specialty}</p>

                    <div className="flex items-center mt-2">
                      <div className="flex mr-1">
                        {renderStars(selectedDoctor.rating)}
                      </div>
                      <span className="text-sm text-gray-600">({selectedDoctor.reviews})</span>
                    </div>

                    <div className="w-full mt-6 space-y-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Award className="h-5 w-5 mr-3 text-indigo-500" />
                        <div>
                          <span className="font-medium text-gray-900">Experience</span>
                          <p>{selectedDoctor.experience}</p>
                        </div>
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-5 w-5 mr-3 text-indigo-500" />
                        <div>
                          <span className="font-medium text-gray-900">Location</span>
                          <p>{selectedDoctor.location}</p>
                        </div>
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <Info className="h-5 w-5 mr-3 text-indigo-500" />
                        <div>
                          <span className="font-medium text-gray-900">Education</span>
                          <p>{selectedDoctor.education}</p>
                        </div>
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-5 w-5 mr-3 text-indigo-500" />
                        <div>
                          <span className="font-medium text-gray-900">Specializes in</span>
                          <p>{selectedDoctor.specializations.join(", ")}</p>
                        </div>
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <div className="h-5 w-5 mr-3 flex items-center justify-center text-indigo-500">
                          <span className="font-bold">$</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-900">Consultation Fee</span>
                          <p>{selectedDoctor.consultationFee}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Booking Side */}
                <div className="md:w-2/3 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Book an Appointment</h3>

                  {/* Appointment Type Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Select Appointment Type
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {appointmentTypes.map((type) => (
                        <div
                          key={type.id}
                          className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-colors relative"
                        >
                          <div className="flex items-center">
                            <div className="mr-3 text-indigo-600">
                              {type.icon}
                            </div>
                            <span className="font-medium">{type.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Calendar Section */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Select Date
                    </label>
                    <div className="border border-gray-200 rounded-lg p-4">
                      {/* Calendar would go here - simplified for this example */}
                      <div className="grid grid-cols-7 gap-1 text-center">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                          <div key={idx} className="text-xs font-medium text-gray-500 py-1">{day}</div>
                        ))}
                        {Array(31).fill(0).map((_, idx) => {
                          const day = idx + 1;
                          const isToday = day === 14;
                          const isSelected = day === 15;
                          const isAvailable = day >= 14;

                          return (
                            <div
                              key={day}
                              className={`
                                py-2 rounded-full text-sm mx-1
                                ${isSelected ? 'bg-indigo-600 text-white' : ''}
                                ${isToday ? 'border border-indigo-500 text-indigo-800' : ''}
                                ${isAvailable ? 'cursor-pointer hover:bg-indigo-100' : 'text-gray-300'}
                              `}
                            >
                              {day}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Select Time
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {timeSlots.map((time, idx) => (
                        <div
                          key={idx}
                          className="border border-gray-200 rounded-lg p-2 text-center text-sm cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Booking Button */}
                  <div className="mt-8">
                    <button
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                    >
                      Confirm Booking
                    </button>
                    <p className="text-xs text-gray-500 text-center mt-3">
                      By confirming this booking, you agree to our terms of service and privacy policy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-indigo-600 text-white py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Your Health Shouldn't Wait</h2>
          <p className="max-w-2xl mx-auto mb-8 text-indigo-100">
            Take the first step towards better health by scheduling an appointment with our specialists today
          </p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-medium hover:bg-indigo-50 transition-colors shadow-md">
            Book Your Appointment
          </button>
        </div>
      </div>




    </div>
  );
};

export default DoctorPage;