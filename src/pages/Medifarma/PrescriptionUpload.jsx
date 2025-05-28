import { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function PrescriptionUpload() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadMethod, setUploadMethod] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setValidationErrors(['File size exceeds 10MB limit']);
        return;
      }
      
      setIsUploading(true);
      
      // Simulate upload
      setTimeout(() => {
        setUploadedFile(file);
        setValidationErrors([]);
        setIsUploading(false);
        validatePrescription(file);
      }, 1500);
    }
  };

  const validatePrescription = (file) => {
    // This would normally be server-side validation
    // Simulating a validation check
    const errors = [];
    
    // Randomly determine if validation passes for demo purposes
    const hasAllDetails = Math.random() > 0.3;
    
    if (!hasAllDetails) {
      errors.push('Missing required prescription elements');
    }
    
    setValidationErrors(errors);
    if (errors.length === 0) {
      setUploadSuccess(true);
    }
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setUploadMethod(null);
    setValidationErrors([]);
    setUploadSuccess(false);
  };

  const handleGalleryClick = () => {
    setUploadMethod('gallery');
    document.getElementById('file-upload').click();
  };

  const handleEPrescriptionClick = () => {
    setUploadMethod('ePrescription');
    // Simulating e-prescription selection
    setIsUploading(true);
    setTimeout(() => {
      setUploadedFile({
        name: 'E-Prescription-89721.pdf',
        type: 'application/pdf',
        size: 2.4 * 1024 * 1024
      });
      setIsUploading(false);
      setValidationErrors([]);
      setUploadSuccess(true);
    }, 1500);
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? 1 : 0));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? 1 : 0));
  };

  const submitPrescription = () => {
    if (validationErrors.length === 0 && uploadedFile) {
      // Simulate submission
      alert('Prescription submitted successfully!');
    }
  };

  const renderUploadArea = () => {
    if (isUploading) {
      return (
        <div className="p-10 text-center">
          <div className="w-16 h-16 border-4 border-t-blue-600 border-b-blue-300 border-l-blue-300 border-r-blue-300 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Uploading prescription...</p>
        </div>
      );
    }
    
    if (uploadedFile) {
      return (
        <div className="p-4">
          <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg mb-4">
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <FileText className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="font-medium">{uploadedFile.name || 'Prescription.pdf'}</p>
                <p className="text-sm text-gray-500">
                  {uploadedFile.size ? `${(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB` : 'File uploaded'}
                </p>
              </div>
            </div>
            <button 
              onClick={resetUpload}
              className="p-1 hover:bg-gray-200 rounded-full"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
          
          {validationErrors.length > 0 ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <div className="flex items-center">
                <AlertCircle className="text-red-500 mr-2" />
                <p className="text-red-700 font-medium">Validation Error</p>
              </div>
              <ul className="ml-6 mt-1 text-sm text-red-600 list-disc">
                {validationErrors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
              <button 
                onClick={resetUpload}
                className="mt-2 text-sm text-blue-600 hover:text-blue-800"
              >
                Try again
              </button>
            </div>
          ) : uploadSuccess ? (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
              <div className="flex">
                <CheckCircle className="text-green-500 mr-2" />
                <div>
                  <p className="text-green-700 font-medium">Valid Prescription</p>
                  <p className="text-sm text-green-600">All required elements verified</p>
                </div>
              </div>
            </div>
          ) : null}

          {uploadSuccess && (
            <button 
              onClick={submitPrescription}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded transition duration-200"
            >
              Proceed with this Prescription
            </button>
          )}
        </div>
      );
    }
    
    return (
      <div className="p-8 flex flex-col items-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <FileText size={40} className="text-gray-400" />
        </div>
        <p className="text-gray-500 text-center mb-6">Uploaded Prescriptions will be shown here</p>
        <input 
          type="file" 
          id="file-upload" 
          accept=".jpg,.jpeg,.png,.pdf" 
          className="hidden" 
          onChange={handleFileChange}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left Section */}
          <div className="w-full lg:w-1/3 p-8 border-r border-gray-200">
            <h2 className="text-lg font-medium mb-6">Choose from the following to upload prescription:</h2>
            
            <button 
              onClick={handleGalleryClick}
              className={`w-full flex items-center justify-center gap-2 bg-teal-800 text-white p-4 rounded mb-4 hover:bg-teal-700 transition ${uploadMethod === 'gallery' ? 'ring-2 ring-offset-2 ring-teal-600' : ''}`}
            >
              <Upload size={20} />
              <span>CHOOSE FROM GALLERY</span>
            </button>
            
            <div className="text-center my-4 text-gray-500">OR</div>
            
            <button 
              onClick={handleEPrescriptionClick}
              className={`w-full flex items-center justify-center gap-2 bg-teal-800 text-white p-4 rounded hover:bg-teal-700 transition ${uploadMethod === 'ePrescription' ? 'ring-2 ring-offset-2 ring-teal-600' : ''}`}
            >
              <FileText size={20} />
              <span>SELECT FROM E-PRESCRIPTION</span>
            </button>
            
            {renderUploadArea()}
          </div>
          
          {/* Right Section */}
          <div className="w-full lg:w-2/3 p-8">
            <h2 className="text-lg font-medium mb-6">Make sure the prescription you upload contains the following elements:</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              {/* Doctor Details */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-teal-200 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-teal-600"></div>
                  </div>
                </div>
                <p className="font-medium text-center">Doctor Details</p>
              </div>
              
              {/* Date of Prescription */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <div className="w-12 h-16 bg-white rounded border-2 border-blue-300 flex flex-col items-center justify-center">
                    <div className="w-8 h-1 bg-blue-600 mb-1"></div>
                    <div className="w-8 h-1 bg-blue-300 mb-1"></div>
                    <div className="w-6 h-1 bg-blue-300"></div>
                  </div>
                </div>
                <p className="font-medium text-center">Date of Prescription</p>
              </div>
              
              {/* Patient Details */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-yellow-200 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-yellow-500"></div>
                  </div>
                </div>
                <p className="font-medium text-center">Patient Details</p>
              </div>
              
               {/* Medicine Details */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-2">
                  <div className="w-10 h-14 bg-white rounded-lg border-2 border-red-300 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-red-500"></div>
                  </div>
                </div>
                <p className="font-medium text-center">Medicine Details</p>
              </div>
              
              {/* Maximum File Size */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                  <div className="text-sm font-bold text-purple-700">10 MB</div>
                </div>
                <p className="font-medium text-center">Maximum File Size</p>
              </div>
            </div>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
              <div className="flex">
                <AlertCircle className="text-yellow-500 mr-2 flex-shrink-0" />
                <p className="text-sm text-gray-700">
                  Our pharmacist will dispense medicines only if the prescription is valid & it meets all government regulations.
                </p>
              </div>
            </div>
            
            <div className="relative bg-gray-100 rounded-lg p-4">
              <h3 className="text-lg font-medium mb-4">View Sample Prescription below:</h3>
              
              <div className="relative bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
                {/* Sample Prescription Carousel */}
                <div className="overflow-hidden">
                  <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
                    {/* First Slide */}
                    <div className="min-w-full">
                      <div className="mb-4">
                        <p className="font-medium">Dr. Nidhi Sharma</p>
                        <p className="text-sm text-gray-600">Name of the Hospital/Clinic</p>
                        <p className="text-sm text-gray-600">Address of Hospital/Clinic</p>
                        <p className="text-sm text-gray-600">Reg. No. 23652</p>
                      </div>
                      
                      <div className="flex justify-between mb-6">
                        <div className="font-medium text-blue-800">Patient: Maria <span className="text-gray-600">24F</span></div>
                        <div className="italic text-gray-600">15.10.2020</div>
                      </div>
                      
                      <div className="mb-6">
                        <div className="flex items-center mb-2">
                          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                            <span className="text-xs font-bold text-green-700">1</span>
                          </div>
                          <p className="font-medium">Tab Cefixime 200mg</p>
                        </div>
                        <p className="ml-8 text-gray-700">1-0-1 After meals for 5 days</p>
                      </div>
                      
                      <div className="text-right mt-8">
                        <div className="inline-block border-b-2 border-blue-400 pb-1 px-4">
                          <p className="italic text-blue-600">Dr. Nidhi S</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Second Slide */}
                    <div className="min-w-full">
                      <div className="mb-6">
                        <div className="flex items-center mb-2">
                          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                            <span className="text-xs font-bold text-green-700">2</span>
                          </div>
                          <p className="font-medium">Tab Paracetamol 500mg</p>
                        </div>
                        <p className="ml-8 text-gray-700">1-1-1 After meals for 3 days</p>
                      </div>
                      
                      <div className="mb-6">
                        <div className="flex items-center mb-2">
                          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                            <span className="text-xs font-bold text-green-700">3</span>
                          </div>
                          <p className="font-medium">Syp. Ambroxol 30mg</p>
                        </div>
                        <p className="ml-8 text-gray-700">2 tsp thrice daily for 5 days</p>
                      </div>
                      
                      <div className="text-right mt-8">
                        <div className="inline-block border-b-2 border-blue-400 pb-1 px-4">
                          <p className="italic text-blue-600">Dr. Nidhi S</p>
                        </div>
                        <div className="mt-2">
                          <p className="text-xs text-purple-600">Doctor's Stamp</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Carousel Controls */}
                <button 
                  onClick={prevSlide} 
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100"
                >
                  <ChevronLeft size={18} />
                </button>
                <button 
                  onClick={nextSlide} 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100"
                >
                  <ChevronRight size={18} />
                </button>
                
                {/* Pagination Indicator */}
                <div className="flex justify-center mt-4 gap-2">
                  <div className={`w-2 h-2 rounded-full ${activeSlide === 0 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                  <div className={`w-2 h-2 rounded-full ${activeSlide === 1 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-3 text-center text-xs text-gray-500 border-t border-gray-200">
          *As Per Govt. Regulations We Dispense Full Strips of Medicines
        </div>
      </div>
    </div>
  );
}