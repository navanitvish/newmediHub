import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DoctorSearchResults = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState(null);
  
  useEffect(() => {
    // Retrieve search parameters from localStorage
    const storedParams = localStorage.getItem('doctorSearchParams');
    const params = storedParams ? JSON.parse(storedParams) : null;
    setSearchParams(params);
  }, []);
  
  useEffect(() => {
    // Mock data for demonstration
    const mockDoctors = [
      {
        id: 1,
        name: "Dr. Vijay Dureja",
        specialty: "Pain Management",
        experience: "18 YRS",
        qualifications: "MBBS, MD ANAESTHESIOLOGY",
        location: "New Delhi",
        clinic: "CENTRE FOR PAIN RELIEF, New Delhi",
        fee: "₹1000",
        availableSlots: [
          { type: "Clinic Visit", time: "tomorrow at 10:00 AM" }
        ],
        image: "/api/placeholder/80/80"
      },
      {
        id: 2,
        name: "Dr. Amit Sharma",
        specialty: "Cardiology",
        experience: "15 YRS",
        qualifications: "MBBS, MD CARDIOLOGY",
        location: "New Delhi",
        clinic: "HEART CARE CENTRE, New Delhi",
        fee: "₹1200",
        availableSlots: [
          { type: "Video Consult", time: "tomorrow at 11:30 AM" }
        ],
        image: "/api/placeholder/80/80"
      },
      {
        id: 3,
        name: "Dr. Priya Patel",
        specialty: "Dermatology",
        experience: "12 YRS",
        qualifications: "MBBS, MD DERMATOLOGY",
        location: "New Delhi",
        clinic: "SKIN & CARE CLINIC, New Delhi",
        fee: "₹900",
        availableSlots: [
          { type: "Clinic Visit", time: "tomorrow at 2:00 PM" }
        ],
        image: "/api/placeholder/80/80"
      }
    ];

    // Simulate API call to fetch doctors based on search parameters
    setLoading(true);
    setTimeout(() => {
      setDoctors(mockDoctors);
      setLoading(false);
    }, 1000);
  }, [searchParams]);

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      {/* Header with navigation */}
      <div className="bg-white border-b border-gray-200 mb-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center py-3 text-sm">
            <Link to="/" className="text-blue-500 hover:underline">Home</Link>
            <span className="mx-2 text-gray-400">•</span>
            <Link to="/" className="text-blue-500 hover:underline">Quick Book</Link>
          </div>
        </div>
      </div>

      {/* Search form */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="text-xs font-medium text-gray-700 mb-1 block">
              Preferred Location/Pincode<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input 
                type="text" 
                className="w-full border border-gray-300 rounded-md py-2 pl-8 pr-4"
                defaultValue={searchParams?.location || "New Delhi"}
                readOnly
              />
              <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="absolute inset-y-0 right-2 flex items-center">
                <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16l4-4 4 4m0-8l-4 4-4-4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <label className="text-xs font-medium text-gray-700 mb-1 block">
              Select Date<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input 
                type="text" 
                className="w-full border border-gray-300 rounded-md py-2 pl-4 pr-8"
                defaultValue={searchParams?.date || "Tomorrow"}
                readOnly
              />
              <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <label className="text-xs font-medium text-gray-700 mb-1 block">
              Select Speciality<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input 
                type="text" 
                className="w-full border border-gray-300 rounded-md py-2 pl-4 pr-8"
                defaultValue={searchParams?.specialty || "Anaesthesia"}
                readOnly
              />
              <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visit Type Selection */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex space-x-4">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
            Hospital Visit
          </button>
          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition">
            Video Consult
          </button>
        </div>
      </div>

      {/* Search Results */}
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl font-bold text-blue-800 mb-4">Best matching doctors for your search</h2>

        {loading ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Loading doctors...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-3/4 flex">
                    <div className="mr-4">
                      <img src={doctor.image} alt={doctor.name} className="w-20 h-20 rounded-md" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-blue-800">{doctor.name}</h3>
                      <p className="text-sm text-gray-700">{doctor.specialty}</p>
                      <p className="text-xs font-bold text-blue-500 mt-1">
                        {doctor.experience} • {doctor.qualifications}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{doctor.location}</p>
                      <p className="text-xs text-gray-500 mt-1">{doctor.clinic}</p>
                      <p className="font-bold text-gray-800 mt-2">{doctor.fee}</p>
                    </div>
                  </div>
                  
                  <div className="md:w-1/4 mt-4 md:mt-0">
                    {doctor.availableSlots.map((slot, index) => (
                      <div key={index} className="w-full">
                        <button className="w-full bg-blue-600 text-white rounded-md py-2 mb-1 text-center">
                          {slot.type}
                        </button>
                        <p className="text-xs text-center text-gray-600">Available {slot.time}</p>
                        <p className="text-xs text-center text-orange-500 mt-2">No Booking Fees</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorSearchResults;