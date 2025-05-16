import { useState } from 'react';
import { 
  Heart, Shield, Users, Award, Check, ArrowRight, ChevronDown, 
  ChevronUp, Phone, Mail, MapPin, QrCode, Calendar, Clock, 
  AlertCircle, MessageSquare, Activity, ShieldCheck, Stethoscope
} from 'lucide-react';
import EpisodesWithVideo from '../epicode';

export default function SmartHealthMembershipCards() {
  const [activeCard, setActiveCard] = useState('premium');
  const [flippedCards, setFlippedCards] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState('benefits');
  
  const membershipOptions = [
    {
      id: 'basic',
      name: 'Basic',
      color: 'from-sky-500 to-blue-500',
      accentColor: 'sky-400',
      price: '₹29.99',
      period: 'monthly',
      description: 'Essential health coverage for individuals seeking affordable care options.',
      features: [
        'Access to basic health checkups',
        'Online appointment booking',
        'Digital health records',
        '24/7 nurse hotline'
      ],
      facilities: [
        'Access to 500+ network hospitals',
        'In-house pharmacy discounts',
        'Basic diagnostic tests'
      ],
      testimonial: {
        name: 'Rahul Sharma',
        text: 'Smart Health Basic plan has made healthcare accessible and affordable for me. The online booking system is incredibly convenient!',
        rating: 4
      }
    },
    {
      id: 'family',
      name: 'Family',
      color: 'from-emerald-500 to-green-500',
      accentColor: 'emerald-400',
      price: '₹79.99',
      period: 'monthly',
      description: 'Comprehensive care for your entire family with specialized services for all ages.',
      features: [
        'Coverage for up to 4 family members',
        'Pediatric care included',
        'Quarterly health assessments',
        'Dental checkups twice a year',
        'Mental health support'
      ],
      facilities: [
        'Access to 750+ network hospitals',
        'Family doctor assignment',
        'Annual vaccines included',
        'Nutritional counseling'
      ],
      testimonial: {
        name: 'Priya Patel',
        text: 'Since enrolling my family in the Family plan, healthcare management has become stress-free. The quarterly assessments help us stay proactive about our well-being.',
        rating: 5
      }
    },
    {
      id: 'premium',
      name: 'Premium',
      color: 'from-indigo-500 to-blue-600',
      accentColor: 'indigo-400',
      price: '₹59.99',
      period: 'monthly',
      description: 'Advanced individual care with priority services and expanded specialist network.',
      features: [
        'Priority appointment scheduling',
        'Specialist consultations included',
        'Annual comprehensive health screening',
        'Personalized wellness plan',
        'Discounts on fitness centers'
      ],
      facilities: [
        'Access to 1000+ premium hospitals',
        'Dedicated health manager',
        'Advanced diagnostic coverage',
        'Weekend appointment options'
      ],
      testimonial: {
        name: 'Vikram Mehta',
        text: 'The Premium membership has transformed my healthcare experience. Having priority scheduling and a personalized wellness plan has made managing my health so much easier.',
        rating: 5
      }
    },
    {
      id: 'platinum',
      name: 'Platinum',
      color: 'from-violet-600 to-purple-600',
      accentColor: 'violet-400',
      price: '₹119.99',
      period: 'monthly',
      description: 'Elite healthcare experience with exclusive benefits and concierge services.',
      features: [
        'VIP healthcare access',
        'Executive health assessments',
        'Personal health concierge',
        'Global coverage while traveling',
        'Premium wellness retreats',
        'Home doctor visits'
      ],
      facilities: [
        'Access to all network hospitals worldwide',
        'Private rooms guaranteed',
        'International specialist network',
        'Helicopter medical evacuation',
        'Annual executive health retreat'
      ],
      testimonial: {
        name: 'Ananya Krishnan',
        text: 'As someone who travels frequently, the global coverage and concierge service with the Platinum plan gives me peace of mind wherever I go. The executive assessments are incredibly thorough.',
        rating: 5
      }
    }
  ];
  
  const toggleCardFlip = (cardId) => {
    setFlippedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };
  
  const getCardIcon = (cardId) => {
    switch(cardId) {
      case 'basic': return <Heart />;
      case 'family': return <Users />;
      case 'premium': return <Shield />;
      case 'platinum': return <Award />;
      default: return <Heart />;
    }
  };
  
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>★</span>
      );
    }
    return stars;
  };
  
  return (
    <div className="min-h-screen bg-gray-50 p-6 pb-32">
      <div className="max-w-7xl mx-auto mt-28">
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center">
            <Activity className="h-8 w-8 text-indigo-600 mr-2" />
            <h1 className="text-4xl font-bold text-indigo-600">Smart Health 2025</h1>
          </div>
          <p className="text-gray-600 mt-3 text-lg">Modern healthcare solutions for the modern world</p>
          <div className="mt-4 inline-flex items-center px-4 py-1 bg-indigo-100 text-indigo-600 text-sm font-medium rounded-full">
            <ShieldCheck className="h-4 w-4 mr-1" />
            Trusted by 5M+ members across India
          </div>
        </header>
        
        {/* Membership Selection Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {membershipOptions.map(option => (
            <button
              key={option.id}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all shadow-sm ${
                activeCard === option.id 
                  ? `bg-gradient-to-r ${option.color} text-white` 
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
              onClick={() => setActiveCard(option.id)}
            >
              <div className="flex items-center">
                {getCardIcon(option.id)}
                <span className="ml-2">{option.name}</span>
              </div>
            </button>
          ))}
        </div>
        
        {/* Featured Card - larger display */}
        <div className="mb-16">
          {membershipOptions.map(option => (
            option.id === activeCard && (
              <div key={option.id} className="w-full max-w-md mx-auto">
                {/* Card Container with 3D effect */}
                <div className="relative w-full h-56 perspective-1000">
                  <div 
                    className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d cursor-pointer ${flippedCards[option.id] ? 'rotate-y-180' : ''}`}
                    onClick={() => toggleCardFlip(option.id)}
                  >
                    {/* Front Side */}
                    <div className={`absolute w-full h-full backface-hidden ${flippedCards[option.id] ? 'hidden md:block' : ''}`}>
                      <div className={`w-full h-full bg-gradient-to-br ${option.color} rounded-2xl shadow-xl p-6 text-white`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center">
                              <Stethoscope className="h-6 w-6" />
                              <h2 className="text-xl font-bold ml-2">Smart Health</h2>
                            </div>
                            <p className="text-blue-50 text-sm mt-1">{option.name} Member</p>
                          </div>
                          <div className="h-12 w-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                            {getCardIcon(option.id)}
                          </div>
                        </div>
                        
                        <div className="mt-8">
                          <p className="text-sm text-blue-50">Member Name</p>
                          <p className="text-xl font-semibold">Alexander Johnson</p>
                        </div>
                        
                        <div className="mt-4 flex justify-between items-end">
                          <div>
                            <p className="text-sm text-blue-50">Member ID</p>
                            <p className="font-mono tracking-wider">SH-2025-4391</p>
                          </div>
                          <div>
                            <p className="text-sm text-blue-50">Valid Thru</p>
                            <p>04/2028</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Back Side */}
                    <div className={`absolute w-full h-full backface-hidden rotate-y-180 ${!flippedCards[option.id] ? 'hidden md:block' : ''}`}>
                      <div className="w-full h-full bg-white rounded-2xl shadow-xl p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-indigo-600 font-bold">Member Information</h3>
                            <p className="text-gray-500 text-sm">Scan QR code for verification</p>
                          </div>
                          <div className="h-24 w-24 bg-gray-100 rounded-lg flex items-center justify-center">
                            <QrCode className="h-20 w-20 text-indigo-600" />
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="text-sm text-gray-600 space-y-2">
                            <p className="flex items-center">
                              <Phone className="h-4 w-4 mr-2 text-indigo-600" />
                              <span>+91 98765 43210</span>
                            </p>
                            <p className="flex items-center">
                              <Mail className="h-4 w-4 mr-2 text-indigo-600" />
                              <span>alex.johnson@example.com</span>
                            </p>
                            <p className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2 text-indigo-600" />
                              <span>123 Health Avenue, Bangalore</span>
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-4 text-xs text-center text-gray-500">
                          <p>This card remains the property of Smart Health.</p>
                          <p>If found, please return to nearest Smart Health center.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-center text-gray-500 text-sm mt-3 flex items-center justify-center">
                  <span className="mr-1">{flippedCards[option.id] ? "Click to view front" : "Click to view back"}</span>
                  <ChevronDown className={`h-4 w-4 transform transition-transform ${flippedCards[option.id] ? 'rotate-180' : ''}`} />
                </p>
              </div>
            )
          ))}
        </div>
        
        {/* Membership Details with Tabs */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-12">
          {membershipOptions.map(option => (
            option.id === activeCard && (
              <div key={option.id}>
                <div className="p-6 pb-0">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-2xl font-bold text-indigo-600">{option.name} Membership</h3>
                      <p className="text-gray-600 mt-1">{option.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-bold text-indigo-600">{option.price}</span>
                      <span className="text-sm text-gray-500">/{option.period}</span>
                      <p className="text-xs text-gray-500 mt-1">Billed monthly, cancel anytime</p>
                    </div>
                  </div>
                  
                  {/* Tab Navigation */}
                  <div className="flex border-b border-gray-200 mt-6">
                    <button 
                      className={`py-3 px-4 border-b-2 font-medium text-sm ${activeTab === 'benefits' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setActiveTab('benefits')}
                    >
                      Benefits
                    </button>
                    <button 
                      className={`py-3 px-4 border-b-2 font-medium text-sm ${activeTab === 'facilities' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setActiveTab('facilities')}
                    >
                      Facilities
                    </button>
                    <button 
                      className={`py-3 px-4 border-b-2 font-medium text-sm ${activeTab === 'testimonials' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setActiveTab('testimonials')}
                    >
                      Testimonials
                    </button>
                  </div>
                </div>
                
                {/* Tab Content */}
                <div className="p-6 pt-4">
                  {activeTab === 'benefits' && (
                    <div className="space-y-4">
                      {option.features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <div className={`h-6 w-6 bg-${option.accentColor}/20 rounded-full flex items-center justify-center mr-3 mt-0.5`}>
                            <Check className={`h-4 w-4 text-${option.accentColor}`} />
                          </div>
                          <p className="text-gray-700">{feature}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {activeTab === 'facilities' && (
                    <div className="space-y-4">
                      {option.facilities.map((facility, index) => (
                        <div key={index} className="flex items-start">
                          <div className={`h-6 w-6 bg-${option.accentColor}/20 rounded-full flex items-center justify-center mr-3 mt-0.5`}>
                            <Check className={`h-4 w-4 text-${option.accentColor}`} />
                          </div>
                          <p className="text-gray-700">{facility}</p>
                        </div>
                      ))}
                      
                      <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center text-gray-600">
                          <AlertCircle className="h-5 w-5 mr-2 text-indigo-500" />
                          <span className="text-sm">Network facilities may vary by location. Check Smart Health app for details.</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'testimonials' && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-start">
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                          <span className="text-lg font-bold text-indigo-600">{option.testimonial.name.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">{option.testimonial.name}</div>
                          <div className="text-yellow-500 text-sm my-1">
                            {renderStars(option.testimonial.rating)}
                          </div>
                          <p className="text-gray-600 text-sm">{option.testimonial.text}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <button className="w-full mt-8 bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center shadow-md">
                    <span>Activate {option.name} Membership</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
            )
          ))}
        </div>
        
        {/* Key Benefits Section */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-indigo-600 mb-6">Key Benefits of Smart Health 2025</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-xl shadow-md">
              <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-indigo-600" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">24/7 Access</h4>
              <p className="text-gray-600">Round-the-clock healthcare support with instant virtual consultations anytime you need them.</p>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-md">
              <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-indigo-600" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">AI Health Assistant</h4>
              <p className="text-gray-600">Smart AI-powered health companion that monitors your vitals and provides personalized recommendations.</p>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-md">
              <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-indigo-600" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Seamless Scheduling</h4>
              <p className="text-gray-600">Book appointments, manage prescriptions, and track your health journey all in one place.</p>
            </div>
          </div>
        </div>
        
        {/* All Membership Cards - Small Card View */}
        <div>
          <div 
            className="flex justify-between items-center cursor-pointer mb-6"
            onClick={() => setShowDetails(!showDetails)}
          >
            <h3 className="text-xl font-bold text-indigo-600">Compare All Plans</h3>
            <div className="bg-indigo-100 rounded-full p-1">
              {showDetails ? (
                <ChevronUp className="h-5 w-5 text-indigo-600" />
              ) : (
                <ChevronDown className="h-5 w-5 text-indigo-600" />
              )}
            </div>
          </div>
          
          {showDetails && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {membershipOptions.map(option => (
                <div 
                  key={option.id} 
                  className={`bg-gradient-to-br ${option.color} rounded-xl shadow-md p-5 text-white cursor-pointer transition-transform hover:scale-105 hover:shadow-lg`}
                  onClick={() => setActiveCard(option.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      {getCardIcon(option.id)}
                      <h3 className="font-bold ml-2">{option.name}</h3>
                    </div>
                    <div className="h-8 w-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      {activeCard === option.id && <Check className="h-4 w-4" />}
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="text-2xl font-bold">{option.price}</div>
                    <div className="text-sm text-blue-50">per {option.period}</div>
                  </div>
                  
                  <div className="mt-4 text-sm">
                    <p>{option.features[0]}</p>
                    <p className="mt-1">{option.features.length > 1 ? option.features[1] : ''}</p>
                    {option.features.length > 2 && (
                      <p className="text-xs mt-2 text-blue-50">+ {option.features.length - 2} more benefits</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16">
          <h3 className="text-xl font-bold text-indigo-600 mb-6">Frequently Asked Questions</h3>
          
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-5">
              <h4 className="font-semibold text-gray-800">How do I use my Smart Health membership card?</h4>
              <p className="text-gray-600 mt-2">Your digital membership card can be accessed through the Smart Health app. Simply present the QR code when visiting our network facilities for quick verification.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-5">
              <h4 className="font-semibold text-gray-800">Can I upgrade my membership plan?</h4>
              <p className="text-gray-600 mt-2">Yes, you can upgrade your membership plan at any time. The new benefits will be prorated from the date of upgrade. Use the Smart Health app or contact our customer service to make changes.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-5">
              <h4 className="font-semibold text-gray-800">How do I add family members to my Family plan?</h4>
              <p className="text-gray-600 mt-2">After activating your Family plan, you can add up to 4 family members through the "Family Management" section in your Smart Health app dashboard.</p>
            </div>
          </div>
        </div>


        {/* <EpisodesWithVideo/> */}
      </div>
    </div>
  );
}