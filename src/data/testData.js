


import { ChevronRight, ChevronLeft, Upload, FileText, ShoppingCart, Search, User, Menu, X, Calendar, MapPin, Shield, Heart, Clock, Award } from 'lucide-react';



  // Health checks data
  export const healthChecks = [
    { id: 1, name: 'Full Body Checkup', icon: '👤', color: 'bg-blue-100' },
    { id: 2, name: 'Diabetes', icon: '💉', color: 'bg-purple-100' },
    { id: 3, name: 'Women\'s Health', icon: '👩', color: 'bg-pink-100' },
    { id: 4, name: 'Thyroid', icon: '🦋', color: 'bg-teal-100' },
    { id: 5, name: 'Vitamin', icon: '💊', color: 'bg-yellow-100' },
    { id: 6, name: 'Blood Studies', icon: '🩸', color: 'bg-red-100' },
    { id: 7, name: 'Heart', icon: '❤️', color: 'bg-red-100' },
    { id: 8, name: 'Kidney', icon: '🫘', color: 'bg-green-100' },
    { id: 9, name: 'Liver', icon: '🫁', color: 'bg-orange-100' },
    { id: 10, name: 'Hairfall', icon: '💇', color: 'bg-amber-100' },
    { id: 11, name: 'Fever', icon: '🤒', color: 'bg-red-100' },
    { id: 12, name: 'Senior Citizen', icon: '👵', color: 'bg-purple-100' },
  ];

  // Top booked tests data
  export const topBookedTests = [
    { 
      id: 1, 
      name: 'CBC Test (Complete Blood Count)', 
      icon: '🔬',
      testsIncluded: 30,
      price: 424,
      originalPrice: 565,
      discount: 25,
      memberPrice: 339,
      rating: 4.8,
      reviews: 124,
      sampleType: 'Blood',
      fastingRequired: true
    },
    { 
      id: 2, 
      name: 'HbA1c Test (Hemoglobin A1c)', 
      icon: '📊',
      testsIncluded: 3,
      price: 550,
      originalPrice: 733,
      discount: 25,
      memberPrice: 440,
      rating: 4.7,
      reviews: 98,
      sampleType: 'Blood',
      fastingRequired: true
    },
    { 
      id: 3, 
      name: 'FBS (Fasting Blood Sugar) Test', 
      icon: '📈',
      testsIncluded: 1,
      price: 100,
      originalPrice: 133,
      discount: 25,
      memberPrice: 80,
      rating: 4.9,
      reviews: 156,
      sampleType: 'Blood',
      fastingRequired: true
    },
    { 
      id: 4, 
      name: 'Lipid Profile Test', 
      icon: '🫀',
      testsIncluded: 8,
      price: 962,
      originalPrice: 1283,
      discount: 25,
      memberPrice: 770,
      rating: 4.6,
      reviews: 89,
      sampleType: 'Blood',
      fastingRequired: true
    },
    { 
      id: 5, 
      name: 'Liver Function Test', 
      icon: '🫁',
      testsIncluded: 12,
      price: 750,
      originalPrice: 1000,
      discount: 25,
      memberPrice: 600,
      rating: 4.8,
      reviews: 113,
      sampleType: 'Blood',
      fastingRequired: true
    },
    { 
      id: 6, 
      name: 'Kidney Function Test', 
      icon: '🫘',
      testsIncluded: 10,
      price: 850,
      originalPrice: 1133,
      discount: 25,
      memberPrice: 680,
      rating: 4.7,
      reviews: 78,
      sampleType: 'Blood',
      fastingRequired: true
    }
  ];

  // Popular packages data
  export const popularPackages = [
    {
      id: 1,
      name: 'Apollo Prime Health Plan',
      description: '68 Tests: GLUCOSE, FASTING...',
      tag: 'TOP SELLING',
      price: 1700,
      originalPrice: 2833,
      discount: 40,
      icon: '👤',
      reportHours: 10,
      rating: 4.9,
      reviews: 238,
      recommendedFor: 'Adults 18-40 years',
      benefits: ['Early disease detection', 'Comprehensive health overview']
    },
    {
      id: 2,
      name: 'Apollo Fever Panel Complete',
      description: '58 Tests: ERYTHROCYTE SE...',
      price: 2177,
      originalPrice: 2903,
      discount: 25,
      memberPrice: 1742,
      icon: '🤒',
      reportHours: 36,
      rating: 4.7,
      reviews: 156,
      recommendedFor: 'Patients with fever',
      benefits: ['Identify cause of fever', 'Rule out serious infections']
    },
    {
      id: 3,
      name: 'Apollo Thyroid Assessment - Basic',
      description: '33 Tests: Thyroxine (T4, Total...',
      tag: 'TOP SELLING',
      price: 543,
      originalPrice: 724,
      discount: 25,
      memberPrice: 434,
      icon: '🦋',
      reportHours: 10,
      rating: 4.8,
      reviews: 197,
      recommendedFor: 'Adults with thyroid symptoms',
      benefits: ['Monitor thyroid function', 'Track treatment effectiveness']
    },
    {
      id: 4,
      name: 'Apollo Vitamin Check - Basic',
      description: '3 Tests: Calcium, Serum, VITA...',
      tag: 'TOP SELLING VALUE FOR...',
      price: 1814,
      originalPrice: 2419,
      discount: 25,
      memberPrice: 1451,
      icon: '💊',
      reportHours: 10,
      rating: 4.6,
      reviews: 124,
      recommendedFor: 'Adults with fatigue or weakness',
      benefits: ['Identify nutritional deficiencies', 'Guide supplement needs']
    },
    {
      id: 5,
      name: 'Apollo Complete Health Checkup',
      description: '87 Tests: Full Body Assessment...',
      tag: 'BEST SELLER',
      price: 3200,
      originalPrice: 4000,
      discount: 20,
      memberPrice: 2560,
      icon: '🏥',
      reportHours: 24,
      rating: 4.9,
      reviews: 312,
      recommendedFor: 'Adults of all ages',
      benefits: ['Comprehensive health assessment', 'One-time annual checkup']
    },
    {
      id: 6,
      name: 'Apollo Senior Citizen Package',
      description: '72 Tests: Comprehensive Senior Care...',
      tag: 'RECOMMENDED',
      price: 2800,
      originalPrice: 3500,
      discount: 20,
      memberPrice: 2240,
      icon: '👵',
      reportHours: 24,
      rating: 4.8,
      reviews: 186,
      recommendedFor: 'Adults 60+ years',
      benefits: ['Age-specific screenings', 'Chronic disease management']
    }
  ];

  // Health blog data
  export const healthBlogs = [
    {
      id: 1,
      title: "Understanding Your Blood Test Results",
      excerpt: "Learn how to interpret common blood test parameters and what they indicate about your health.",
      author: "Dr. Anita Sharma",
      date: "April 10, 2025",
      readTime: "5 min read",
      image: "/api/placeholder/400/250"
    },
    {
      id: 2,
      title: "Why Regular Health Checkups Are Essential",
      excerpt: "Regular health screenings can detect problems before they start or early when treatments work best.",
      author: "Dr. Rajiv Kumar",
      date: "April 8, 2025",
      readTime: "4 min read",
      image: "/api/placeholder/400/250"
    },
    {
      id: 3,
      title: "Fasting vs Non-Fasting Blood Tests: What's the Difference?",
      excerpt: "Understand when and why fasting is required for certain blood tests and how it affects results.",
      author: "Dr. Priya Nair",
      date: "April 5, 2025",
      readTime: "6 min read",
      image: "/api/placeholder/400/250"
    },
    {
      id: 4,
      title: "Managing Diabetes Through Regular Testing",
      excerpt: "Learn about the importance of monitoring blood glucose levels and other critical tests for diabetics.",
      author: "Dr. Sanjay Gupta",
      date: "April 2, 2025",
      readTime: "7 min read",
      image: "/api/placeholder/400/250"
    }
  ];

  // Customer testimonials
  export const testimonials = [
    {
      id: 1,
      name: "Priya Singh",
      age: 34,
      location: "Delhi",
      comment: "The home sample collection was so convenient! The phlebotomist was professional and I received my reports within 10 hours. Highly recommended.",
      rating: 5
    },
    {
      id: 2,
      name: "Rahul Verma",
      age: 45,
      location: "Gurgaon",
      comment: "Apollo's comprehensive health package helped me identify early signs of high cholesterol. The doctor consultation included in the package was very helpful.",
      rating: 5
    },
    {
      id: 3,
      name: "Anita Desai",
      age: 62,
      location: "Noida",
      comment: "As a senior citizen, I appreciate the special care taken during sample collection. The reports were easy to understand with color indicators.",
      rating: 4
    }
  ];

  // Lab benefits