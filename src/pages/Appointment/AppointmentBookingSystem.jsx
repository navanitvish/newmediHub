import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AppointmentBookingSystem = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedService, setSelectedService] = useState(null);

  const steps = [
    { number: 1, name: 'Specialty', active: currentStep === 1 },
    { number: 2, name: 'Appointment Type', active: currentStep === 2 },
    { number: 3, name: 'Date & Time', active: currentStep === 3 },
    { number: 4, name: 'Basic Information', active: currentStep === 4 },
    { number: 5, name: 'Payment', active: currentStep === 5 },
    { number: 6, name: 'Confirmation', active: currentStep === 6 },
  ];

  const services = [
    { id: 1, name: 'Echocardiograms', price: 310 },
    { id: 2, name: 'Stress tests', price: 754 },
    { id: 3, name: 'Stress tests', price: 754 },
    { id: 4, name: 'Heart Catheterization', price: 150 },
    { id: 5, name: 'Echocardiograms', price: 200 },
    { id: 6, name: 'Echocardiograms', price: 200 },
  ];

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 bg-gray-50 rounded-lg shadow">
      {/* Steps Header */}
      <div className="mb-8 mt-28">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center">
                <div 
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    step.active ? 'bg-blue-500 text-white' : 
                    currentStep > step.number ? 'bg-blue-100 text-blue-500' : 'bg-gray-200 text-gray-500'
                  } font-bold`}
                >
                  {step.number}
                </div>
                <div className={`mt-2 text-sm ${
                  step.active ? 'text-blue-500 font-medium' : 'text-gray-500'
                }`}>
                  {step.name}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="w-full h-px bg-gray-300 flex-grow mx-2" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Doctor Info Card */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-blue-200 overflow-hidden">
              <img 
                src="/api/placeholder/150/150" 
                alt="Doctor"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="ml-4">
            <div className="flex items-center">
              <h2 className="text-lg font-bold">Dr. Michael Brown</h2>
              <div className="ml-2 flex items-center px-2 py-1 bg-orange-500 text-white text-xs rounded">
                <span>5.0</span>
              </div>
            </div>
            <div className="text-blue-600">Psychologist</div>
            <div className="flex items-center text-gray-600 text-sm mt-1">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              5th Street - 1011 W 5th St, Suite 120, Austin, TX 78703
            </div>
          </div>
        </div>
      </div>

      {/* Step Content */}
      <motion.div 
        className="bg-white p-6 rounded-lg shadow-sm"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {currentStep === 1 && (
          <>
            <motion.div variants={itemVariants} className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Specialty</label>
              <div className="relative">
                <select 
                  className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="cardiology">Cardiology</option>
                  <option value="neurology">Neurology</option>
                  <option value="orthopedics">Orthopedics</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {services.map((service) => (
                  <div 
                    key={service.id} 
                    className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                      selectedService?.id === service.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                    onClick={() => handleServiceSelect(service)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{service.name}</h4>
                        <div className="text-gray-600 mt-1">${service.price}</div>
                      </div>
                      {selectedService?.id === service.id && (
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
        
        {/* Additional steps would be added here with their own content */}
        {currentStep === 2 && (
          <motion.div variants={itemVariants} className="text-center py-6">
            <h3 className="text-lg font-medium">Appointment Type Selection</h3>
            <p className="text-gray-600 mt-2">Choose between in-person or virtual appointment</p>
          </motion.div>
        )}
        
        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={handlePreviousStep}
            className={`flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg ${
              currentStep === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700'
            }`}
            disabled={currentStep === 1}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          
          <button
            onClick={handleNextStep}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {currentStep < steps.length ? (
              <>
                Select {steps[currentStep].name}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </>
            ) : (
              "Complete Booking"
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AppointmentBookingSystem;