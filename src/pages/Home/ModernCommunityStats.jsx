import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Shield, CheckCircle, Award, Lock, Eye, UserCheck, Zap, Heart } from 'lucide-react';

const ModernCommunityStats = () => {
  const [counters, setCounters] = useState({
    users: 0,
    tests: 0,
    labs: 0,
    satisfaction: 0
  });

  const stats = [
    {
      id: 1,
      value: "50K+",
      label: "Active Users",
      icon: Users,
      gradient: "from-blue-500 to-cyan-400",
      counter: 50000,
      suffix: "+"
    },
    {
      id: 2,
      value: "2M+",
      label: "Tests Completed",
      icon: Heart,
      gradient: "from-emerald-500 to-teal-400",
      counter: 2000000,
      suffix: "+"
    },
    {
      id: 3,
      value: "500+",
      label: "Partner Labs",
      icon: Award,
      gradient: "from-purple-500 to-pink-400",
      counter: 500,
      suffix: "+"
    },
    {
      id: 4,
      value: "98%",
      label: "Satisfaction Rate",
      icon: TrendingUp,
      gradient: "from-orange-500 to-red-400",
      counter: 98,
      suffix: "%"
    }
  ];

  const safetyMeasures = [
    {
      id: 1,
      title: "NABL Certified Labs",
      description: "All partner labs are nationally accredited",
      icon: Award,
      color: "emerald"
    },
    {
      id: 2,
      title: "End-to-End Encryption",
      description: "Your health data is always protected",
      icon: Lock,
      color: "blue"
    },
    {
      id: 3,
      title: "Quality Assurance",
      description: "Multiple quality checks for accuracy",
      icon: CheckCircle,
      color: "purple"
    },
    {
      id: 4,
      title: "Real-time Tracking",
      description: "Monitor your sample from collection to results",
      icon: Eye,
      color: "amber"
    },
    {
      id: 5,
      title: "Expert Verification",
      description: "All reports reviewed by certified pathologists",
      icon: UserCheck,
      color: "rose"
    },
    {
      id: 6,
      title: "Instant Results",
      description: "Get your reports delivered digitally within hours",
      icon: Zap,
      color: "indigo"
    }
  ];

  // Animated counter effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCounters(prev => ({
        users: Math.min(prev.users + 1000, 50000),
        tests: Math.min(prev.tests + 50000, 2000000),
        labs: Math.min(prev.labs + 10, 500),
        satisfaction: Math.min(prev.satisfaction + 2, 98)
      }));
    }, 50);

    setTimeout(() => clearInterval(interval), 3000);
    return () => clearInterval(interval);
  }, []);

  const getColorClasses = (color) => {
    const colors = {
      emerald: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      blue: 'bg-blue-100 text-blue-700 border-blue-200',
      purple: 'bg-purple-100 text-purple-700 border-purple-200',
      amber: 'bg-amber-100 text-amber-700 border-amber-200',
      rose: 'bg-rose-100 text-rose-700 border-rose-200',
      indigo: 'bg-indigo-100 text-indigo-700 border-indigo-200'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="relative py-24 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30"></div>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-r from-pink-300/20 to-orange-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm font-bold mb-6 border border-blue-200/50 shadow-lg">
            <TrendingUp className="w-4 h-4 animate-bounce" />
            Growing Healthcare Community
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-8">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
              Trusted by
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Millions Every Month
            </span>
          </h2>
          
          <p className="max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed">
            Join our thriving community of health-conscious individuals who trust our platform 
            for their comprehensive healthcare needs and wellness journey.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.id}
                className="group relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${stat.gradient} shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="text-center relative">
                    <div className="text-4xl lg:text-5xl font-black text-gray-900 mb-2 group-hover:scale-105 transition-transform duration-300">
                      {stat.value}
                    </div>
                    <div className="text-sm lg:text-base font-semibold text-gray-600 uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                  
                  {/* Shine Effect */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Safety & Security Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8 lg:p-12 overflow-hidden relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500"></div>
          </div>
          
          <div className="relative">
            {/* Section Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 text-sm font-bold mb-6 border border-emerald-200/50">
                <Shield className="w-5 h-5" />
                100% Safe & Secure Healthcare
              </div>
              <h3 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">
                Your Health, Our Priority
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Experience healthcare with complete peace of mind through our comprehensive safety measures and quality assurance protocols.
              </p>
            </div>

            {/* Safety Measures Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {safetyMeasures.map((measure, index) => {
                const IconComponent = measure.icon;
                return (
                  <div
                    key={measure.id}
                    className="group relative"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`relative p-6 rounded-2xl ${getColorClasses(measure.color)} border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden`}>
                      {/* Icon */}
                      <div className="flex items-center mb-4">
                        <div className="p-2 rounded-xl bg-white/80 shadow-sm mr-4">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-lg">{measure.title}</h4>
                      </div>
                      
                      {/* Description */}
                      <p className="text-sm opacity-80 leading-relaxed">
                        {measure.description}
                      </p>
                      
                      {/* Hover Effect */}
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/10 via-white/20 to-white/10"></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-12">
              <button className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <Shield className="w-5 h-5 group-hover:animate-pulse" />
                Experience Safe Healthcare
              </button>
              <p className="mt-4 text-sm text-gray-500">
                <span className="font-semibold text-emerald-600">Zero security incidents</span> in over 2 million tests
              </p>
            </div>
          </div>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-32 right-16 w-16 h-16 border-2 border-blue-200 rounded-full opacity-30 animate-spin slow"></div>
        <div className="absolute bottom-32 left-16 w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-bounce delay-1000"></div>
        <div className="absolute top-1/2 right-8 w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-25 animate-pulse delay-2000"></div>
      </div>
    </div>
  );
};

export default ModernCommunityStats;