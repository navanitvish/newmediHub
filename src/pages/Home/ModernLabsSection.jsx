import React from 'react';
import { Star, MapPin, ArrowRight, Shield, Clock, Award } from 'lucide-react';

const ModernLabsSection = () => {
  const recommendedLabs = [
    {
      id: 1,
      name: "MedCore Diagnostics",
      image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=300&fit=crop",
      rating: 4.9,
      distance: "0.8 km",
      specialties: ["Blood Tests", "Imaging", "Pathology"],
      verified: true,
      nextAvailable: "Today"
    },
    {
      id: 2,
      name: "Precision Lab Center",
      image: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=400&h=300&fit=crop",
      rating: 4.8,
      distance: "1.2 km",
      specialties: ["Molecular Testing", "Genetics", "Oncology"],
      verified: true,
      nextAvailable: "Tomorrow"
    },
    {
      id: 3,
      name: "Apex Medical Labs",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=300&fit=crop",
      rating: 4.7,
      distance: "2.1 km",
      specialties: ["Cardiology", "Neurology", "Endocrine"],
      verified: true,
      nextAvailable: "Today"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative py-20 overflow-hidden">
      {/* Background with gradient mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.08),transparent_50%)]"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
            <Shield className="w-4 h-4" />
            Verified Healthcare Partners
          </div>
          
           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-8">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
                Recommended
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Diagnostic Centers
            </span>
          </h2>
          
          <p className="max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
            Discover top-rated diagnostic centers in your area, carefully vetted for quality and reliability by our healthcare network.
          </p>
        </div>

        {/* Labs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {recommendedLabs.map((lab, index) => (
            <div
              key={lab.id}
              className="group relative bg-white/70 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img 
                  src={lab.image} 
                  alt={lab.name} 
                  className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Verified Badge */}
                {lab.verified && (
                  <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-medium">
                    <Award className="w-3 h-3" />
                    Verified
                  </div>
                )}
                
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm">
                  <Star className="w-4 h-4 text-amber-400 fill-current" />
                  <span className="text-sm font-semibold text-gray-900">{lab.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {lab.name}
                </h3>
                
                {/* Location and Availability */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{lab.distance} away</span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">{lab.nextAvailable}</span>
                  </div>
                </div>

                {/* Specialties */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Specialties:</p>
                  <div className="flex flex-wrap gap-2">
                    {lab.specialties.map((specialty) => (
                      <span 
                        key={specialty}
                        className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-blue-200 transition-colors duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <button className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            <span>Explore All Labs</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          
          <p className="mt-4 text-sm text-gray-500">
            Over 150+ verified diagnostic centers in your network
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModernLabsSection;