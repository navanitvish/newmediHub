import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function MedicalSpecialtiesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredId, setHoveredId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

 

   const specialties = [
    {
      icons: "https://images.apollo247.in/specialty/615ebc75-4172-4f46-9ba0-b3688c053fcc-1721716587044.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max",
      specialty: "General Physician",
      description: "Primary healthcare provider for various conditions"
    },
    {
      icons: "https://images.apollo247.in/specialty/73dae7a6-ec1f-45c4-98bd-0c8acb6e4eca-1718393652685.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max",
      specialty: "Obstetrics & Gynaecology",
      description: "Women's reproductive health specialist"
    },
    {
      icons: "https://images.apollo247.in/specialty/07337088-ca54-4e67-8c53-6a5c03b07a7f-1718517850079.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max",
      specialty: "Orthopaedics",
      description: "Bone and joint specialist"
    },
    {
      icons: "https://images.apollo247.in/specialties/ic_ent.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max",
      specialty: "Neurology",
      description: "Brain and nervous system specialist"
    },
    {
      icons: "https://images.apollo247.in/specialties/ic_neurology.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max",
      specialty: "Cardiology",
      description: "Heart and cardiovascular system specialist"
    },
    {
      icons: "https://images.apollo247.in/specialty/d188a910-996b-4478-b014-72a8ec54312e-1718395128194.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max",
      specialty: "Urology",
      description: "Urinary tract and male reproductive specialist"
    },
    {
      icons: "https://images.apollo247.in/specialty/789b2a65-1d81-4023-92c8-39959ca8a7ed-1718393945815.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max",
      specialty: "Gastroenterology",
      description: "Digestive system specialist"
    },
    {
      icons: "/api/placeholder/64/64",
      specialty: "Psychiatry",
      description: "Mental health and disorders specialist"
    },
    {
      icons: "https://images.apollo247.in/specialty/f00cc642-2034-4cd2-a9e7-22029fc5c8e2-1718394667647.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max",
      specialty: "Pulmonology",
      description: "Lung and respiratory system specialist"
    },
    {
      icons: "https://images.apollo247.in/specialties/ic_paediatrics.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max",
      specialty: "Endocrinology",
      description: "Hormones and metabolism specialist"
    },
    {
      icons: "https://images.apollo247.in/specialties/ic_neurology.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max",
      specialty: "Nephrology",
      description: "Kidney health specialist"
    },
    {
      icons: "https://images.apollo247.in/specialties/ic_neurology.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max",
      specialty: "Neurosurgery",
      description: "Surgical treatment of nervous system disorders"
    },
    {
      icons: "https://images.apollo247.in/specialty/6e8e535f-2df3-46f8-967e-1a04306c35a4-1718394797424.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max",
      specialty: "Rheumatology",
      description: "Joint, muscle, and autoimmune diseases specialist"
    },
    {
      icons: "https://images.apollo247.in/specialty/f3dcf81b-e39d-4844-a5f0-ed7192d94b1a-1718361900653.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max",
      specialty: "Surgical Gastroenterology",
      description: "Surgical treatment for GI diseases"
    },
    {
      icons: "https://images.apollo247.in/specialty/cbc11a69-397f-4478-b526-ba9820f3d652-1718394144943.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max",
      specialty: "Infectious Disease",
      description: "Treatment of contagious and infectious diseases"
    },
    {
      icons: "https://images.apollo247.in/specialty/6147312b-0e6b-4b2e-a20c-991243a85625-1718394692716.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max",
      specialty: "General & Laparoscopic Surgeon",
      description: "Specialist in minimal access techniques"
    },
    {
      icons: "https://images.apollo247.in/specialties/ic_ent.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max",
      specialty: "Psychology",
      description: "Specialist in mental processes and behavior"
    },
    {
      icons: "https://images.apollo247.in/specialty/8ab7711b-cf37-41f8-b610-a1a4afdc49c9-1718394299540.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max",
      specialty: "Medical Oncology",
      description: "Cancer diagnosis and treatment specialist"
    },
    {
      icons: "https://images.apollo247.in/specialty/556c709b-bde6-4b81-becd-3e809ec2d682-1718393677886.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max",
      specialty: "Diabetology",
      description: "Diabetes management and treatment expert"
    },
    {
      icons: "https://images.apollo247.in/specialty/4ce59e16-e22b-4059-9cae-365408e34b8c-1718393604945.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max",
      specialty: "Dentist",
      description: "Oral health and dental care specialist"
    },
    {
      icons: "https://images.apollo247.in/specialty/4ce59e16-e22b-4059-9cae-365408e34b8c-1718393604945.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max",
      specialty: "Dentist",
      description: "Oral health and dental care specialist"
    },
    {
      icons: "https://images.apollo247.in/specialty/4ce59e16-e22b-4059-9cae-365408e34b8c-1718393604945.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max",
      specialty: "Dentist",
      description: "Oral health and dental care specialist"
    },
    {
      icons: "https://images.apollo247.in/specialty/4ce59e16-e22b-4059-9cae-365408e34b8c-1718393604945.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max",
      specialty: "Dentist",
      description: "Oral health and dental care specialist"
    },
    {
      icons: "https://images.apollo247.in/specialty/4ce59e16-e22b-4059-9cae-365408e34b8c-1718393604945.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max",
      specialty: "Dentist",
      description: "Oral health and dental care specialist"
    },

  ];

  // For mobile carousel navigation
  const itemsPerPage = 4;
  const pageCount = Math.ceil(specialties.length / itemsPerPage);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % pageCount);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + pageCount) % pageCount);
  };

  const handleSpecialtyClick = (specialty) => {
    console.log(`Selected specialty: ${specialty}`);
    // Add navigation or modal functionality here
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Browse by Specialties</h2>
          <p className="text-gray-600">Find the right specialist for your specific health needs</p>
        </div>
        {isMobile && (
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className="bg-white rounded-full p-3 shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-300"
              aria-label="Previous specialty"
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <button
              onClick={handleNext}
              className="bg-white rounded-full p-3 shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-300"
              aria-label="Next specialty"
            >
              <ChevronRight size={20} className="text-gray-600" />
            </button>
          </div>
        )}
      </div>
      
      {/* Desktop view - Two rows grid layout */}
      <div className="hidden md:grid grid-cols-6 lg:grid-cols-12 gap-4">
        {specialties.map((specialty, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-xl hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer"
            onMouseEnter={() => setHoveredId(index)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => handleSpecialtyClick(specialty.specialty)}
          >
            <div className="p-4 flex flex-col items-center text-center h-full">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm">
                <img src={specialty.icons} alt={specialty.specialty} className="w-8 h-8" />
              </div>
              <h3 className="text-xs font-medium text-gray-800">
                {specialty.specialty}
              </h3>
            </div>
          </div>
        ))}
      </div>
      
      {/* Mobile carousel view */}
      <div className="md:hidden relative">
        <div className="overflow-hidden">
          <div
            className="flex gap-4 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {Array.from({ length: pageCount }).map((_, pageIndex) => (
              <div key={`page-${pageIndex}`} className="flex gap-4 min-w-full">
                {specialties
                  .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                  .map((specialty, specIndex) => (
                    <div
                      key={`mobile-${pageIndex}-${specIndex}`}
                      className="bg-gray-50 rounded-xl w-1/2 flex-shrink-0 cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => handleSpecialtyClick(specialty.specialty)}
                    >
                      <div className="p-4 flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-2 shadow-sm">
                          <img src={specialty.icons} alt={specialty.specialty} className="w-6 h-6" />
                        </div>
                        <h3 className="text-xs font-medium text-gray-800">
                          {specialty.specialty}
                        </h3>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
        
        {/* Mobile pagination dots */}
        <div className="flex justify-center mt-4 gap-1">
          {Array.from({ length: pageCount }).map((_, index) => (
            <button
              key={`dot-${index}`}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentIndex === index ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}