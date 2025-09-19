import { useState, useRef, useEffect } from 'react';
import { 
  Heart, Shield, Users, Award, Download, QrCode, Phone, Mail, MapPin,
  Activity, ShieldCheck, Stethoscope, Calendar, Clock, Star, Camera,
  Edit3, RefreshCw, CreditCard, Zap, Globe, Smartphone
} from 'lucide-react';

// API integration
import { useGetQuery } from "../../api/apiCall";
import API_ENDPOINTS from "../../api/apiEndpoint";
import Loading from './../../components/UI/Loading';
import useAuth from "../../hooks/useAuth";


export default function SmartCareCard() {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
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

  // Mock member data (you can replace this with actual member API call)
  const memberData = {
    name: userData.name || 'John Doe',
    memberId: 'SC-2025-4391',
    phone: '+91 98765 43210',
    email: userData.email || '2Ss6b@example.com',
    address: userData.address || '123 Main Street, City, Country',
    validTill: '04/2028',
    joinDate: 'Jan 2025',
    emergencyContact: userData.mobile || '+91 98765 43210',
    bloodGroup: 'O+',
    dateOfBirth: '15/08/1990'
  };

  // Transform API data to match UI format
  useEffect(() => {
    if (cardsData && cardsData.data) {
      const transformedPlans = cardsData.data.map((card, index) => {
        // Define color schemes based on card type or index
        const colorSchemes = {
          basic: {
            color: 'from-cyan-400 via-blue-500 to-blue-600',
            accentColor: 'bg-cyan-500',
            icon: <Heart className="h-5 w-5" />
          },
          family: {
            color: 'from-emerald-400 via-teal-500 to-green-600',
            accentColor: 'bg-emerald-500',
            icon: <Users className="h-5 w-5" />
          },
          premium: {
            color: 'from-violet-500 via-purple-600 to-indigo-700',
            accentColor: 'bg-violet-600',
            icon: <Shield className="h-5 w-5" />
          },
          platinum: {
            color: 'from-rose-500 via-pink-600 to-purple-700',
            accentColor: 'bg-rose-600',
            icon: <Award className="h-5 w-5" />
          }
        };

        // Get color scheme based on card type or fallback to index
        const scheme = colorSchemes[card.type] || colorSchemes[Object.keys(colorSchemes)[index % 4]];

        return {
          id: card._id,
          name: card.title,
          type: card.type,
          ...scheme,
          price: `₹${card.price}`,
          period: 'monthly',
          features: card.features || [],
          hospitals: card.type === 'basic' ? '500+ hospitals' : 
                    card.type === 'family' ? '750+ hospitals' : 
                    card.type === 'premium' ? '1000+ hospitals' : 'Worldwide network',
          description: card.description,
          validThru: card.validThru,
          isActive: card.isActive,
          createdAt: card.createdAt,
          updatedAt: card.updatedAt
        };
      });

      setPlans(transformedPlans);
      
      // Set default selected plan to the first active plan or first plan
      const activeCard = transformedPlans.find(plan => plan.isActive) || transformedPlans[0];
      if (activeCard) {
        setSelectedPlan(activeCard.id);
      }
    }
  }, [cardsData]);

  // Loading state
  if (cardsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loading />
          <p className="mt-4 text-gray-600 text-lg">Loading your healthcare plans...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (cardsError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-md mx-auto">
          <div className="text-red-500 mb-4">
            <Activity className="h-12 w-12 mx-auto mb-4" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Unable to Load Plans</h2>
          <p className="text-gray-600 mb-6">
            {cardsError.message || 'Something went wrong while loading your healthcare plans.'}
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

  // No plans available
  if (!plans.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-md mx-auto">
          <div className="text-gray-400 mb-4">
            <CreditCard className="h-12 w-12 mx-auto mb-4" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">No Plans Available</h2>
          <p className="text-gray-600 mb-6">
            No healthcare plans are currently available. Please contact support or try again later.
          </p>
          <button
            onClick={() => refetchCards()}
            className="flex items-center mx-auto px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>
    );
  }

  const currentPlan = plans.find(plan => plan.id === selectedPlan) || plans[0];

  // Handle profile image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Download card function
  const downloadCard = async () => {
    setIsDownloading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create enhanced download with better graphics
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 1000;
      canvas.height = 630;
      
      // Create sophisticated gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      if (currentPlan.type === 'basic') {
        gradient.addColorStop(0, '#22d3ee');
        gradient.addColorStop(0.5, '#3b82f6');
        gradient.addColorStop(1, '#2563eb');
      } else if (currentPlan.type === 'family') {
        gradient.addColorStop(0, '#34d399');
        gradient.addColorStop(0.5, '#14b8a6');
        gradient.addColorStop(1, '#059669');
      } else if (currentPlan.type === 'premium') {
        gradient.addColorStop(0, '#8b5cf6');
        gradient.addColorStop(0.5, '#7c3aed');
        gradient.addColorStop(1, '#4338ca');
      } else {
        gradient.addColorStop(0, '#f43f5e');
        gradient.addColorStop(0.5, '#ec4899');
        gradient.addColorStop(1, '#7c2d12');
      }
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add decorative elements
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.beginPath();
      ctx.arc(800, 100, 120, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(150, 500, 80, 0, Math.PI * 2);
      ctx.fill();
      
      // Add text with better typography
      ctx.fillStyle = 'white';
      ctx.font = 'bold 36px Inter, Arial';
      ctx.fillText('Smart Care Card', 60, 100);
      
      ctx.font = '28px Inter, Arial';
      ctx.fillText(memberData.name, 60, 180);
      
      ctx.font = '20px Inter, Arial';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fillText(`Member ID: ${memberData.memberId}`, 60, 230);
      ctx.fillText(`Plan: ${currentPlan.name}`, 60, 280);
      ctx.fillText(`Valid Till: ${currentPlan.validThru || memberData.validTill}`, 60, 330);
      
      // Add plan badge
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.roundRect(60, 380, 200, 50, 25);
      ctx.fill();
      
      ctx.fillStyle = 'white';
      ctx.font = 'bold 18px Inter, Arial';
      ctx.fillText(currentPlan.isActive ? 'ACTIVE MEMBER' : 'INACTIVE', 80, 410);
      
      // Download
      const link = document.createElement('a');
      link.download = `smart-care-card-${memberData.memberId}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
      
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download card. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Activity className="h-12 w-12 text-indigo-600 mr-4" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Smart Care Card 2025
            </h1>
          </div>
          <p className="text-gray-600 text-xl mb-6">Next-generation healthcare, beautifully designed</p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="inline-flex items-center px-6 py-3 bg-indigo-100 rounded-full">
              <ShieldCheck className="h-5 w-5 text-indigo-600 mr-2" />
              <span className="text-indigo-600 font-semibold">Trusted by 10M+ members</span>
            </div>
            <div className="inline-flex items-center px-6 py-3 bg-green-100 rounded-full">
              <Globe className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-green-600 font-semibold">Global Coverage</span>
            </div>
            <div className="inline-flex items-center px-6 py-3 bg-blue-100 rounded-full">
              <Calendar className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-blue-600 font-semibold">{plans.length} Plans Available</span>
            </div>
          </div>
        </div>

        {/* Enhanced Plan Selector */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {plans.map(plan => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              disabled={!plan.isActive}
              className={`group relative flex flex-col items-center px-8 py-6 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                selectedPlan === plan.id
                  ? `bg-gradient-to-r ${plan.color} text-white shadow-2xl shadow-purple-500/25`
                  : plan.isActive 
                    ? 'bg-white text-gray-700 hover:bg-gray-50 shadow-lg hover:shadow-xl'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60'
              }`}
            >
              <div className={`p-3 rounded-full mb-3 ${
                selectedPlan === plan.id 
                  ? 'bg-white/20' 
                  : plan.isActive 
                    ? plan.accentColor 
                    : 'bg-gray-300'
              }`}>
                <div className={selectedPlan === plan.id ? 'text-white' : plan.isActive ? 'text-white' : 'text-gray-500'}>
                  {plan.icon}
                </div>
              </div>
              <span className="font-bold text-lg">{plan.name}</span>
              <span className={`text-sm ${
                selectedPlan === plan.id 
                  ? 'text-white/80' 
                  : plan.isActive 
                    ? 'text-gray-500' 
                    : 'text-gray-400'
              }`}>
                {plan.price}/{plan.period}
              </span>
              {!plan.isActive && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  Inactive
                </div>
              )}
              {selectedPlan === plan.id && plan.isActive && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Star className="h-3 w-3 text-white fill-current" />
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-start">
          {/* Enhanced Card Display */}
          <div className="flex flex-col items-center">
            <div className="relative w-[420px] h-[270px] mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
              <div 
                className="relative w-full h-full transition-all duration-700 cursor-pointer hover:scale-105"
                onClick={() => setIsFlipped(!isFlipped)}
                ref={cardRef}
              >
                {/* Enhanced Front Side */}
                <div className={`absolute w-full h-full ${isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-all duration-700`}>
                  <div className={`w-full h-full bg-gradient-to-br ${currentPlan.color} rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden ${!currentPlan.isActive ? 'opacity-75' : ''}`}>
                    {/* Sophisticated Background Pattern */}
                    <div className="absolute inset-0">
                      <div className="absolute top-6 right-6 w-32 h-32 border-2 border-white/10 rounded-full"></div>
                      <div className="absolute bottom-6 left-6 w-24 h-24 border-2 border-white/10 rounded-full"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-white/5 rounded-full"></div>
                      {/* Geometric patterns */}
                      <svg className="absolute top-4 left-4 w-20 h-20 opacity-10" viewBox="0 0 100 100">
                        <polygon points="50,5 95,90 5,90" fill="white" />
                      </svg>
                    </div>
                    
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      {/* Header Section */}
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4">
                            <Stethoscope className="h-6 w-6" />
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold">Smart Care</h2>
                            <div className="flex items-center">
                              <span className="text-white/90 text-sm font-medium">{currentPlan.name}</span>
                              <div className={`w-2 h-2 ${currentPlan.isActive ? 'bg-green-400' : 'bg-red-400'} rounded-full ml-2 ${currentPlan.isActive ? 'animate-pulse' : ''}`}></div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold">{currentPlan.price}</div>
                          <div className="text-white/80 text-sm">per {currentPlan.period}</div>
                        </div>
                      </div>
                      
                      {/* Member Section with Profile Image */}
                      <div className="flex items-center space-x-4 my-6">
                        <div className="relative">
                          {userData ? (
                            <img 
                              src={userData.image || "https://cdn-icons-png.flaticon.com/512/194/194915.png"} 
                              alt="Profile" 
                              className="w-16 h-16 rounded-full object-cover border-2 border-white/30"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/30">
                              <Camera className="h-6 w-6 text-white/70" />
                            </div>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              fileInputRef.current?.click();
                            }}
                            className="absolute -bottom-1 -right-1 w-6 h-6 bg-white text-indigo-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                          >
                            <Edit3 className="h-3 w-3" />
                          </button>
                        </div>
                        <div>
                          <p className="text-white/80 text-sm">Member</p>
                          <p className="text-xl font-bold">{memberData.name}</p>
                          <p className="text-white/70 text-sm">Since {memberData.joinDate}</p>
                        </div>
                      </div>
                      
                      {/* Footer Section */}
                      <div className="flex justify-between items-end">
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <p className="text-white/70 text-xs uppercase tracking-wide">Member ID</p>
                            <p className="font-mono text-sm font-medium">{memberData.memberId}</p>
                          </div>
                          <div>
                            <p className="text-white/70 text-xs uppercase tracking-wide">Valid Till</p>
                            <p className="font-medium">{currentPlan.validThru || memberData.validTill}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <div className={`${currentPlan.isActive ? 'bg-green-500/25' : 'bg-red-500/25'} backdrop-blur-sm px-4 py-2 rounded-full border ${currentPlan.isActive ? 'border-green-400/20' : 'border-red-400/20'}`}>
                            <p className="text-xs font-bold tracking-wide">
                              {currentPlan.isActive ? 'ACTIVE MEMBER' : 'INACTIVE'}
                            </p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Zap className="h-4 w-4" />
                            <span className="text-xs font-medium capitalize">{currentPlan.type} Access</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Back Side */}
                <div className={`absolute w-full h-full ${!isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-all duration-700`}>
                  <div className="w-full h-full bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                    <div className="h-full flex flex-col">
                      {/* Header */}
                      <div className="flex justify-between items-start mb-8">
                        <div>
                          <h3 className="text-indigo-600 font-bold text-xl">Member Information</h3>
                          <p className="text-gray-500">For verification & emergency</p>
                        </div>
                        <div className="relative">
                          <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center">
                            <QrCode className="h-20 w-20 text-indigo-600" />
                          </div>
                          <div className={`absolute -top-2 -right-2 w-6 h-6 ${currentPlan.isActive ? 'bg-green-500' : 'bg-red-500'} rounded-full flex items-center justify-center`}>
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Contact Information */}
                      <div className="space-y-4 mb-8 flex-1">
                        <div className="grid grid-cols-1 gap-4">
                          <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                            <Phone className="h-5 w-5 text-indigo-600 mr-4" />
                            <div>
                              <p className="text-xs text-gray-500 uppercase tracking-wide">Phone</p>
                              <p className="font-medium">{memberData.phone}</p>
                            </div>
                          </div>
                          <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                            <Mail className="h-5 w-5 text-indigo-600 mr-4" />
                            <div className="flex-1">
                              <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                              <p className="font-medium text-sm truncate">{memberData.email}</p>
                            </div>
                          </div>
                          <div className="flex items-start p-3 bg-gray-50 rounded-xl">
                            <MapPin className="h-5 w-5 text-indigo-600 mr-4 mt-1" />
                            <div>
                              <p className="text-xs text-gray-500 uppercase tracking-wide">Address</p>
                              <p className="font-medium text-sm leading-tight">{memberData.address}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Emergency Info */}
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                        <h4 className="text-red-700 font-semibold text-sm mb-2">Emergency Information</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-red-600">Blood Group: <span className="font-bold">{memberData.bloodGroup}</span></p>
                          </div>
                          <div>
                            <p className="text-red-600">DOB: {memberData.dateOfBirth}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Footer */}
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex justify-between text-xs text-gray-600 mb-3">
                          <span>Member since {memberData.joinDate}</span>
                          <span>24/7 Medical Support</span>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-400">© 2025 Smart Care Health • Confidential Document</p>
                          <p className="text-xs text-red-500 font-medium mt-1">Report if found • Reward ₹500</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Controls */}
            <div className="flex flex-col items-center space-y-4">
              <p className="text-gray-500 text-sm flex items-center">
                <CreditCard className="h-4 w-4 mr-2" />
                Click card to flip and view details
              </p>
              
              <div className="flex space-x-4">
                <button
                  onClick={downloadCard}
                  disabled={isDownloading || !currentPlan.isActive}
                  className="flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {isDownloading ? (
                    <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                  ) : (
                    <Download className="h-5 w-5 mr-2" />
                  )}
                  {isDownloading ? 'Generating...' : 'Download Card'}
                </button>
                
                <button
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="flex items-center px-6 py-4 bg-white text-gray-700 rounded-2xl hover:bg-gray-50 shadow-lg transition-all border border-gray-200"
                >
                  <RefreshCw className="h-5 w-5 mr-2" />
                  Flip Card
                </button>
              </div>
            </div>

            {/* Hidden file input for image upload */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
          </div>

          {/* Enhanced Plan Details */}
          <div className="space-y-8">
            {/* Main Plan Card */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${currentPlan.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                    {currentPlan.icon}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-3xl font-bold text-gray-800">{currentPlan.name}</h3>
                      {!currentPlan.isActive && (
                        <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full">
                          Inactive
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-lg">{currentPlan.description}</p>
                    {currentPlan.createdAt && (
                      <p className="text-gray-400 text-sm mt-1">
                        Created: {new Date(currentPlan.createdAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {currentPlan.price}
                  </div>
                  <div className="text-gray-500">per {currentPlan.period}</div>
                </div>
              </div>

              {/* Feature Grid */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
                  <Calendar className="h-10 w-10 text-indigo-600 mx-auto mb-3" />
                  <p className="font-bold text-lg">24/7 Access</p>
                  <p className="text-gray-600">Round the clock support</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl">
                  <Clock className="h-10 w-10 text-emerald-600 mx-auto mb-3" />
                  <p className="font-bold text-lg">{currentPlan.hospitals}</p>
                  <p className="text-gray-600">Network coverage</p>
                </div>
              </div>

              {/* Features List */}
              <div className="mb-8">
                <h4 className="font-bold text-gray-800 text-lg mb-4">Plan Benefits</h4>
                {currentPlan.features && currentPlan.features.length > 0 ? (
                  <div className="grid grid-cols-1 gap-3">
                    {currentPlan.features.map((feature, index) => (
                      <div key={index} className="flex items-center p-3 bg-gray-50 rounded-xl">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No specific features listed for this plan.</p>
                    <p className="text-sm">Contact support for detailed benefits.</p>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <button 
                disabled={!currentPlan.isActive}
                className={`w-full py-5 rounded-2xl font-bold text-lg transition-all transform ${
                  currentPlan.isActive 
                    ? `bg-gradient-to-r ${currentPlan.color} text-white hover:shadow-2xl hover:scale-105`
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {currentPlan.isActive ? `Activate ${currentPlan.name} Plan` : 'Plan Inactive'}
              </button>
            </div>

            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg text-center border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="text-3xl font-bold text-indigo-600 mb-2">10M+</div>
                <div className="text-gray-600 font-medium">Active Members</div>
                <div className="text-xs text-gray-500 mt-1">Trusted globally</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg text-center border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="text-3xl font-bold text-indigo-600 mb-2">1500+</div>
                <div className="text-gray-600 font-medium">Partner Hospitals</div>
                <div className="text-xs text-gray-500 mt-1">Worldwide network</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg text-center border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-6 w-6 text-yellow-400 fill-current mr-1" />
                  <span className="text-3xl font-bold text-indigo-600">4.8</span>
                </div>
                <div className="text-gray-600 font-medium">User Rating</div>
                <div className="text-xs text-gray-500 mt-1">Excellent service</div>
              </div>
            </div>

            {/* API Data Stats */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
              <h4 className="font-bold text-indigo-800 text-lg mb-4 flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Live Data Stats
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">{plans.length}</div>
                  <div className="text-sm text-indigo-700">Available Plans</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {plans.filter(plan => plan.isActive).length}
                  </div>
                  <div className="text-sm text-green-700">Active Plans</div>
                </div>
              </div>
              <button
                onClick={() => refetchCards()}
                className="mt-4 w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Data
              </button>
            </div>

            {/* App Download Section */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="text-xl font-bold mb-2">Download Smart Care App</h4>
                  <p className="text-gray-300">Manage your health on the go</p>
                </div>
                <Smartphone className="h-12 w-12 text-gray-300" />
              </div>
              <div className="flex space-x-4">
                <button className="flex items-center px-6 py-3 bg-white text-gray-900 rounded-xl font-medium hover:bg-gray-100 transition-colors">
                  <span>Google Play</span>
                </button>
                <button className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
                  <span>App Store</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};