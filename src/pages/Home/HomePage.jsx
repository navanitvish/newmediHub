// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import EnhancedHeroSection from './HeroSection';

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
      <div className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Find Quality Care</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Recommended Labs
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Top-rated diagnostic centers near you, trusted by our healthcare network.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-8 md:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {recommendedLabs.map((lab) => (
              <motion.div
                key={lab.id}
                className="  overflow-hidden hover:rounded-2xl hover:shadow-lg  transition-shadow duration-300"
                variants={itemVariants}
              >
                <img src={lab.image} alt={lab.name} className="w-full h-76 object-cover rounded-2xl " />
                <div className="p-6 ">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-bold text-gray-900">{lab.name}</h3>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1 text-gray-700">{lab.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-500 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{lab.distance} away</span>
                  </div>
                  <button className="w-36 items-center bg-gradient-to-r from-blue-500 to-indigo-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300">
                    Book Test
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Link
              to="/labs"
              className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 border border-blue-600 rounded-full px-6 py-3" 
            >
              View All Labs
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Feature section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Healthcare Services at Your Fingertips
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Access medical services, track your health, and manage appointments with ease.
            </p>
          </motion.div>

          <motion.div
            className="mt-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <motion.div
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                variants={itemVariants}
              >
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 text-white mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Secure Authentication</h3>
                <p className="text-base text-gray-500">
                  Multi-factor authentication with OTP verification for enhanced security and protected health information.
                </p>
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                variants={itemVariants}
              >
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 text-white mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Quick Appointments</h3>
                <p className="text-base text-gray-500">
                  Book doctor appointments with just a few clicks and get medical attention when you need it most.
                </p>
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                variants={itemVariants}
              >
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 text-white mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Health Monitoring</h3>
                <p className="text-base text-gray-500">
                  Access your lab reports, track health metrics, and get personalized wellness recommendations.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Trusted by Users section */}
      <div className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Growing Community</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by Users Every Month
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Join thousands of users who trust our platform for their healthcare needs.
          </p>
        </motion.div>

        
        {/* Healthcare Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 text-white p-6 rounded-xl text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ translateY: -5 }}
            >
              <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm md:text-base font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Safety Measures */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">100% Safe  And Secure Lab Tests</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {safetyMeasures.map((measure, index) => (
              <motion.div 
                key={index}
                className="flex items-center p-3 bg-blue-50 rounded-lg"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0 mr-3 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">{measure}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* CTA Section */}
        {/* <motion.div
          className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-8 text-center text-white shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-4">Join Our Growing Community</h3>
          <p className="mb-6 max-w-2xl mx-auto">Experience better healthcare with our secure and convenient platform. Join thousands of satisfied users today.</p>
          <Link
            to="/register"
            className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-full shadow-md hover:bg-blue-50 transform hover:scale-105 transition duration-300"
          >
            Sign Up Now
          </Link>
        </motion.div> */}
      </div>
    </div>

      {/* Testimonial section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Testimonials</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              What Our Users Say
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-8 md:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow"
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold">JD</span>
                </div>
                <div>
                  <h4 className="font-medium">John Doe</h4>
                  <p className="text-sm text-gray-500">Patient</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "This platform has made managing my healthcare so much easier. I can book appointments and access my reports all in one place."
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-lg shadow"
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                  <span className="text-green-600 font-bold">AS</span>
                </div>
                <div>
                  <h4 className="font-medium">Anna Smith</h4>
                  <p className="text-sm text-gray-500">Patient</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The 10-minute doctor appointment feature saved me when I needed urgent medical advice. Highly recommended!"
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-lg shadow"
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                  <span className="text-purple-600 font-bold">RJ</span>
                </div>
                <div>
                  <h4 className="font-medium">Dr. Robert Johnson</h4>
                  <p className="text-sm text-gray-500">Physician</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "As a doctor, this platform helps me manage my patients more efficiently and provide better care with secure access to their health records."
              </p>
            </motion.div>
          </motion.div>



        </div>
      </div>


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



    </div>
  );
};

export default Home;