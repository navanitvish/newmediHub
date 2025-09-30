import { useState, useRef, useEffect } from 'react';
import { 
  Heart, Shield, Users, Award, Download, QrCode, Phone, Mail, MapPin,
  Activity, ShieldCheck, Stethoscope, Calendar, Star, Camera,
  Edit3, RefreshCw, CreditCard, Zap, Globe, CheckCircle, X, User,
  Building, FileText, UserCheck
} from 'lucide-react';
import { useGetQuery } from "../../api/apiCall";
import API_ENDPOINTS from "../../api/apiEndpoint";
import Loading from './../../components/UI/Loading';
import useAuth from "../../hooks/useAuth";

export default function SmartCareCard() {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cardType: '',
    address: '',
    dateOfBirth: '',
    bloodGroup: '',
    emergencyContact: '',
    occupation: ''
  });
  const [plans, setPlans] = useState([]);
  const cardRef = useRef(null);
  const fileInputRef = useRef(null);
  const { user } = useAuth();
  const userData = user?.result || {};

  // API calls
  const {
    data: cardsData,
    isLoading: cardsLoading,
    error: cardsError,
    refetch: refetchCards
  } = useGetQuery(`${API_ENDPOINTS.CARDS.GET_ALL_MEMBERSHIP}`);

  // Mock member data
  const memberData = {
    name: userData.name || 'John Doe',
    memberId: 'SC-2025-4391',
    phone: userData.mobile || '+91 98765 43210',
    email: userData.email || 'member@smartcare.com',
    address: userData.address || '123 Main Street, City, Country',
    validTill: '04/2028',
    joinDate: 'Jan 2025',
    bloodGroup: 'O+',
    dateOfBirth: '15/08/1990'
  };

  // Transform API data
  useEffect(() => {
    if (cardsData?.data) {
      const colorSchemes = {
        basic: { color: 'from-cyan-400 to-blue-600', icon: <Heart className="h-5 w-5" /> },
        family: { color: 'from-emerald-400 to-green-600', icon: <Users className="h-5 w-5" /> },
        premium: { color: 'from-violet-500 to-indigo-700', icon: <Shield className="h-5 w-5" /> },
        platinum: { color: 'from-rose-500 to-purple-700', icon: <Award className="h-5 w-5" /> }
      };

      const transformedPlans = cardsData.data.map((card, index) => {
        const scheme = colorSchemes[card.type] || colorSchemes[Object.keys(colorSchemes)[index % 4]];
        return {
          id: card._id,
          name: card.title,
          type: card.type,
          ...scheme,
          price: `₹${card.price}`,
          features: card.features || [],
          description: card.description,
          validThru: card.validThru,
          isActive: card.isActive
        };
      });

      setPlans(transformedPlans);
      const activeCard = transformedPlans.find(plan => plan.isActive) || transformedPlans[0];
      if (activeCard) setSelectedPlan(activeCard.id);
    }
  }, [cardsData]);

  // Loading and error states
  if (cardsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loading />
          <p className="mt-4 text-gray-600">Loading healthcare plans...</p>
        </div>
      </div>
    );
  }

  if (cardsError || !plans.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-md">
          <Activity className="h-12 w-12 mx-auto mb-4 text-red-500" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            {cardsError ? 'Unable to Load Plans' : 'No Plans Available'}
          </h2>
          <p className="text-gray-600 mb-6">
            {cardsError?.message || 'No healthcare plans are currently available.'}
          </p>
          <button
            onClick={() => refetchCards()}
            className="flex items-center mx-auto px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  const currentPlan = plans.find(plan => plan.id === selectedPlan) || plans[0];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsApplying(true);
    
    try {
      // Validate required fields
      const requiredFields = ['name', 'email', 'phone', 'cardType', 'address'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
        setIsApplying(false);
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert(`Application submitted successfully for ${currentPlan.name} plan! We'll contact you within 24 hours.`);
      setShowApplicationForm(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        cardType: '',
        address: '',
        dateOfBirth: '',
        bloodGroup: '',
        emergencyContact: '',
        occupation: ''
      });
    } catch (error) {
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsApplying(false);
    }
  };

  // Apply for plan - show form
  const handleApply = () => {
    setFormData(prev => ({
      ...prev,
      cardType: currentPlan.name,
      name: userData.name || '',
      email: userData.email || '',
      phone: userData.mobile || ''
    }));
    setShowApplicationForm(true);
  };

  // Download card
  const downloadCard = async () => {
    if (!currentPlan.isActive) return;
    
    setIsDownloading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 1000;
      canvas.height = 630;
      
      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#8b5cf6');
      gradient.addColorStop(1, '#4338ca');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add text
      ctx.fillStyle = 'white';
      ctx.font = 'bold 36px Arial';
      ctx.fillText('Smart Care Card', 60, 100);
      ctx.font = '28px Arial';
      ctx.fillText(memberData.name, 60, 180);
      ctx.font = '20px Arial';
      ctx.fillText(`Member ID: ${memberData.memberId}`, 60, 230);
      ctx.fillText(`Plan: ${currentPlan.name}`, 60, 280);
      ctx.fillText(`Valid Till: ${memberData.validTill}`, 60, 330);
      
      const link = document.createElement('a');
      link.download = `smart-care-card-${memberData.memberId}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
      
    } catch (error) {
      alert('Failed to download card. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Activity className="h-10 w-10 text-indigo-600 mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Smart Care Card 2025
            </h1>
          </div>
          <p className="text-gray-600 text-lg mb-4">Next-generation healthcare at your fingertips</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <div className="inline-flex items-center px-4 py-2 bg-indigo-100 rounded-full">
              <ShieldCheck className="h-4 w-4 text-indigo-600 mr-2" />
              <span className="text-indigo-600 font-medium">Trusted by 10M+</span>
            </div>
            <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full">
              <Globe className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-green-600 font-medium">Global Coverage</span>
            </div>
          </div>
        </div>

        {/* Plan Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {plans.map(plan => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              disabled={!plan.isActive}
              className={`group flex flex-col items-center px-6 py-4 rounded-xl transition-all duration-300 ${
                selectedPlan === plan.id
                  ? `bg-gradient-to-r ${plan.color} text-white shadow-lg`
                  : plan.isActive 
                    ? 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60'
              }`}
            >
              <div className={`p-2 rounded-full mb-2 ${
                selectedPlan === plan.id ? 'bg-white/20' : 'bg-indigo-100'
              }`}>
                <div className={selectedPlan === plan.id ? 'text-white' : 'text-indigo-600'}>
                  {plan.icon}
                </div>
              </div>
              <span className="font-bold">{plan.name}</span>
              <span className={`text-sm ${selectedPlan === plan.id ? 'text-white/80' : 'text-gray-500'}`}>
                {plan.price}/month
              </span>
              {!plan.isActive && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  Inactive
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-start">
          {/* Card Display */}
          <div className="flex flex-col items-center">
            <div className="relative w-[400px] h-[250px] mb-6">
              <div 
                className="relative w-full h-full transition-transform duration-700 cursor-pointer hover:scale-105"
                onClick={() => setIsFlipped(!isFlipped)}
                ref={cardRef}
              >
                {/* Front Side */}
                <div className={`absolute w-full h-full ${isFlipped ? 'opacity-0' : 'opacity-100'} transition-opacity duration-700`}>
                  <div className={`w-full h-full bg-gradient-to-br ${currentPlan.color} rounded-2xl shadow-xl p-6 text-white relative overflow-hidden ${!currentPlan.isActive ? 'opacity-75' : ''}`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 right-4 w-24 h-24 border border-white rounded-full"></div>
                      <div className="absolute bottom-4 left-4 w-16 h-16 border border-white rounded-full"></div>
                    </div>
                    
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      {/* Header */}
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                            <Stethoscope className="h-5 w-5" />
                          </div>
                          <div>
                            <h2 className="text-xl font-bold">Smart Care</h2>
                            <div className="flex items-center">
                              <span className="text-white/90 text-sm">{currentPlan.name}</span>
                              <div className={`w-2 h-2 ${currentPlan.isActive ? 'bg-green-400' : 'bg-red-400'} rounded-full ml-2`}></div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{currentPlan.price}</div>
                          <div className="text-white/80 text-xs">per month</div>
                        </div>
                      </div>
                      
                      {/* Member Info */}
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                          {userData?.image ? (
                            <img src={userData.image} alt="Profile" className="w-full h-full rounded-full object-cover" />
                          ) : (
                            <Camera className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <p className="text-white/80 text-xs">Member</p>
                          <p className="font-bold">{memberData.name}</p>
                          <p className="text-white/70 text-xs">Since {memberData.joinDate}</p>
                        </div>
                      </div>
                      
                      {/* Footer */}
                      <div className="flex justify-between items-end">
                        <div className="flex space-x-6">
                          <div>
                            <p className="text-white/70 text-xs">Member ID</p>
                            <p className="font-mono text-sm">{memberData.memberId}</p>
                          </div>
                          <div>
                            <p className="text-white/70 text-xs">Valid Till</p>
                            <p className="text-sm">{memberData.validTill}</p>
                          </div>
                        </div>
                        <div className={`${currentPlan.isActive ? 'bg-green-500/25' : 'bg-red-500/25'} px-3 py-1 rounded-full`}>
                          <p className="text-xs font-bold">
                            {currentPlan.isActive ? 'ACTIVE' : 'INACTIVE'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back Side */}
                <div className={`absolute w-full h-full ${!isFlipped ? 'opacity-0' : 'opacity-100'} transition-opacity duration-700`}>
                  <div className="w-full h-full bg-white rounded-2xl shadow-xl p-6 border">
                    <div className="h-full flex flex-col">
                      {/* Header */}
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="text-indigo-600 font-bold text-lg">Member Info</h3>
                          <p className="text-gray-500 text-sm">Emergency details</p>
                        </div>
                        <QrCode className="h-16 w-16 text-indigo-600" />
                      </div>
                      
                      {/* Contact Info */}
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                          <Phone className="h-4 w-4 text-indigo-600 mr-3" />
                          <div>
                            <p className="text-xs text-gray-500">Phone</p>
                            <p className="font-medium text-sm">{memberData.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                          <Mail className="h-4 w-4 text-indigo-600 mr-3" />
                          <div>
                            <p className="text-xs text-gray-500">Email</p>
                            <p className="font-medium text-sm">{memberData.email}</p>
                          </div>
                        </div>
                        <div className="p-2 bg-red-50 rounded-lg">
                          <h4 className="text-red-700 font-medium text-sm mb-1">Emergency</h4>
                          <p className="text-red-600 text-xs">Blood: {memberData.bloodGroup} | DOB: {memberData.dateOfBirth}</p>
                        </div>
                      </div>
                      
                      <div className="text-center pt-3 border-t">
                        <p className="text-xs text-gray-400">© 2025 Smart Care • Confidential</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Controls */}
            <div className="flex flex-col items-center space-y-4">
              <p className="text-gray-500 text-sm">Click card to flip and view details</p>
              
              <div className="flex space-x-3">
                <button
                  onClick={downloadCard}
                  disabled={isDownloading || !currentPlan.isActive}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDownloading ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4 mr-2" />
                  )}
                  {isDownloading ? 'Generating...' : 'Download'}
                </button>
                
                <button
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="flex items-center px-4 py-3 bg-white text-gray-700 rounded-xl hover:bg-gray-50 shadow border"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Flip
                </button>
              </div>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
            />
          </div>

          {/* Plan Details */}
          <div className="space-y-6">
            {/* Main Plan Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${currentPlan.color} rounded-xl flex items-center justify-center text-white`}>
                    {currentPlan.icon}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-2xl font-bold text-gray-800">{currentPlan.name}</h3>
                      {!currentPlan.isActive && (
                        <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full">
                          Inactive
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600">{currentPlan.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {currentPlan.price}
                  </div>
                  <div className="text-gray-500">per month</div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="font-bold">24/7 Access</p>
                  <p className="text-gray-600 text-sm">Round the clock</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="font-bold">1500+ Hospitals</p>
                  <p className="text-gray-600 text-sm">Network coverage</p>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-800 mb-3">Plan Benefits</h4>
                {currentPlan.features?.length > 0 ? (
                  <div className="space-y-2">
                    {currentPlan.features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-center p-2 bg-gray-50 rounded-lg">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <Shield className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Contact support for detailed benefits</p>
                  </div>
                )}
              </div>

              {/* Apply Button */}
              <button 
                onClick={handleApply}
                disabled={isApplying}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform ${
                  currentPlan.isActive 
                    ? `bg-gradient-to-r ${currentPlan.color} text-white hover:shadow-xl hover:scale-105`
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isApplying ? (
                  <>
                    <RefreshCw className="inline h-5 w-5 mr-2 animate-spin" />
                    Applying...
                  </>
                ) : (
                  <>
                    <CheckCircle className="inline h-5 w-5 mr-2" />
                    Apply for {currentPlan.name}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Application Form Modal */}
        {showApplicationForm && (
          <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Form Header */}
              <div className={`bg-gradient-to-r ${currentPlan.color} p-6 text-white rounded-t-2xl`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      {currentPlan.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Apply for {currentPlan.name}</h2>
                      <p className="text-white/90">Fill out the form to get started</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowApplicationForm(false)}
                    className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6">
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                  <div className="flex">
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">
                        <strong>Selected Plan:</strong> {currentPlan.name} - {currentPlan.price}/month
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Required Fields Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <UserCheck className="h-5 w-5 mr-2 text-indigo-600" />
                      Personal Information (Required)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-colors"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-colors"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Enter your phone number"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-colors"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Type *
                        </label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            name="cardType"
                            value={formData.cardType}
                            onChange={handleInputChange}
                            placeholder="Selected plan"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 outline-none"
                            readOnly
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="Enter your complete address"
                          rows="3"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-colors resize-none"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Optional Fields Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-green-600" />
                      Additional Information (Optional)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Blood Group
                        </label>
                        <select
                          name="bloodGroup"
                          value={formData.bloodGroup}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-colors"
                        >
                          <option value="">Select blood group</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Emergency Contact
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <input
                            type="tel"
                            name="emergencyContact"
                            value={formData.emergencyContact}
                            onChange={handleInputChange}
                            placeholder="Emergency contact number"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Occupation
                        </label>
                        <div className="relative">
                          <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            name="occupation"
                            value={formData.occupation}
                            onChange={handleInputChange}
                            placeholder="Your occupation"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
                    <button
                      type="button"
                      onClick={() => setShowApplicationForm(false)}
                      className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleFormSubmit}
                      disabled={isApplying}
                      className={`flex-1 py-3 px-6 bg-gradient-to-r ${currentPlan.color} text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {isApplying ? (
                        <>
                          <RefreshCw className="inline h-5 w-5 mr-2 animate-spin" />
                          Submitting Application...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="inline h-5 w-5 mr-2" />
                          Submit Application
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};