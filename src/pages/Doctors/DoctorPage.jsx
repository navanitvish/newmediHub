import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, Calendar, Star, MapPin } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const DoctorPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredId, setHoveredId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const navigate = useNavigate();

  const doctors = [
    {
      icons: "/api/placeholder/64/64",
      specialty: "General Physician",
      description: "Heart and cardiovascular system specialist"
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
      description: "Urinary tract and male reproductive system specialist"
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

  // Sample featured doctors data
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
      available: true
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
      available: true
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
      available: false
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
      available: true
    }
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

  // Filter function for specialties
  const filteredSpecialties = selectedFilter === 'all' 
    ? doctors 
    : doctors.filter(doctor => 
        doctor.specialty.toLowerCase().includes(selectedFilter.toLowerCase())
      );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero section with gradient background */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 mt-28">
        <div className="max-w-7xl mx-auto pt-16 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Find Your Perfect Doctor
            </h1>
            <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Connect with top specialists for personalized care and expert medical advice
            </p>
            
            {/* Search Component */}
            <div className="max-w-3xl mx-auto mt-8 relative">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-4 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg text-gray-900"
                    placeholder="Search for doctors, specialties, or conditions"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="bg-indigo-800 hover:bg-indigo-900 text-white px-8 py-4 rounded-lg font-medium shadow-lg transition-all duration-300 flex-shrink-0">
                  Find Doctors
                </button>
              </div>
              
              <div className="flex justify-center space-x-4 mt-6">
                <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm transition-all flex items-center gap-1">
                  <Calendar size={16} /> Book Appointment
                </button>
                <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm transition-all flex items-center gap-1">
                  <MapPin size={16} /> Near Me
                </button>
                <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm transition-all flex items-center gap-1">
                  <Star size={16} /> Top Rated
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave shape divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="#f9fafb" preserveAspectRatio="none">
            <path d="M0,32L80,42.7C160,53,320,75,480,74.7C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
          </svg>
        </div>
      </div>

      {/* Stats section */}
      <div className="max-w-7xl mx-auto -mt-10 relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform transition-all hover:scale-105">
            <div className="text-indigo-600 font-bold text-3xl md:text-4xl mb-2">1000+</div>
            <div className="text-gray-600">Expert Doctors</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform transition-all hover:scale-105">
            <div className="text-indigo-600 font-bold text-3xl md:text-4xl mb-2">24/7</div>
            <div className="text-gray-600">Medical Support</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform transition-all hover:scale-105">
            <div className="text-indigo-600 font-bold text-3xl md:text-4xl mb-2">98%</div>
            <div className="text-gray-600">Patient Satisfaction</div>
          </div>
        </div>
      </div>

      {/* Doctor Specialties Carousel Section */}
      <div className="max-w-7xl mx-auto mt-20 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Medical Specialties</h2>
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
                className={` rounded-xl  flex-shrink-0 transform transition-all duration-300 ease-in-out ${
                  hoveredId === index ? 'scale-105' : ''
                }`}
                style={{ 
                  width: `calc(${100 / visibleCardsCount}% - ${(visibleCardsCount - 1) * 24 / visibleCardsCount}px)` 
                }}
                onMouseEnter={() => setHoveredId(index)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => handleSpecialtyClick(doctor.specialty)}
              >
                <div className="p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                    <img src={doctor.icons} alt="" className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {doctor.specialty}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {doctor.description}
                  </p>
                  <button className="mt-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors duration-300 text-sm font-medium">
                    Find Specialists
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Doctors Section */}
      <div className="max-w-7xl mx-auto mt-24 mb-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Top-Rated Doctors</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with our highly experienced and well-reviewed medical professionals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name} 
                    className="w-16 h-16 rounded-full object-cover mr-4" 
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
                    <p className="text-indigo-600">{doctor.specialty}</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400 mr-2">
                    <Star size={16} fill="#FBBF24" />
                    <Star size={16} fill="#FBBF24" />
                    <Star size={16} fill="#FBBF24" />
                    <Star size={16} fill="#FBBF24" />
                    <Star size={16} fill="#FBBF24" className={doctor.rating < 5 ? "opacity-50" : ""} />
                  </div>
                  <span className="text-sm text-gray-600">{doctor.rating} ({doctor.reviews} reviews)</span>
                </div>
                
                <div className="mb-3 text-sm text-gray-600">
                  <div className="flex items-center mb-1">
                    <span className="font-medium mr-2">Experience:</span> {doctor.experience}
                  </div>
                  <div className="flex items-center">
                    <MapPin size={16} className="text-gray-400 mr-1" />
                    <span>{doctor.location}</span>
                  </div>
                </div>
                
                <div className="mt-4 flex">
                  <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors duration-300">
                    Book Appointment
                  </button>
                </div>
                
                <div className="text-center mt-3">
                  <span className={`text-xs ${doctor.available ? 'text-green-600' : 'text-red-600'}`}>
                    {doctor.available ? '✓ Available today' : '× Not available today'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <button className="inline-block bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-medium rounded-lg px-6 py-3 transition-colors duration-300">
            View All Doctors
          </button>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">What Our Patients Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real experiences from people who trusted us with their health
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex text-yellow-400 mb-4">
                <Star size={18} fill="#FBBF24" />
                <Star size={18} fill="#FBBF24" />
                <Star size={18} fill="#FBBF24" />
                <Star size={18} fill="#FBBF24" />
                <Star size={18} fill="#FBBF24" />
              </div>
              <p className="text-gray-700 mb-6">"The online appointment booking was so convenient. Dr. Johnson was thorough and took the time to explain everything clearly. Highly recommend!"</p>
              <div className="flex items-center">
                <img src="/api/placeholder/48/48" alt="Patient" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-medium text-gray-900">Jessica Thompson</h4>
                  <p className="text-sm text-gray-500">Cardiology Patient</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex text-yellow-400 mb-4">
                <Star size={18} fill="#FBBF24" />
                <Star size={18} fill="#FBBF24" />
                <Star size={18} fill="#FBBF24" />
                <Star size={18} fill="#FBBF24" />
                <Star size={18} fill="#FBBF24" />
              </div>
              <p className="text-gray-700 mb-6">"I was nervous about my surgery, but Dr. Patel and her team made me feel comfortable throughout the process. The follow-up care was excellent."</p>
              <div className="flex items-center">
                <img src="/api/placeholder/48/48" alt="Patient" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-medium text-gray-900">Robert Garcia</h4>
                  <p className="text-sm text-gray-500">Orthopaedic Patient</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex text-yellow-400 mb-4">
                <Star size={18} fill="#FBBF24" />
                <Star size={18} fill="#FBBF24" />
                <Star size={18} fill="#FBBF24" />
                <Star size={18} fill="#FBBF24" />
                <Star size={18} fill="#FBBF24" />
              </div>
              <p className="text-gray-700 mb-6">"The telehealth consultation saved me so much time. Dr. Chen diagnosed my condition accurately and the prescribed treatment worked perfectly."</p>
              <div className="flex items-center">
                <img src="/api/placeholder/48/48" alt="Patient" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-medium text-gray-900">Aisha Williams</h4>
                  <p className="text-sm text-gray-500">Neurology Patient</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-indigo-600 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Take Control of Your Health?</h2>
          <p className="text-indigo-100 text-lg mb-8 max-w-3xl mx-auto">
            Schedule an appointment with our medical experts and get the personalized care you deserve
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-4 rounded-lg font-medium shadow-lg transition-all duration-300">
              Book an Appointment
            </button>
            <button className="bg-indigo-800 text-white hover:bg-indigo-900 px-8 py-4 rounded-lg font-medium shadow-lg transition-all duration-300">
              Talk to a Doctor Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorPage;