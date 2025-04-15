import { useState, useRef,useEffect } from 'react'

const DoctorSearch = ({onSearch}) => {
    const [showSpecialties, setShowSpecialties] = useState(false);
    const [selectedSpecialty, setSelectedSpecialty] = useState("");
    const dropdownRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [location, setLocation] = useState("");

    const specialties = [
        "Cardiology", "Dermatology", "Neurology", "Orthopedics",
        "Pediatrics", "Psychiatry", "Ophthalmology", "Dentistry",
        "Gynecology", "Urology", "ENT", "Pulmonology", "Rheumatology"
    ];

    const filteredSpecialties = specialties.filter(specialty =>
        specialty.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSpecialties(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      specialty: selectedSpecialty,
      date: selectedDate,
      location: location
    });
  };


    return (
        <div className='bg-blue-100 w-full h-[250px] '>

            <div className='max-w-7xl mx-auto '>
                <h1 className='text-3xl font-bold p-4'>Find a Doctor in 3 easy steps</h1>
                <div className=' p-4 border border-gray-300 bg-white rounded-lg shadow-md'>
                    <form onSubmit={handleSubmit} className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center flex-col p-4  rounded-lg ' >

                        <div className='mb-4'>
                            <label className='text-lg font-semibold'>Select a Doctor</label>
                            <div className='relative' ref={dropdownRef}>
                                <div className='w-full p-4 bg-white border border-gray-300 rounded-lg flex justify-between items-center cursor-pointer'
                                    onClick={() => setShowSpecialties(!showSpecialties)} >

                                    <span className={selectedSpecialty ? "text-gray-800" : "text-gray-500"}>  {selectedSpecialty || "Lab Report Analysis"}</span>
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </div>

                                {showSpecialties && (
                                    <div className='absolute left-0 right-0 top-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10'>
                                        <div className='p-2 border-b border-gray-300'>
                                            <input type="text"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                placeholder="Search specialties"
                                                className='w-full p-2 border border-gray-300 rounded-md'
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        </div>

                                        <div className='max-h-40 overflow-y-auto'>
                                            {filteredSpecialties.length > 0 ? (
                                                filteredSpecialties.map((specialty, index) => (
                                                    <div key={index} className='p-2 hover:bg-gray-100 cursor-pointer'
                                                        onClick={() => {
                                                            setSelectedSpecialty(specialty);
                                                            setShowSpecialties(false);
                                                        }}>
                                                        {specialty}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className='p-2 text-gray-500'>
                                                    No specialties found.
                                                </div>
                                            )}


                                        </div>



                                    </div>
                                )}


                            </div>

                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Appointment Date</label>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="w-full p-4 border border-gray-300 rounded-lg bg-white"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 font-semibold mb-2">Preferred Location/Pincode</label>
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Enter location or pincode"
                                className="w-full p-4 border border-gray-300 rounded-lg bg-white"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Search Doctors
                        </button>

                    </form>

                </div>
            </div>


        </div>
    )
}

export default DoctorSearch
