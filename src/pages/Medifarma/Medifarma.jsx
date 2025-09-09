import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  Camera, 
  Smartphone, 
  ShoppingCart, 
  Clock, 
  Truck, 
  Shield, 
  Phone, 
  ShoppingBag, 
  Sparkles, 
  ChevronRight,
  Upload,
  ShieldCheck 
} from 'lucide-react';

// Components

// import ApolloHealthcareNav from './medibar';

import PopularLabTests from '../LabTests/PopularLabTests';
import BannerCarousel from '../../components/UI/Banner';
import { ValueDealsCarousel } from './ValueDeals';
import { TopSellingProducts } from './TopSellingProducts';
import { DiebetesManagement } from './DiebetesManagement';
import { SkinCarebrand } from './SkinCarebrand';
import { Miniumoff } from './Miniumoff';
import Brand from './brand';
import PharmaciesNearYou from './PharmaciesNearYou';
import { WomanWellness } from './WomanWellness';
import { selectMedicineTotalQuantity } from '../../redux/slices/medicineSlice';
import { HealthConditionsBrowser } from '../../components/UI/HealthConditionsBrowser';

const Medifarma = () => {
  const navigate = useNavigate();
 const medicineQuantity = useSelector(selectMedicineTotalQuantity) || 0;

  const handleSearch = () => {
    navigate('/search');
  };

  const handlePrescriptionUpload = () => {
    navigate('/prescription-upload');
  };

  const trustIndicators = [
    { icon: Shield, text: "Genuine Products", color: "text-black" },
    { icon: Truck, text: "Fast Delivery", color: "text-black" },
    { icon: ShoppingBag, text: "Easy Returns", color: "text-black" }
  ];

  const features = [
    {
      icon: Truck,
      title: "Free Delivery",
      description: "On orders above ₹599",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      icon: Clock,
      title: "Same Day Delivery",
      description: "For selected locations",
      bgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      icon: Shield,
      title: "Genuine Products",
      description: "100% authentic items",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      icon: Phone,
      title: "24/7 Support",
      description: "Call us anytime",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600"
    }
  ];

  return (
    <div className='bg-gray-100'>
      <div className="font-sans text-gray-800 mt-4">
        {/* <ApolloHealthcareNav /> */}

        {/* Hero Section */}
        <section className="z-0 relative overflow-hidden bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
            <div className="absolute top-10 right-20 w-32 h-16 rounded-full bg-white rotate-45" />
            <div className="absolute bottom-20 left-10 w-40 h-16 rounded-full bg-white -rotate-12" />
            <div className="absolute top-1/3 left-1/4 w-24 h-12 rounded-full bg-white rotate-45" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-12">
              {/* Left Content */}
              <div className="md:w-1/2">
                <div className="inline-flex items-center bg-white bg-opacity-20 rounded-full px-4 py-1.5 mb-6">
                  <Sparkles size={16} className="text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-black">FIRST20 for 20% off your first order</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  Your Health, <span className="text-white">Our Priority</span>
                </h1>

                <p className="text-lg text-blue-50 mb-8 max-w-lg">
                  Get premium medicines and healthcare products delivered to your doorstep with exclusive online discounts and lightning-fast delivery.
                </p>

                {/* Trust Indicators */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                  {trustIndicators.map((indicator, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3">
                        <indicator.icon size={16} className={indicator.color} />
                      </div>
                      <span className="text-sm">{indicator.text}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="mt-6">
                  <button 
                    onClick={handleSearch} 
                    className="bg-white text-blue-600 px-8 py-4 rounded-full font-medium hover:bg-blue-50 transition-colors flex items-center shadow-lg"
                  >
                    Search
                    <ChevronRight size={20} className="ml-2" />
                  </button>
                  <p className="text-blue-100 text-sm mt-3">
                    Free shipping on orders above ₹499
                  </p>
                </div>
              </div>

              {/* Right Content - Hero Image */}
              <div className="md:w-1/2 relative">
                <div className="relative">
                  <div className="relative bg-gradient-to-br from-blue-700 to-indigo-600 p-2 rounded-2xl shadow-2xl rotate-1">
                    <img
                      src="https://cdn.dribbble.com/userupload/14829154/file/original-c8145ea435dea6f86e6c4517203bc229.png?resize=1024x768&vertical=center"
                      alt="Family with healthcare products"
                      className="rounded-xl shadow-inner w-full h-auto object-cover"
                    />

                    {/* Discount Badge */}
                    <div className="absolute -top-6 -right-6 bg-yellow-500 text-blue-900 rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-lg transform rotate-12">
                      <span className="text-xs font-bold">SAVE</span>
                      <span className="text-lg font-bold">20%</span>
                    </div>
                  </div>

                  {/* Floating Product Card */}
                  <div className="absolute -left-6 bottom-12 bg-white rounded-lg shadow-lg p-3 max-w-xs hidden md:block">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <img 
                          src="https://cdn.dribbble.com/userupload/37019428/file/original-50aa29d2fa2cee728e68f73231983c21.png?resize=728x546&vertical=center" 
                          alt="Product" 
                          className="rounded-full w-10 h-10 object-cover" 
                        />
                      </div>
                      <div className="text-left">
                        <h3 className="text-sm font-bold text-gray-800">Premium Vitamins</h3>
                        <div className="flex items-center">
                          <span className="text-xs text-green-600 font-medium">₹399</span>
                          <span className="text-xs text-gray-500 line-through ml-2">₹599</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Rating Card */}
                  <div className="absolute -right-4 top-12 bg-white rounded-lg shadow-lg p-3 hidden md:block">
                    <div className="flex items-center space-x-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs font-medium text-gray-800">4.9/5 (2.5k+ reviews)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Wave Shape */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0">
            <svg className="relative block w-full h-8 sm:h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="white" />
            </svg>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md flex items-center">
                  <div className={`${feature.bgColor} p-3 rounded-full mr-4`}>
                    <feature.icon className={feature.iconColor} />
                  </div>
                  <div>
                    <h3 className="font-medium">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Upload Prescription Section */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-400">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-3 rounded-full mr-4">
                    <Upload className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Upload Your Prescription</h2>
                </div>
                
                <p className="text-gray-600 mb-6 text-lg">
                  Get tests recommended by your doctor. Upload your prescription and we'll help you find the right tests at the best prices.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <button 
                    onClick={handlePrescriptionUpload}
                    className="flex items-center justify-center bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium"
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    Take Photo
                  </button>
                  <button 
                    onClick={handlePrescriptionUpload}
                    className="flex items-center justify-center bg-white text-blue-500 border-2 border-blue-500 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium"
                  >
                    <Smartphone className="w-5 h-5 mr-2" />
                    Upload from Gallery
                  </button>
                </div>
                
                <div className="flex items-center text-sm text-gray-500">
                  <ShieldCheck className="w-4 h-4 mr-2 text-green-500" />
                  <span>Your prescription is safe and secure with us</span>
                </div>
              </div>
              
              <div className="relative">
                <img
                  src="https://plus.unsplash.com/premium_photo-1682141140357-4283cd7aae8b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzI1fHxkb2N0b3J8ZW58MHx8MHx8fDA%3D"
                  alt="Doctor with prescription"
                  className="rounded-xl shadow-lg w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Sections */}
        <HealthConditionsBrowser />
        <Miniumoff />
        <BannerCarousel />
        <TopSellingProducts />
        <Brand />

        {/* Ayurvedic Products Offer Banner */}
        <section className="py-10 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 md:p-10 text-white">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-3/5 mb-6 md:mb-0">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Get 25% off on all Ayurvedic Products
                  </h2>
                  <p className="mb-6">Use code AYUR25 at checkout. Valid until April 30, 2025.</p>
                  <button className="bg-white text-green-600 px-6 py-3 rounded-full font-medium hover:bg-green-50 transition-colors">
                    Shop Now
                  </button>
                </div>
                <div className="md:w-2/5">
                  <img 
                    src="/api/placeholder/400/200" 
                    alt="Ayurvedic products" 
                    className="rounded-lg shadow-xl" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <ValueDealsCarousel />
        <DiebetesManagement />
        <SkinCarebrand />
        <PopularLabTests />
        <WomanWellness />

        {/* Promotional Banners */}
        <div className="max-w-7xl mx-auto px-4 space-y-6">
          <img 
            src="https://images.apollo247.in/pd-cms/cms/2023-09/Diag_Web_Desktop.jpg?tr=q-80,f-webp,w-1300,dpr-2,c-at_max" 
            alt="Diagnostic services banner" 
            className='w-full rounded-2xl shadow-lg'
          />
          <img 
            src="https://images.apollo247.in/images/category/threeStepsherobannerfinal.png?tr=q-80,f-webp,w-1250,dpr-1,c-at_max" 
            alt="Three steps process banner" 
            className='w-full rounded-2xl shadow-lg'
          />
        </div>

        <PharmaciesNearYou />

        {/* Floating Cart Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <Link
            to="/cart"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg flex items-center justify-center transition-colors"
          >
            <ShoppingCart size={24} />
            {medicineQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                {medicineQuantity}
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Medifarma;