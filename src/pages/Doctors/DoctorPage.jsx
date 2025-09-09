import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Search,
  Calendar,
  Star,
  MapPin,
  Clock,
  PhoneCall,
  Video,
  Filter,
  Heart,
  Award,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// import DoctorSearch from './../../components/UI/DoctorSearch';
import MedicalSpecialtiesCarousel from "../../components/UI/MedicalSpecialtiesCarousel";
import { useGetQuery } from "../../api/apiCall";
import API_ENDPOINTS from "../../api/apiEndpoint";
import DoctorSearchForm from "./DoctorSearchForm";

const DoctorPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Fetch doctor data
  const {
    data: doctorData,
    isLoading,
    error,
  } = useGetQuery(`${API_ENDPOINTS.DOCTORS.GET_ALL_DOCTOR}`);

  // Fetch top doctors data
  const { data: topDoctorData } = useGetQuery(
    `${API_ENDPOINTS.DOCTORS.Get_TOP_DOCTORS}`
  );

  const topDoctors = topDoctorData?.result || [];

  // Slider navigation functions
  const cardsPerView = 4; // Number of cards to show at once
  const maxIndex = Math.max(0, topDoctors.length - cardsPerView);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentIndex(0);
  };

  // Filter doctors based on search term

  // Handle doctor selection
  const handleDoctorClick = (doctor) => {
    navigate("/doctor-details", { state: { doctor } });
  };

  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading doctors...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">
            Error loading doctors. Please try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 ">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 overflow-hidden">
        <div className="absolute inset-0">
          <svg
            className="absolute left-0 top-0 h-full w-full"
            viewBox="0 0 1440 800"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
          >
            <path d="M1440 0H0V800H1440V0Z" fill="url(#paint0_linear)" />
            <g opacity="0.15">
              <circle cx="1080" cy="400" r="120" fill="white" />
              <circle cx="360" cy="600" r="80" fill="white" />
              <circle cx="180" cy="200" r="40" fill="white" />
              <circle cx="1200" cy="150" r="60" fill="white" />
              <circle cx="900" cy="700" r="100" fill="white" />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="0"
                y1="0"
                x2="1440"
                y2="800"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4338CA" />
                <stop offset="1" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto pt-20 pb-28 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Your Health, Our Priority
            </h1>
            <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Connect with top specialists for personalized care and expert
              medical advice
            </p>

            {/* Search Component */}
            <div className="max-w-3xl mx-auto mt-8 relative">
              <div className="flex flex-col md:flex-row gap-4">
                <DoctorSearchForm />
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

        {/* Wave shape divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            fill="#f9fafb"
            preserveAspectRatio="none"
          >
            <path d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,80C672,64,768,64,864,74.7C960,85,1056,107,1152,106.7C1248,107,1344,85,1392,74.7L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </div>

      {/* Banner Image */}
      <div className="max-w-7xl mx-auto rounded-2xl mt-16 ">
        <img
          src="https://images.apollo247.in/images/consult_home/consult-home-listing/doc-banner-desktop.svg?tr=q-80,w-1300,dpr-2,c-at_max"
          alt="Doctor consultation banner"
          className="w-full rounded-2xl"
        />
      </div>

      {/* Medical Specialties Carousel */}
      <div className="max-w-7xl mx-auto mt-16 px-4 sm:px-6 lg:px-8 mb-8">
        <MedicalSpecialtiesCarousel />
      </div>

      {/* Doctor Search Component */}
      {/* <DoctorSearch /> */}

      <div className="max-w-7xl mx-auto pt-24 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div className="text-left">
            <div className="inline-block">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                Top-Rated Doctors
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
            </div>
            <p className="text-gray-600 max-w-2xl mt-4 text-lg">
              Connect with our highly experienced and trusted healthcare
              professionals
            </p>
          </div>

          {/* Enhanced Navigation buttons */}
          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`p-4 rounded-full transition-all duration-300 transform hover:scale-105 ${
                currentIndex === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl"
              }`}
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className={`p-4 rounded-full transition-all duration-300 transform hover:scale-105 ${
                currentIndex >= maxIndex
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl"
              }`}
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* Enhanced Slider container */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
            }}
          >
            {topDoctors.map((doctor, index) => (
              <div key={doctor.id} className="w-1/4 flex-shrink-0 px-3 mb-8">
                <div
                  className="bg-white rounded-3xl shadow-lg hover:shadow-2xl p-6 transition-all  duration-500 ease-out cursor-pointer border border-gray-100 group h-full transform hover:-translate-y-2 relative overflow-hidden"
                  onClick={() => handleDoctorClick(doctor)}
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative mb-4">
                    <div className="relative">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-28 h-28 object-cover rounded-2xl mx-auto ring-4 ring-gray-100 group-hover:ring-blue-200 transition-all duration-300"
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-28 h-28 mx-auto"></div>
                    </div>
                    {/* <button className="absolute top-0 right-0 p-3 bg-white rounded-full shadow-lg hover:bg-red-50 transition-all duration-300 hover:scale-110 group">
                      <Heart
                        size={18}
                        className="text-red-500 group-hover:fill-current"
                      />
                    </button> */}
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 text-center group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {doctor.name}
                  </h3>
                  <p className="text-base text-gray-500 text-center mb-4 font-medium">
                    {doctor?.doctorId?.specialization?.name}
                  </p>

                  <div className="flex items-center justify-center mb-4">
                    <div className="flex mr-2">
                      {Array.from({ length: 5 }, (_, index) => (
                        <Star
                          key={index}
                          size={20}
                          className="text-yellow-400"
                          fill="currentColor"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 font-medium">
                      ({doctor.reviews || 0} reviews)
                    </span>
                  </div>

                  <div className="space-y-3 text-sm text-gray-600 mb-6">
                   <div className="grid grid-cols-2 gap-2">
                     <div className="flex items-center justify-center">
                      <div className="flex items-center bg-gray-50 rounded-lg px-3 py-2">
                        <Clock size={16} className="mr-2 text-blue-500" />
                        <span className="font-medium">
                          {doctor?.doctorId?.experience} exp
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="flex items-center bg-gray-50 rounded-lg px-3 py-2">
                        <MapPin size={16} className="mr-2 text-indigo-500" />
                        <span className="font-medium">
                          {doctor?.doctorId?.address}
                        </span>
                      </div>
                    </div>
                   </div>
                    <div className="text-center">
                      <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg px-4 py-2">
                        <span className="text-sm font-medium">
                          Consultation Fee: ₹{doctor?.doctorId?.fee}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        
      </div>

      {/* Enhanced How It Works Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-20">
          <div className="inline-block">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              How It Works
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto"></div>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto mt-6 text-lg">
            Simple process to get the care you need in just a few steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              icon: Search,
              number: 1,
              title: "Find a Doctor",
              description:
                "Search for specialists based on your health needs, read reviews, and check their availability",
            },
            {
              icon: Calendar,
              number: 2,
              title: "Book Appointment",
              description:
                "Select your preferred consultation type, date, and time that works best for your schedule",
            },
            {
              icon: Video,
              number: 3,
              title: "Get Consultation",
              description:
                "Meet with your doctor in person or through video call and receive personalized care",
            },
          ].map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group"
            >
              <div className="relative mb-8">
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-3xl w-24 h-24 flex items-center justify-center mb-6 relative group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300 transform group-hover:scale-110">
                  <step.icon className="h-10 w-10 text-blue-600" />
                </div>
                <div className="absolute -right-3 -top-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg shadow-lg">
                  {step.number}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                {step.title}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Connection lines between steps */}
        <div className="hidden md:block absolute inset-0 pointer-events-none">
          <div className="flex justify-center items-center h-full">
            <div className="flex items-center space-x-64 mt-8">
              <div className="w-32 h-0.5 bg-gradient-to-r from-blue-300 to-indigo-300"></div>
              <div className="w-32 h-0.5 bg-gradient-to-r from-blue-300 to-indigo-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorPage;
