import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Upload, 
  FileText, 
  Image, 
  Trash2, 
  Eye, 
  Download, 
  Search, 
  Plus,
  X,
  Calendar,
  User,
  AlertCircle,
  CheckCircle,
  Camera,
  File,
  Pill
} from 'lucide-react';

const PrescriptionUpload = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [dragActive, setDragActive] = useState(false);
  const queryClient = useQueryClient();

  // Fetch prescriptions query
  const { data: prescriptions = [], isLoading, error } = useQuery({
    queryKey: ['prescriptions'],
    queryFn: async () => {
      // You can implement a GET endpoint later if needed
      return [];
    },
    enabled: activeTab === 'manage'
  });

  // Upload prescription mutation
  const uploadMutation = useMutation({
    mutationFn: async (imageFile) => {
      const formData = new FormData();
      formData.append('image', imageFile);
      const token = localStorage.getItem('smartmeditoken');

      const response = await fetch('https://medisawabackend.onrender.com/api/v1/doctors/addReceipt', {
        method: 'POST',
        body: formData,
        headers: {
          // Add authorization header if needed
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      return response.json();
    },
    onSuccess: (data) => {
      // Invalidate and refetch prescriptions
      queryClient.invalidateQueries({ queryKey: ['prescriptions'] });
    },
    onError: (error) => {
      console.error('Upload error:', error);
    }
  });

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    handleFileUpload(files);
  };

  const handleFileUpload = (files) => {
    // Filter for image files only
    const imageFiles = files.filter(file => file.type.startsWith('image/') || file.type === 'application/pdf');
    
    imageFiles.forEach(file => {
      uploadMutation.mutate(file);
    });
  };

  const getFileIcon = (name) => {
    return name.includes('.pdf') ? <FileText className="w-5 h-5 text-red-500" /> : <Image className="w-5 h-5 text-blue-500" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">UPLOAD PRESCRIPTIONS</h1>
        </div>

        {/* Upload Tab */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Upload Options */}
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Choose from the following to upload prescription:
            </h3>
            
            <div className="space-y-4">
              <label className="w-full">
                <div className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl cursor-pointer flex items-center justify-center gap-3 transition-colors font-medium">
                  <Camera className="w-5 h-5" />
                  CHOOSE FROM GALLERY
                </div>
                <input 
                  type="file" 
                  multiple 
                  accept="image/*,.pdf" 
                  onChange={handleFileInput} 
                  className="hidden"
                  disabled={uploadMutation.isPending}
                />
              </label>

              <div className="text-center text-gray-500 font-medium">OR</div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-colors font-medium">
                <File className="w-5 h-5" />
                SELECT FROM E-PRESCRIPTION
              </button>
            </div>

            {/* Upload Area */}
            <div className="mt-6">
              Preview Uploaded Prescriptions
            </div>
{/* Upload Status */}
        {(uploadMutation.isPending || uploadMutation.isSuccess || uploadMutation.isError) && (
          <div className="mt-6 bg-white rounded-2xl shadow-sm border p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Upload Status</h3>
            <div className="space-y-3">
              {uploadMutation.isPending && (
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                  <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <div>
                    <div className="font-medium text-blue-900">Uploading prescription...</div>
                    <div className="text-sm text-blue-600">Please wait while we process your file</div>
                  </div>
                </div>
              )}
              
              {uploadMutation.isSuccess && (
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-blue-900">Upload successful!</div>
                    <div className="text-sm text-blue-600">Your prescription has been uploaded successfully</div>
                  </div>
                </div>
              )}
              
              {uploadMutation.isError && (
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <div>
                    <div className="font-medium text-red-900">Upload failed</div>
                    <div className="text-sm text-red-600">
                      {uploadMutation.error?.message || 'An error occurred while uploading'}
                    </div>
                  </div>
                  <button 
                    onClick={() => uploadMutation.reset()}
                    className="ml-auto p-1 text-red-500 hover:bg-red-100 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
          </div>

          {/* Middle Column - Requirements */}
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Make sure the prescription you upload contains the following elements:
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Doctor Details */}
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-sm font-medium text-gray-900">Doctor Details</div>
              </div>

              {/* Date of Prescription */}
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-sm font-medium text-gray-900">Date of Prescription</div>
              </div>

              {/* Patient Details */}
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="w-8 h-8 text-orange-600" />
                </div>
                <div className="text-sm font-medium text-gray-900">Patient Details</div>
              </div>

              {/* Medicine Details */}
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Pill className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-sm font-medium text-gray-900">Medicine Details</div>
              </div>
            </div>

            {/* File Size */}
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold text-lg">10 MB</span>
              </div>
              <div className="text-sm font-medium text-gray-900">Maximum File Size</div>
            </div>

            {/* Warning */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-orange-800">
                <em>Our pharmacist will dispense medicines only if the prescription is valid & it meets all government regulations.</em>
              </div>
            </div>
          </div>

          {/* Right Column - Sample Prescription */}
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              View Sample Prescription below:
            </h3>
            
            <div className="bg-white border-2 border-gray-200 rounded-xl p-4 relative">
              {/* Sample prescription content */}
              <div className="bg-blue-50 rounded-lg p-3 mb-4">
                <div className="text-sm font-semibold text-blue-900">Dr. Nidhi Sharma</div>
                <div className="text-xs text-blue-700">Name of the Hospital/Clinic</div>
                <div className="text-xs text-blue-700">Address of Hospital/Clinic</div>
                <div className="text-xs text-blue-700">Regd. No. 124565</div>
              </div>
              
              <div className="bg-blue-100 rounded-lg p-2 mb-4 flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                <div className="text-sm font-medium text-blue-900">Doctor's name & Clinic details</div>
                <div className="text-xs text-blue-600 ml-auto">14.10.2020</div>
              </div>

              <div className="space-y-2 text-sm text-blue-900 mb-4">
                <div className="flex justify-between">
                  <span>Name: Arjun</span>
                  <span>Age: 27</span>
                </div>
                <div>Address: ...</div>
              </div>

              <div className="text-sm text-blue-900 mb-4">
                <div>Tab Ozoref 12 mg</div>
                <div>Tab Betacap TR 40mg 6 AM</div>
              </div>

              <div className="flex justify-end">
                <div className="text-right">
                  <div className="text-sm font-medium text-blue-900">Doctor's</div>
                  <div className="text-xs text-blue-700">signature</div>
                </div>
              </div>

              {/* Arrow pointing to next slide */}
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Notice */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            * As Per Govt. Regulations We Dispense Full Stripe of Medicines
          </p>
        </div>

        
      </div>
    </div>
  );
};

export default PrescriptionUpload;