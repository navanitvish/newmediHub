import React, { useState, useEffect } from 'react';
import { Star, Quote, Heart, Award, ChevronLeft, ChevronRight, User } from 'lucide-react';

const ModernTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Healthcare Professional",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: "This platform revolutionized how I manage patient care. The integrated diagnostics and seamless workflow have improved our clinic's efficiency by 300%. Absolutely game-changing!",
      highlight: "Improved efficiency by 300%",
      gradient: "from-emerald-400 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Patient & Father",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: "Managing my family's healthcare has never been easier. From booking appointments to accessing lab reports instantly - everything is so intuitive. My kids actually enjoy their check-ups now!",
      highlight: "Family healthcare made simple",
      gradient: "from-blue-400 to-indigo-500",
      bgGradient: "from-blue-50 to-indigo-50"
    },
    {
      id: 3,
      name: "Dr. Emily Watson",
      role: "Cardiologist",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: "The AI-powered diagnostics and real-time patient monitoring have transformed my practice. I can provide more accurate diagnoses and personalized treatment plans than ever before.",
      highlight: "AI-powered diagnostics",
      gradient: "from-purple-400 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50"
    },
    {
      id: 4,
      name: "James Thompson",
      role: "Senior Patient",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: "At 68, I was skeptical about digital healthcare. But this platform is so user-friendly! The 24/7 telemedicine feature gives me peace of mind, and the medication reminders are invaluable.",
      highlight: "User-friendly for all ages",
      gradient: "from-amber-400 to-orange-500",
      bgGradient: "from-amber-50 to-orange-50"
    },
    {
      id: 5,
      name: "Lisa Patel",
      role: "Working Mother",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: "Between work and kids, finding time for healthcare was impossible. Now I can consult doctors during lunch breaks, get prescriptions delivered, and track my family's health all from my phone.",
      highlight: "Healthcare that fits your schedule",
      gradient: "from-rose-400 to-pink-500",
      bgGradient: "from-rose-50 to-pink-50"
    },
    {
      id: 6,
      name: "Dr. David Kim",
      role: "Lab Director",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: "The quality assurance and automated reporting features have streamlined our lab operations significantly. Patient satisfaction scores have increased by 40% since we integrated this platform.",
      highlight: "40% increase in satisfaction",
      gradient: "from-cyan-400 to-blue-500",
      bgGradient: "from-cyan-50 to-blue-50"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 2) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonials = () => {
    setCurrentIndex((prev) => (prev + 2) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonials = () => {
    setCurrentIndex((prev) => (prev - 2 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonials = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  // Get current two testimonials
  const getCurrentTestimonials = () => {
    const first = testimonials[currentIndex];
    const second = testimonials[(currentIndex + 1) % testimonials.length];
    return [first, second];
  };

  const currentTestimonials = getCurrentTestimonials();

  const TestimonialCard = ({ testimonial, isSecondary = false }) => (
    <div className={`relative bg-gradient-to-br ${testimonial.bgGradient} rounded-3xl p-6 lg:p-8 shadow-2xl border border-white/50 overflow-hidden transition-all duration-500 ${isSecondary ? 'scale-95 opacity-90' : ''}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient}`}></div>
      </div>
      
      {/* Quote Icon */}
      <div className="absolute top-6 right-6 opacity-20">
        <Quote className="w-12 h-12 text-gray-400" />
      </div>
      
      <div className="relative">
        {/* User Info */}
        <div className="flex items-center mb-6">
          <div className="relative">
            <img 
              src={testimonial.avatar} 
              alt={testimonial.name}
              className="w-16 h-16 rounded-2xl object-cover shadow-lg"
            />
            <div className={`absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-r ${testimonial.gradient} rounded-full flex items-center justify-center shadow-lg`}>
              <Award className="w-3 h-3 text-white" />
            </div>
          </div>
          
          <div className="ml-5">
            <h3 className="text-xl font-bold text-gray-900 mb-1">{testimonial.name}</h3>
            <p className="text-gray-600 mb-2">{testimonial.role}</p>
            
            {/* Rating Stars */}
            <div className="flex items-center gap-1">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
        </div>
        
        {/* Testimonial Content */}
        <blockquote className="text-lg lg:text-xl text-gray-800 leading-relaxed mb-5 font-light">
          "{testimonial.content}"
        </blockquote>
        
        {/* Highlight Badge */}
        <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r ${testimonial.gradient} text-white text-sm font-semibold shadow-lg`}>
          <Heart className="w-4 h-4" />
          {testimonial.highlight}
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative py-24 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-gradient-to-r from-pink-200/20 to-orange-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 text-sm font-bold mb-6 border border-orange-200/50 shadow-lg">
            <Heart className="w-4 h-4 animate-pulse" />
            Real Stories, Real Impact
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-8">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
              What Our
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Community Says
            </span>
          </h2>
          
          <p className="max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed">
            Discover how we're transforming healthcare experiences for thousands of patients, 
            doctors, and healthcare professionals worldwide.
          </p>
        </div>

        {/* Main Dual Testimonials Display */}
        <div className="relative mb-16">
          <div className="max-w-6xl mx-auto">
            {/* Two Testimonial Cards Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <TestimonialCard testimonial={currentTestimonials[0]} />
              <TestimonialCard testimonial={currentTestimonials[1]} isSecondary={true} />
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center gap-4">
              <button 
                onClick={prevTestimonials}
                className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-gray-600 hover:text-blue-600"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              {/* Dots Indicator (showing pairs) */}
              <div className="flex gap-2">
                {Array.from({ length: Math.ceil(testimonials.length / 2) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonials(index * 2)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      Math.floor(currentIndex / 2) === index
                        ? `bg-gradient-to-r ${currentTestimonials[0].gradient} scale-125` 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              
              <button 
                onClick={nextTestimonials}
                className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-gray-600 hover:text-blue-600"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              onClick={() => goToTestimonials(index * 2)}
            >
              {/* Mini User Info */}
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-xl object-cover mr-3"
                />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-gray-500">{testimonial.role}</p>
                </div>
                
                {/* Rating */}
                <div className="ml-auto flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-semibold text-gray-700">{testimonial.rating}</span>
                </div>
              </div>
              
              {/* Mini Content */}
              <p className="text-sm text-gray-600 line-clamp-3 group-hover:text-gray-800 transition-colors duration-300">
                "{testimonial.content.substring(0, 120)}..."
              </p>
              
              {/* Highlight */}
              <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r ${testimonial.gradient} text-white text-xs font-medium mt-3 opacity-90`}>
                <Heart className="w-3 h-3" />
                {testimonial.highlight}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-black text-gray-900 mb-2">50,000+</div>
              <div className="text-gray-600 font-medium">Happy Patients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-gray-900 mb-2">4.9/5</div>
              <div className="text-gray-600 font-medium">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-gray-900 mb-2">98%</div>
              <div className="text-gray-600 font-medium">Would Recommend</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernTestimonials;