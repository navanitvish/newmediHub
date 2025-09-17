import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const SimpleFAQ = () => {
  const [expandedFaqId, setExpandedFaqId] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How do I create my first healthcare profile?",
      answer: "Creating your healthcare profile is simple and secure. Click on 'Sign Up' and follow our guided setup process. You'll need to provide basic information, verify your identity, and set up your preferences. Our system uses bank-level encryption to protect all your data."
    },
    {
      id: 2,
      question: "Can I book same-day appointments with specialists?",
      answer: "Yes! We offer same-day appointments with many of our specialists. Use our real-time availability checker to see open slots. Premium members get priority booking and can reserve appointments up to 30 days in advance."
    },
    {
      id: 3,
      question: "What insurance plans do you accept?",
      answer: "We accept over 200 insurance plans including major providers like Blue Cross Blue Shield, Aetna, Cigna, and UnitedHealth. Our system automatically verifies your coverage and shows your exact copay before booking."
    },
    {
      id: 4,
      question: "How secure are virtual consultations?",
      answer: "Our telemedicine platform is HIPAA-compliant and uses end-to-end encryption. All video calls are secured with 256-bit encryption, and we never store recordings. Your privacy and security are our top priorities."
    },
    {
      id: 5,
      question: "Can doctors prescribe medications through the platform?",
      answer: "Absolutely! Our licensed physicians can prescribe medications directly through the platform. Prescriptions are sent electronically to your preferred pharmacy, and we can even arrange home delivery for most medications."
    },
    {
      id: 6,
      question: "How quickly will I receive my lab results?",
      answer: "Most lab results are available within 24-48 hours. Urgent results are flagged and communicated immediately. You'll receive notifications via app, email, or SMS when results are ready."
    }
  ];

  const toggleFaq = (id) => {
    setExpandedFaqId(expandedFaqId === id ? null : id);
  };

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
      {/* Header */}
      <div className="text-center mb-12">

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-8 ">
          <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
            Frequently
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Asked Questions
          </span>
        </h2>
        <p className="text-xl text-gray-600">
          Find quick answers to common questions about our services
        </p>
      </div>
      <div className='flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 '>
        <div className='w'>
          <img 
          src="https://cdn.dribbble.com/userupload/15239840/file/original-551f6458d5274560d7e25661240f6e51.png?resize=1200x1200&vertical=center"
           alt="" 
           className='w-full h-full object-cover rounded-2xl'

           />

        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ">


          {/* FAQ Items */}
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-8 py-6 text-left flex justify-between items-center focus:outline-none focus:ring-4 focus:ring-blue-100 hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`p-2 rounded-full bg-blue-50 transition-all duration-300 ${expandedFaqId === faq.id ? 'rotate-180 bg-blue-100' : ''
                      }`}
                  >
                    <ChevronDown className="h-5 w-5 text-blue-600" />
                  </div>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${expandedFaqId === faq.id
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                    }`}
                >
                  <div className="px-8 pb-6 border-t border-gray-100">
                    <p className="text-gray-700 leading-relaxed pt-4">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleFAQ;