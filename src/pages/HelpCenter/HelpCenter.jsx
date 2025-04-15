import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HelpCenter = () => {
  // FAQ data
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

  // State to track which FAQ is expanded
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

  const heroTextVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-blue-50 min-h-screen overflow-hidden">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative  py-20 px-4 sm:px-6 lg:px-8 rounded-b-3xl "
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="absolute right-1/4 bottom-10 h-40 w-40 rounded-full bg-white"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.4 }}
            className="absolute left-1/3 top-1/3 h-32 w-32 rounded-full bg-white"
          />
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10 mt-16">
          <motion.h1 
            variants={heroTextVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl font-extrabold tracking-tight text-balck sm:text-5xl md:text-6xl"
          >
            How can we help you?
          </motion.h1>
          <motion.p 
            variants={heroTextVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-md mx-auto text-lg text-black sm:text-xl md:mt-5 md:max-w-3xl"
          >
            Our support team is here to assist you with any questions or issues you might have.
          </motion.p>

        
        </div>
      </motion.div>

      {/* Contact Cards Section */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-20"
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Phone Contact Card */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300"
          >
            <div className="p-8 flex flex-col items-center text-center">
              <motion.div 
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-4"
              >
                <svg className="h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600 mb-4">We're available Monday to Friday, 9AM to 6PM ET</p>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                href="tel:+1234567890" 
                className="text-lg font-medium text-blue-600 hover:text-blue-800 transition-colors"
              >
                +1 (234) 567-890
              </motion.a>
            </div>
          </motion.div>

          {/* Website Contact Card */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300"
          >
            <div className="p-8 flex flex-col items-center text-center">
              <motion.div 
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center mb-4"
              >
                <svg className="h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Visit Our Website</h3>
              <p className="text-gray-600 mb-4">Find resources, tutorials, and community forums</p>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                href="https://www.test.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-lg font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                www.test.com
              </motion.a>
            </div>
          </motion.div>

          {/* Email Contact Card */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300"
          >
            <div className="p-8 flex flex-col items-center text-center">
              <motion.div 
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center mb-4"
              >
                <svg className="h-8 w-8 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">We usually respond within 24 hours</p>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                href="mailto:email@test.com" 
                className="text-lg font-medium text-purple-600 hover:text-purple-800 transition-colors"
              >
                support@test.com
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.div>




        {/* FAQ Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl relative inline-block">
            Frequently Asked Questions
         
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Find quick answers to common questions about our services
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {faqs.map((faq) => (
            <motion.div 
              key={faq.id} 
              variants={itemVariants}
              className="bg-white overflow-hidden rounded-xl shadow-sm border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
              >
                <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                <motion.div
                  animate={{ rotate: expandedFaqId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    className="h-6 w-6 text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </button>
              <motion.div 
                animate={{
                  height: expandedFaqId === faq.id ? "auto" : 0,
                  opacity: expandedFaqId === faq.id ? 1 : 0
                }}
                initial={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>


        
      </motion.div>

      
      {/* Contact Form Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16 px-4 sm:px-6 lg:px-8 rounded-t-3xl mt-12 relative overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            animate={{ 
              x: [0, 10, 0], 
              y: [0, -10, 0] 
            }}
            transition={{ 
              duration: 8, 
              ease: "easeInOut", 
              repeat: Infinity 
            }}
            className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-indigo-100 opacity-50"
          />
          <motion.div 
            animate={{ 
              x: [0, -15, 0], 
              y: [0, 15, 0] 
            }}
            transition={{ 
              duration: 10, 
              ease: "easeInOut", 
              repeat: Infinity 
            }}
            className="absolute left-1/4 top-1/4 h-40 w-40 rounded-full bg-blue-100 opacity-40"
          />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl font-extrabold text-gray-900 sm:text-4xl"
          >
            Still need help?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-4 text-lg text-gray-600"
          >
            Send us a message and we'll get back to you as soon as possible
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-8"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all"
              >
                Contact Support
                <motion.svg 
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-2 -mr-1 h-5 w-5" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </motion.svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

     
    </div>
  );
};

export default HelpCenter;