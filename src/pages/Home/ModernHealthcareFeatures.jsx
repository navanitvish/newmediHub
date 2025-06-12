import React from 'react';
import { Shield, Zap, Heart, Pill, Stethoscope, Activity } from 'lucide-react';

const ModernHealthcareFeatures = () => {
  const features = [
    {
      id: 1,
      icon: Shield,
      title: "Secure Authentication",
      description: "Advanced biometric security with multi-factor authentication ensures your health data remains private and protected.",
      gradient: "from-emerald-400 to-teal-600",
      bgGradient: "from-emerald-50 to-teal-50",
      delay: 0
    },
    {
      id: 2,
      icon: Zap,
      title: "Instant Appointments",
      description: "AI-powered scheduling finds the perfect doctor match and books appointments in under 30 seconds.",
      gradient: "from-blue-400 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50",
      delay: 0.1
    },
    {
      id: 3,
      icon: Heart,
      title: "Smart Health Monitoring",
      description: "Real-time health analytics with predictive insights and personalized wellness recommendations.",
      gradient: "from-rose-400 to-pink-600",
      bgGradient: "from-rose-50 to-pink-50",
      delay: 0.2
    },
    {
      id: 4,
      icon: Pill,
      title: "MediFarma Integration",
      description: "Seamless prescription management with automated refills, drug interactions alerts, and doorstep delivery.",
      gradient: "from-purple-400 to-violet-600",
      bgGradient: "from-purple-50 to-violet-50",
      delay: 0.3
    },
    {
      id: 5,
      icon: Stethoscope,
      title: "Telemedicine Platform",
      description: "High-definition video consultations with specialists, available 24/7 for urgent care needs.",
      gradient: "from-amber-400 to-orange-600",
      bgGradient: "from-amber-50 to-orange-50",
      delay: 0.4
    },
    {
      id: 6,
      icon: Activity,
      title: "Integrated Diagnostics",
      description: "Comprehensive lab reports with AI-powered analysis and trend tracking for better health insights.",
      gradient: "from-cyan-400 to-blue-600",
      bgGradient: "from-cyan-50 to-blue-50",
      delay: 0.5
    }
  ];

  return (
    <div className="relative py-24 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 text-sm font-semibold mb-6 border border-blue-200/50">
            <Activity className="w-4 h-4 animate-pulse" />
            Advanced Healthcare Technology
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-8">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
                Modern Healthcare
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Features & Innovations
            </span>
          </h2>
          
          <p className="max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed">
            Experience the future of healthcare with our integrated platform that combines cutting-edge technology, 
            personalized care, and seamless digital experiences.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.id}
                className="group relative"
                style={{ animationDelay: `${feature.delay}s` }}
              >
                {/* Card */}
                <div className="relative h-full bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Floating Elements */}
                    <div className={`absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r ${feature.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100`}></div>
                    <div className={`absolute -bottom-1 -left-1 w-3 h-3 bg-gradient-to-r ${feature.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200`}></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Hover Border Effect */}
                  <div className={`absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:${feature.gradient.replace('from-', 'border-').replace('to-', 'border-')} transition-all duration-300 pointer-events-none`}></div>
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000 ease-in-out"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              <span className="flex items-center gap-2">
                Get Started Today
                <Activity className="w-5 h-5 group-hover:animate-pulse" />
              </span>
            </button>
            
            <div className="text-sm text-gray-500">
              <span className="font-semibold text-blue-600">50,000+</span> patients trust our platform
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 right-10 w-20 h-20 border border-blue-200 rounded-full opacity-20 animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 left-10 w-16 h-16 border border-purple-200 rounded-full opacity-20 animate-bounce delay-2000"></div>
        <div className="absolute top-1/2 right-1/4 w-12 h-12 border border-pink-200 rounded-full opacity-20 animate-bounce delay-3000"></div>
      </div>
    </div>
  );
};

export default ModernHealthcareFeatures;