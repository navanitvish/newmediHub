import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const DoctorConsultationPlatform = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get the selected specialty from navigation state
  const passedSpecialty = location.state?.specialty || 'General Physicians';
  
  const [activeSpecialty, setActiveSpecialty] = useState(passedSpecialty);
  const [currentSpecialtyPage, setCurrentSpecialtyPage] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewType, setViewType] = useState('grid');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [filters, setFilters] = useState({
    mode: {
      hospitalVisit: false,
      onlineConsult: true
    },
    experience: {
      '0-5': false,
      '6-10': false,
      '11-16': false
    },
    fees: {
      '100-500': false,
      '500-1000': false,
      '1000+': false
    },
    facility: {
      apolloHospital: false,
      otherClinics: false
    },
    availability: {
      today: false,
      tomorrow: false,
      thisWeek: false
    },
    gender: {
      male: false,
      female: false
    },
    language: {
      english: false,
      hindi: false,
      tamil: false,
      telugu: false
    }
  });

  // Map specialty names from DoctorPage to match the ones used here
  const specialtyMapping = {
    'Cardiologist': 'Cardiology',
    'Gynecologist': 'Gynecology',
    'Dentist': 'Dental Care',
    'Pediatrician': 'Pediatrics',
    'Dermatologist': 'Dermatology',
    'Neurologist': 'Neurology',
    'Orthopedic': 'Orthopedics',
    'Psychiatrist': 'Psychiatry',
    'Ophthalmologist': 'Ophthalmology',
    'ENT Specialist': 'ENT',
    'Gastroenterologist': 'Gastroenterology',
    'Urology': 'Urology'
  };

  // Find the matching specialty in our list
  useEffect(() => {
    const mappedSpecialty = specialtyMapping[passedSpecialty] || passedSpecialty;
    
    // Find the closest match in our available specialties
    const matchedSpecialty = specialties.find(s => 
      s === mappedSpecialty || s.includes(mappedSpecialty)
    ) || 'General Physicians';
    
    setActiveSpecialty(matchedSpecialty);
    
    // Find which page this specialty is on
    const specialtyIndex = specialties.findIndex(s => s === matchedSpecialty);
    if (specialtyIndex !== -1) {
      setCurrentSpecialtyPage(Math.floor(specialtyIndex / 4));
    }
  }, [passedSpecialty]);

  // All specialties
  const specialties = [
    'General Physicians',
    'Cardiology',
    'Pediatrics',
    'Neurology',
    'Dermatology',
    'Orthopedics',
    'ENT',
    'Ophthalmology',
    'Gynecology',
    'Psychiatry',
    'Gastroenterology',
    'Urology'
  ];

  // Doctor data according to specialties
  const doctorsBySpecialty = {
    'General Physicians': [
      {
        id: 1,
        name: 'Dr. Suraja Nutulapati',
        role: 'General Physician/ Internal Medicine Specialist',
        years: '9 YEARS',
        qualification: 'MBBS, MD (INTERNAL MEDICINE)',
        location: 'Apollo 24|7 Virtual Clinic - Telangana, Hyderabad',
        fee: '₹428',
        img: '/api/placeholder/100/100',
        isHourDoctor: true,
        availableIn: null,
        rating: 4.7,
        reviewCount: 142,
        languages: ['English', 'Hindi', 'Telugu'],
        availability: {
          today: ['10:00 AM', '2:30 PM', '5:00 PM'],
          tomorrow: ['9:30 AM', '11:30 AM', '4:00 PM'],
          dayAfter: ['10:30 AM', '1:00 PM', '3:30 PM']
        },
        about: "Dr. Suraja is an experienced internal medicine specialist with expertise in treating chronic conditions and providing comprehensive primary care."
      },
      {
        id: 2,
        name: 'Dr. Mohammed Kamran',
        role: 'General Practitioner',
        years: '5 YEARS',
        qualification: 'MBBS, FIDM',
        location: 'Apollo 24|7 Virtual Clinic - Maharashtra, Nashik',
        fee: '₹328',
        cashback: '₹50 Cashback',
        img: '/api/placeholder/100/100',
        availableIn: '0 minutes',
        rating: 4.5,
        reviewCount: 98,
        languages: ['English', 'Hindi', 'Marathi'],
        availability: {
          today: ['11:00 AM', '3:30 PM', '6:00 PM'],
          tomorrow: ['9:00 AM', '1:30 PM', '4:30 PM'],
          dayAfter: ['10:00 AM', '2:00 PM', '5:30 PM']
        },
        about: "Dr. Mohammed specializes in preventive healthcare and family medicine with a focus on lifestyle modifications for better health outcomes."
      },
      {
        id: 3,
        name: 'Dr. J T Hema Pratima',
        role: 'General Practitioner',
        years: '9 YEARS',
        qualification: 'MBBS',
        location: 'Apollo 24|7 Virtual Clinic - Tamilnadu, Chennai',
        fee: '₹428',
        cashback: '₹64 Cashback',
        img: '/api/placeholder/100/100',
        satisfaction: '85% (200+ Patients)',
        availableIn: '0 minutes',
        rating: 4.3,
        reviewCount: 210,
        languages: ['English', 'Tamil', 'Telugu'],
        availability: {
          today: ['10:30 AM', '1:30 PM', '4:00 PM'],
          tomorrow: ['9:30 AM', '12:30 PM', '3:30 PM'],
          dayAfter: ['11:00 AM', '2:00 PM', '5:00 PM']
        },
        about: "Dr. Hema has extensive experience in diagnosing and treating common illnesses and providing holistic healthcare solutions."
      },
      {
        id: 4,
        name: 'Dr. Immanuel Raj',
        role: 'General Practitioner',
        years: '8 YEARS',
        qualification: 'MBBS, MBA (HHSM)',
        location: 'Apollo 24|7 Virtual Clinic - Telangana, Hyderabad',
        fee: '₹428',
        cashback: '₹64 Cashback',
        img: '/api/placeholder/100/100',
        availableIn: '0 minutes',
        rating: 4.6,
        reviewCount: 155,
        languages: ['English', 'Telugu', 'Hindi'],
        availability: {
          today: ['9:00 AM', '12:00 PM', '3:00 PM'],
          tomorrow: ['10:00 AM', '1:00 PM', '4:00 PM'],
          dayAfter: ['11:00 AM', '2:00 PM', '5:00 PM']
        },
        about: "Dr. Immanuel combines medical expertise with healthcare management skills to provide efficient and patient-centered care."
      }
    ],
    'Cardiology': [
      {
        id: 5,
        name: 'Dr. Anand Rao',
        role: 'Cardiologist',
        years: '15 YEARS',
        qualification: 'MBBS, MD, DM (Cardiology)',
        location: 'Apollo 24|7 Virtual Clinic - Telangana, Hyderabad',
        fee: '₹750',
        img: '/api/placeholder/100/100',
        availableIn: '30 minutes',
        rating: 4.8,
        reviewCount: 230,
        languages: ['English', 'Telugu', 'Hindi'],
        availability: {
          today: ['11:30 AM', '2:30 PM', '5:30 PM'],
          tomorrow: ['10:00 AM', '1:00 PM', '4:00 PM'],
          dayAfter: ['9:30 AM', '12:30 PM', '3:30 PM']
        },
        about: "Dr. Anand is a highly skilled cardiologist specializing in interventional procedures and management of complex cardiac conditions."
      },
      {
        id: 6,
        name: 'Dr. Priya Sharma',
        role: 'Cardiologist',
        years: '12 YEARS',
        qualification: 'MBBS, MD (Cardiology)',
        location: 'Apollo 24|7 Virtual Clinic - Delhi, New Delhi',
        fee: '₹650',
        cashback: '₹100 Cashback',
        img: '/api/placeholder/100/100',
        satisfaction: '92% (350+ Patients)',
        availableIn: '15 minutes',
        rating: 4.9,
        reviewCount: 350,
        languages: ['English', 'Hindi', 'Punjabi'],
        availability: {
          today: ['10:00 AM', '1:00 PM', '4:00 PM'],
          tomorrow: ['9:00 AM', '12:00 PM', '3:00 PM'],
          dayAfter: ['11:00 AM', '2:00 PM', '5:00 PM']
        },
        about: "Dr. Priya specializes in preventive cardiology and non-invasive cardiac diagnostics with a focus on women's heart health."
      }
    ],
    // Other specialties data remains the same but with added properties for full functionality
    'Dermatology': [
      {
        id: 7,
        name: 'Dr. Ritu Mehra',
        role: 'Dermatologist',
        years: '10 YEARS',
        qualification: 'MBBS, MD (Dermatology)',
        location: 'Apollo 24|7 Virtual Clinic - Mumbai, Maharashtra',
        fee: '₹600',
        img: '/api/placeholder/100/100',
        satisfaction: '88% (220+ Patients)',
        availableIn: '25 minutes',
        rating: 4.4,
        reviewCount: 220,
        languages: ['English', 'Hindi', 'Marathi'],
        availability: {
          today: ['11:00 AM', '2:00 PM', '5:00 PM'],
          tomorrow: ['10:00 AM', '1:00 PM', '4:00 PM'],
          dayAfter: ['9:00 AM', '12:00 PM', '3:00 PM']
        },
        about: "Dr. Ritu specializes in cosmetic dermatology and treatment of skin conditions with the latest techniques and procedures."
      }
    ],
    'Neurology': [
      {
        id: 9,
        name: 'Dr. Vikram Sharma',
        role: 'Neurologist',
        years: '18 YEARS',
        qualification: 'MBBS, MD, DM (Neurology)',
        location: 'Apollo 24|7 Virtual Clinic - Delhi, New Delhi',
        fee: '₹850',
        img: '/api/placeholder/100/100',
        satisfaction: '94% (180+ Patients)',
        availableIn: '45 minutes',
        rating: 4.7,
        reviewCount: 180,
        languages: ['English', 'Hindi'],
        availability: {
          today: ['10:30 AM', '1:30 PM', '4:30 PM'],
          tomorrow: ['9:30 AM', '12:30 PM', '3:30 PM'],
          dayAfter: ['11:30 AM', '2:30 PM', '5:30 PM']
        },
        about: "Dr. Vikram is an experienced neurologist with expertise in treating complex neurological disorders and neurodegenerative diseases."
      }
    ],
    'Pediatrics': [
      {
        id: 11,
        name: 'Dr. Neha Reddy',
        role: 'Pediatrician',
        years: '12 YEARS',
        qualification: 'MBBS, MD (Pediatrics)',
        location: 'Apollo 24|7 Virtual Clinic - Hyderabad, Telangana',
        fee: '₹500',
        img: '/api/placeholder/100/100',
        satisfaction: '90% (300+ Patients)',
        availableIn: '5 minutes',
        rating: 4.8,
        reviewCount: 300,
        languages: ['English', 'Telugu', 'Hindi'],
        availability: {
          today: ['9:00 AM', '12:00 PM', '3:00 PM'],
          tomorrow: ['10:00 AM', '1:00 PM', '4:00 PM'],
          dayAfter: ['11:00 AM', '2:00 PM', '5:00 PM']
        },
        about: "Dr. Neha is a compassionate pediatrician dedicated to providing comprehensive care for children from infancy through adolescence."
      }
    ],
    'Orthopedics': [
      {
        id: 13,
        name: 'Dr. Sanjay Patil',
        role: 'Orthopedic Surgeon',
        years: '16 YEARS',
        qualification: 'MBBS, MS (Ortho), DNB',
        location: 'Apollo 24|7 Virtual Clinic - Pune, Maharashtra',
        fee: '₹700',
        img: '/api/placeholder/100/100',
        isHourDoctor: true,
        availableIn: '10 minutes',
        rating: 4.6,
        reviewCount: 250,
        languages: ['English', 'Hindi', 'Marathi'],
        availability: {
          today: ['11:30 AM', '2:30 PM', '5:30 PM'],
          tomorrow: ['10:00 AM', '1:00 PM', '4:00 PM'],
          dayAfter: ['9:30 AM', '12:30 PM', '3:30 PM']
        },
        about: "Dr. Sanjay specializes in joint replacements, sports injuries and minimally invasive orthopedic procedures."
      }
    ]
  };

  // Add the same pattern for other specialties to maintain full data consistency

  // Filter doctors based on search term and filters
  const getFilteredDoctors = () => {
    let filteredDocs = doctorsBySpecialty[activeSpecialty] || [];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredDocs = filteredDocs.filter(doc => 
        doc.name.toLowerCase().includes(term) || 
        doc.role.toLowerCase().includes(term) ||
        doc.qualification.toLowerCase().includes(term)
      );
    }
    
    // Apply more filters based on the filters state
    // Example: Filter by experience
    const activeExperienceFilters = Object.entries(filters.experience)
      .filter(([_, isActive]) => isActive)
      .map(([range]) => range);
      
    if (activeExperienceFilters.length > 0) {
      filteredDocs = filteredDocs.filter(doc => {
        const years = parseInt(doc.years);
        return activeExperienceFilters.some(range => {
          const [min, max] = range.split('-').map(Number);
          return years >= min && (max ? years <= max : true);
        });
      });
    }
    
    // Apply fee filters
    const activeFeeFilters = Object.entries(filters.fees)
      .filter(([_, isActive]) => isActive)
      .map(([range]) => range);
      
    if (activeFeeFilters.length > 0) {
      filteredDocs = filteredDocs.filter(doc => {
        const fee = parseInt(doc.fee.replace('₹', ''));
        return activeFeeFilters.some(range => {
          if (range === '1000+') return fee >= 1000;
          const [min, max] = range.split('-').map(val => parseInt(val));
          return fee >= min && fee <= max;
        });
      });
    }
    
    // Apply sort
    if (sortBy === 'experience-high') {
      filteredDocs.sort((a, b) => parseInt(b.years) - parseInt(a.years));
    } else if (sortBy === 'experience-low') {
      filteredDocs.sort((a, b) => parseInt(a.years) - parseInt(b.years));
    } else if (sortBy === 'fee-high') {
      filteredDocs.sort((a, b) => parseInt(b.fee.replace('₹', '')) - parseInt(a.fee.replace('₹', '')));
    } else if (sortBy === 'fee-low') {
      filteredDocs.sort((a, b) => parseInt(a.fee.replace('₹', '')) - parseInt(b.fee.replace('₹', '')));
    } else if (sortBy === 'rating') {
      filteredDocs.sort((a, b) => b.rating - a.rating);
    }
    
    return filteredDocs;
  };

  // Show only 4 specialties at a time for mobile view
  const visibleSpecialties = specialties.slice(
    currentSpecialtyPage * 4, 
    Math.min((currentSpecialtyPage + 1) * 4, specialties.length)
  );

  // Pagination functions
  const nextSpecialtyPage = () => {
    if ((currentSpecialtyPage + 1) * 4 < specialties.length) {
      setCurrentSpecialtyPage(currentSpecialtyPage + 1);
    }
  };

  const prevSpecialtyPage = () => {
    if (currentSpecialtyPage > 0) {
      setCurrentSpecialtyPage(currentSpecialtyPage - 1);
    }
  };

  // Toggle filter checkboxes
  const toggleFilter = (category, option) => {
    setFilters({
      ...filters,
      [category]: {
        ...filters[category],
        [option]: !filters[category][option]
      }
    });
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      mode: {
        hospitalVisit: false,
        onlineConsult: true
      },
      experience: {
        '0-5': false,
        '6-10': false,
        '11-16': false
      },
      fees: {
        '100-500': false,
        '500-1000': false,
        '1000+': false
      },
      facility: {
        apolloHospital: false,
        otherClinics: false
      },
      availability: {
        today: false,
        tomorrow: false,
        thisWeek: false
      },
      gender: {
        male: false,
        female: false
      },
    });
    setSearchTerm('');
    setSortBy('relevance');
  };

  // Handle book appointment
  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setIsBookingModalOpen(true);
  };

  // Handle confirm booking
  const handleConfirmBooking = () => {
    // In a real app, this would send booking data to the backend
    alert(`Appointment booked with ${selectedDoctor.name} on ${appointmentDate} at ${appointmentTime}`);
    setIsBookingModalOpen(false);
    setSelectedDoctor(null);
    setAppointmentDate('');
    setAppointmentTime('');
  };

  // Handle navigation
  const handleBackToHome = () => {
    navigate('/');
  };

  const filteredDoctors = getFilteredDoctors();

  // Generate star rating display
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="text-yellow-400">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">★</span>);
    }
    
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">★</span>);
    }
    
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with search */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-6 mt-26">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <button onClick={handleBackToHome} className="p-2 rounded-full bg-white/10 hover:bg-white/20">
                ←
              </button>
              <h1 className="text-2xl font-bold">Find Doctors</h1>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full flex items-center">
                <span className="mr-2">📍</span>
                Location
              </button>
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full">
                Need Help?
              </button>
            </div>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search doctors, specialties, conditions..."
              className="w-full py-3 px-4 pl-10 rounded-lg border-0 focus:ring-2 focus:ring-blue-400 text-gray-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-sm">
            <button onClick={handleBackToHome} className="text-blue-600 hover:underline">Home</button>
            <span className="mx-2 text-gray-400">›</span>
            <button onClick={handleBackToHome} className="text-blue-600 hover:underline">Doctors</button>
            <span className="mx-2 text-gray-400">›</span>
            <span className="text-gray-700 font-medium">{activeSpecialty}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full py-3 px-4 bg-white rounded-lg shadow-sm border flex items-center justify-between"
          >
            <span className="font-medium">Filters & Sort</span>
            <span>{isFilterOpen ? '▲' : '▼'}</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters - Left Side (Responsive) */}
          <div className={`w-full lg:w-1/4 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white rounded-lg shadow-sm border p-4 sticky top-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Filters</h3>
                <button 
                  onClick={clearAllFilters}
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  Clear All
                </button>
              </div>

              <div className="mb-4">
                <button className="w-full py-2 px-4 bg-blue-50 border-2 border-blue-500 text-blue-600 rounded-md font-medium text-center hover:bg-blue-100 transition">
                  Show Doctors Near Me
                </button>
              </div>

              {/* Sorting options (Mobile) */}
              <div className="md:hidden border-t pt-4 pb-2">
                <h4 className="font-medium mb-3">Sort By</h4>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="relevance">Relevance</option>
                  <option value="experience-high">Experience: High to Low</option>
                  <option value="experience-low">Experience: Low to High</option>
                  <option value="fee-high">Fee: High to Low</option>
                  <option value="fee-low">Fee: Low to High</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {/* Mode of Consult */}
              <div className="border-t pt-4 pb-2">
                <h4 className="font-medium mb-3">Mode of Consult</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="form-checkbox h-5 w-5 text-blue-500" 
                      checked={filters.mode.hospitalVisit}
                      onChange={() => toggleFilter('mode', 'hospitalVisit')}
                    />
                    <span className="ml-2">Hospital Visit</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="form-checkbox h-5 w-5 text-blue-500" 
                      checked={filters.mode.onlineConsult}
                      onChange={() => toggleFilter('mode', 'onlineConsult')}
                    />
                    <span className="ml-2">Online Consult</span>
                  </label>
                </div>
              </div>

              {/* Availability */}
              <div className="border-t pt-4 pb-2">
                <h4 className="font-medium mb-3">Availability</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="form-checkbox h-5 w-5 text-blue-500"
                      checked={filters.availability.today}
                      onChange={() => toggleFilter('availability', 'today')}
                    />
                    <span className="ml-2">Available Today</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="form-checkbox h-5 w-5 text-blue-500"
                      checked={filters.availability.tomorrow}
                      onChange={() => toggleFilter('availability', 'tomorrow')}
                    />
                    <span className="ml-2">Available Tomorrow</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="form-checkbox h-5 w-5 text-blue-500"
                      checked={filters.availability.thisWeek}
                      onChange={() => toggleFilter('availability', 'thisWeek')}
                    />
                    <span className="ml-2">This Week</span>
                  </label>
                </div>
              </div>

              {/* Experience */}
              <div className="border-t pt-4 pb-2">
                <h4 className="font-medium mb-3">Experience (In Years)</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="form-checkbox h-5 w-5 text-blue-500"
                      checked={filters.experience['0-5']}
                      onChange={() => toggleFilter('experience', '0-5')}
                    />
                    <span className="ml-2">0-5</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="form-checkbox h-5 w-5 text-blue-500"
                      checked={filters.experience['6-10']}
                      onChange={() => toggleFilter('experience', '6-10')}
                    />
                    <span className="ml-2">6-10</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="form-checkbox h-5 w-5 text-blue-500"
                      checked={filters.experience['11-16']}
                      onChange={() => toggleFilter('experience', '11-16')}
                    />
                    <span className="ml-2">11-16</span>
                  </label>
                </div>
              </div>

              {/* Fees */}
              <div className="border-t pt-4 pb-2">
                <h4 className="font-medium mb-3">Fees</h4>
                <div className="space-y-2">
                  <label className="flex items-center"></label>
                  <input 
                      type="checkbox" 
                      className="form-checkbox h-5 w-5 text-blue-500"
                      checked={filters.fees['100-500']}
                      onChange={() => toggleFilter('fees', '100-500')}
                    />
                    <span className="ml-2">₹100 - ₹500</span>
                
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="form-checkbox h-5 w-5 text-blue-500"
                      checked={filters.fees['500-1000']}
                      onChange={() => toggleFilter('fees', '500-1000')}
                    />
                    <span className="ml-2">₹500 - ₹1000</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="form-checkbox h-5 w-5 text-blue-500"
                      checked={filters.fees['1000+']}
                      onChange={() => toggleFilter('fees', '1000+')}
                    />
                    <span className="ml-2">Above ₹1000</span>
                  </label>
                </div>
              </div>

              {/* Gender */}
              <div className="border-t pt-4 pb-2">
                <h4 className="font-medium mb-3">Gender</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="form-checkbox h-5 w-5 text-blue-500"
                      checked={filters.gender.male}
                      onChange={() => toggleFilter('gender', 'male')}
                    />
                    <span className="ml-2">Male</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="form-checkbox h-5 w-5 text-blue-500"
                      checked={filters.gender.female}
                      onChange={() => toggleFilter('gender', 'female')}
                    />
                    <span className="ml-2">Female</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Right Side */}
          <div className="w-full lg:w-3/4">
            {/* Specialty Tabs - Horizontal Scroll on Mobile */}
            {/* <div className="bg-white rounded-lg shadow-sm border p-3 mb-6 overflow-x-auto">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-medium">Popular Specialties</h2>
                <div className="flex">
                  <button 
                    onClick={prevSpecialtyPage} 
                    disabled={currentSpecialtyPage === 0}
                    className={`p-1 rounded ${currentSpecialtyPage === 0 ? 'text-gray-300' : 'text-blue-600'}`}
                  >
                    ◀
                  </button>
                  <button 
                    onClick={nextSpecialtyPage} 
                    disabled={(currentSpecialtyPage + 1) * 4 >= specialties.length}
                    className={`p-1 rounded ${(currentSpecialtyPage + 1) * 4 >= specialties.length ? 'text-gray-300' : 'text-blue-600'}`}
                  >
                    ▶
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {visibleSpecialties.map((specialty) => (
                  <button
                    key={specialty}
                    onClick={() => setActiveSpecialty(specialty)}
                    className={`px-4 py-3 rounded-lg text-center transition-colors ${
                      activeSpecialty === specialty
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    {specialty}
                  </button>
                ))}
              </div>
            </div> */}

            {/* Sort and View Type Controls (Desktop) */}
            <div className="hidden md:flex justify-between items-center bg-white rounded-lg shadow-sm border p-4 mb-6">
              <div className="flex-1">
                <span className="font-medium mr-2">Sort By:</span>
                <select 
                  className="border rounded-md p-1"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="relevance">Relevance</option>
                  <option value="experience-high">Experience: High to Low</option>
                  <option value="experience-low">Experience: Low to High</option>
                  <option value="fee-high">Fee: High to Low</option>
                  <option value="fee-low">Fee: Low to High</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
              <div className="flex">
                <button 
                  onClick={() => setViewType('grid')}
                  className={`p-2 rounded ${viewType === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-500'}`}
                >
                  ■
                </button>
                <button 
                  onClick={() => setViewType('list')}
                  className={`p-2 rounded ${viewType === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-500'}`}
                >
                  ≡
                </button>
              </div>
            </div>

            {/* Results Count */}
            <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
              <p className="text-gray-700">
                <span className="font-medium">{filteredDoctors.length} doctors </span>
                available for {activeSpecialty}
              </p>
            </div>

            {/* Doctors List */}
            <div className={`space-y-6 ${viewType === 'grid' ? 'md:grid md:grid-cols-2 md:gap-6 md:space-y-0' : ''}`}>
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <div key={doctor.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="p-4">
                      <div className="flex">
                        {/* Doctor Image */}
                        <div className="mr-4">
                          <div className="w-24 h-24 rounded-full overflow-hidden">
                            <img src={doctor.img} alt={doctor.name} className="w-full h-full object-cover" />
                          </div>
                          {doctor.isHourDoctor && (
                            <div className="bg-blue-100 text-blue-700 text-xs font-medium text-center mt-2 py-1 px-2 rounded">
                              1 Hour Doctor
                            </div>
                          )}
                        </div>
                        
                        {/* Doctor Info */}
                        <div className="flex-1">
                          <h3 className="text-lg font-medium">{doctor.name}</h3>
                          <p className="text-gray-600 text-sm">{doctor.role}</p>
                          <p className="text-gray-600 text-sm">{doctor.qualification}</p>
                          <p className="text-gray-600 text-sm">{doctor.years} Experience</p>
                          
                          <div className="mt-2 flex flex-wrap items-center">
                            <div className="flex items-center mr-3">
                              {renderStars(doctor.rating)}
                              <span className="ml-1 text-sm">{doctor.rating}</span>
                            </div>
                            <span className="text-sm text-gray-600">({doctor.reviewCount} reviews)</span>
                          </div>
                          
                          <div className="mt-2">
                            <p className="text-sm text-gray-600">
                              Languages: {doctor.languages.join(', ')}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Location and Fee */}
                      <div className="mt-3 pt-3 border-t">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm text-gray-600 flex items-center">
                              <span className="mr-1">📍</span>
                              {doctor.location}
                            </p>
                            {doctor.availableIn !== null && (
                              <p className="text-sm text-green-600 mt-1">
                                {doctor.availableIn === '0 minutes' 
                                  ? '✓ Available Now' 
                                  : `Available in ${doctor.availableIn}`}
                              </p>
                            )}
                          </div>
                          
                          <div className="text-right">
                            <p className="font-medium text-lg">{doctor.fee}</p>
                            {doctor.cashback && (
                              <p className="text-xs text-green-600">{doctor.cashback}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* About Doctor - Expandable */}
                      <div className="mt-3 pt-3 border-t">
                        <h4 className="font-medium mb-1">About Doctor</h4>
                        <p className="text-sm text-gray-600">{doctor.about}</p>
                      </div>
                      
                      {/* Availability Slots */}
                      <div className="mt-3 pt-3 border-t">
                        <h4 className="font-medium mb-2">Available Slots</h4>
                        <div className="space-y-2">
                          <div>
                            <p className="text-sm font-medium mb-1">Today</p>
                            <div className="flex flex-wrap gap-2">
                              {doctor.availability.today.map((time, idx) => (
                                <button 
                                  key={`today-${idx}`}
                                  className="px-3 py-1 text-sm border border-blue-300 text-blue-600 rounded-full hover:bg-blue-50"
                                >
                                  {time}
                                </button>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium mb-1">Tomorrow</p>
                            <div className="flex flex-wrap gap-2">
                              {doctor.availability.tomorrow.map((time, idx) => (
                                <button 
                                  key={`tomorrow-${idx}`}
                                  className="px-3 py-1 text-sm border border-blue-300 text-blue-600 rounded-full hover:bg-blue-50"
                                >
                                  {time}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="mt-4 flex space-x-3">
                        <button 
                          onClick={() => handleBookAppointment(doctor)}
                          className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
                        >
                          Book Appointment
                        </button>
                        <button className="px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition">
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
                  <p className="text-lg text-gray-600">No doctors found matching your criteria</p>
                  <button 
                    onClick={clearAllFilters}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isBookingModalOpen && selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Book Appointment</h3>
                <button onClick={() => setIsBookingModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                  <img src={selectedDoctor.img} alt={selectedDoctor.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-medium">{selectedDoctor.name}</h4>
                  <p className="text-sm text-gray-600">{selectedDoctor.role}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Select Date</label>
                <input 
                  type="date" 
                  className="w-full p-2 border rounded-md" 
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Select Time</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                >
                  <option value="">Select a time slot</option>
                  {selectedDoctor.availability.today.map((time, idx) => (
                    <option key={`slot-${idx}`} value={time}>{time}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4 p-3 bg-blue-50 rounded-md">
                <div className="flex justify-between">
                  <span className="text-gray-700">Consultation Fee:</span>
                  <span className="font-medium">{selectedDoctor.fee}</span>
                </div>
                {selectedDoctor.cashback && (
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-green-600">Cashback:</span>
                    <span className="text-green-600">{selectedDoctor.cashback}</span>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-3">
                <button 
                  onClick={() => setIsBookingModalOpen(false)}
                  className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleConfirmBooking}
                  disabled={!appointmentDate || !appointmentTime}
                  className={`flex-1 py-2 rounded-lg font-medium transition ${
                    !appointmentDate || !appointmentTime
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorConsultationPlatform;