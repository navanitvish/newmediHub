// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import EnhancedHeroSection from './HeroSection';
import ModernLabsSection from './ModernLabsSection';
import ModernHealthcareFeatures from './ModernHealthcareFeatures';
import ModernCommunityStats from './ModernCommunityStats';
import ModernTestimonials from './ModernTestimonials';
import SimpleFAQ from './SimpleFAQ';

const Home = () => {

  // Sample data for recommended labs
  const [recommendedLabs, setRecommendedLabs] = useState([
    {
      id: 1,
      name: "HealthFirst Laboratory",
      rating: 4.8,
      distance: "1.2 km",
      image: "https://www.shutterstock.com/image-photo/doctor-hand-taking-blood-sample-600nw-1114244621.jpg"
    },
    {
      id: 2,
      name: "MediTest Labs",
      rating: 4.7,
      distance: "2.5 km",
      image: "https://img.freepik.com/free-photo/examining-sample-with-microscope_1098-18424.jpg?t=st=1742566006~exp=1742569606~hmac=b249867974795f2284d9042ca9f5738fc9431fb1f445718d32cb31b5cfd30bb1&w=1380"
    },
    {
      id: 3,
      name: "PrecisionDiagnostics",
      rating: 4.9,
      distance: "3.0 km",
      image: "https://img.freepik.com/free-photo/talented-chemists-workplace_1098-18432.jpg?t=st=1742566031~exp=1742569631~hmac=d5501ce5ec496ba4cb799e4afbd28bbdb53f876fedbb4a20285a7a7901ceb3e3&w=1380"
    }
  ]);


  const faqs = [
    {
      id: 1,
      question: "How do I create an account?",
      answer: "To create an account, click on the 'Register' button in the top right corner of the navigation bar. Fill in your details in the registration form including your name, email address, and password. Once submitted, you'll receive a confirmation email with a link to verify your account."
    },
    {
      id: 2,
      question: "What payment methods do you accept?",
      answer: "We accept a variety of payment methods including credit/debit cards (Visa, Mastercard, American Express), PayPal, and bank transfers. All payment information is securely processed and encrypted according to industry standards."
    },
    {
      id: 3,
      question: "How can I reset my password?",
      answer: "To reset your password, go to the login page and click on the 'Forgot Password' link. Enter your email address and we'll send you instructions on how to reset your password. For security reasons, password reset links expire after 24 hours."
    },
    {
      id: 4,
      question: "What is your refund policy?",
      answer: "We offer a 30-day money-back guarantee on all our premium plans. If you're not satisfied with our service, contact our support team within 30 days of purchase for a full refund. Refunds are typically processed within 5-7 business days."
    },
    {
      id: 5,
      question: "How do I cancel my subscription?",
      answer: "You can cancel your subscription at any time by going to your account settings and selecting 'Subscription'. Click on 'Cancel Subscription' and follow the prompts. Your account will remain active until the end of your current billing period."
    }
  ];

  // Sample data for trusted users


  const stats = [
    { value: '7,000+', label: 'Approved Diagnostic Centres' },
    { value: '3,000+', label: 'Lab Tests Offered' },
    { value: '5,000+', label: 'Pincodes Covered' },
    { value: '100%', label: 'Safe & Secure Lab Tests' }
  ];
  
  const safetyMeasures = [
    'Gov. Approved Diagnostic Centres',
    'Daily Temperature Check of all Technicians',
    'Mandatory use of Mask & Sanitizers',
    'Regular Disinfection of Labs'
  ];

  const [expandedFaqId, setExpandedFaqId] = useState(null);

  // Toggle FAQ expansion
  const toggleFaq = (id) => {
    if (expandedFaqId === id) {
      setExpandedFaqId(null);
    } else {
      setExpandedFaqId(id);
    }
  };

  // Animation variants
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="bg-white">
      {/* Hero section */}
      <EnhancedHeroSection/>
     

      {/* Recommended Lab section */}
     <ModernLabsSection/>

      {/* Feature section */}
     <ModernHealthcareFeatures/>

      {/* Trusted by Users section */}
     <ModernCommunityStats/>

      {/* Testimonial section */}
     <ModernTestimonials/>


      {/* FAQ Section */}
      <SimpleFAQ/>



    </div>
  );
};

export default Home;