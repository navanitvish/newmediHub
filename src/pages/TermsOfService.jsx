import React from 'react';
import { Shield, FileText, Clock, AlertCircle, Scale, MapPin } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen  py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header Section */}
        <div className=" p-6  ">
               <div className="text-center mb-3">
                 <h1 className="text-3xl font-bold mb-2 text-blue-600">Smart Care</h1>
                 <div className="flex items-center justify-center gap-3 mb-4">
                   <Shield className="w-8 h-8 text-blue-600" />
                   <h1 className="text-2xl text-center font-bold text-gray-800">
                     Terms of Service
                   </h1>
                 </div>
                 <div className="mb-8 text-gray-700 flex justify-center space-x-6 p-2 font-semibold">
                   <p className="text-sm mb-2">Applicable to: www.smartcare.com</p>
                   <p className="text-sm mb-2">Effective Date: January 1, 2024</p>
                   <p className="text-sm">Last Updated: June 23, 2025</p>
                 </div>
               </div>
             </div>

        {/* Terms Content */}
        <div className="space-y-8">
          
          {/* Acceptance of Terms */}
          <div className=" p-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-blue-600">1. Acceptance of Terms</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>
                By accessing, browsing, or using the Smart Care website and mobile application, or by booking any health checkup services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
              <p>
                If you do not agree with any part of these terms, you must not use our services. These terms constitute a legally binding agreement between you and Smart Care.
              </p>
              <div className="bg-blue-50 rounded-lg p-4 mt-4">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> By proceeding with any booking or payment, you confirm your acceptance of these terms and our Privacy Policy.
                </p>
              </div>
            </div>
          </div>

          {/* Service Description */}
          <div className=" p-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-blue-600">2. Service Description</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>
                Smart Care provides online health checkup booking services, including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Comprehensive health checkup packages</li>
                <li>Individual diagnostic tests and screenings</li>
                <li>Home sample collection services</li>
                <li>Digital health reports and consultations</li>
                <li>Preventive health monitoring and tracking</li>
              </ul>
              <p>
                All health services are provided by certified laboratories and healthcare professionals. Service descriptions, test specifications, and package details are subject to updates based on medical guidelines and laboratory capabilities.
              </p>
            </div>
          </div>

          {/* Booking & Payment Policy */}
          <div className=" p-8">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-blue-600">3. Booking & Payment Policy</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">3.1 Booking Process</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>All bookings are subject to availability and confirmation</li>
                  <li>You must provide accurate personal and medical information</li>
                  <li>Appointment slots are reserved upon successful payment</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">3.2 Payment Terms</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Payment must be completed at the time of booking</li>
                  <li>We accept major credit cards, debit cards, UPI, and digital wallets</li>
                  <li>All prices are inclusive of applicable taxes</li>
                  <li>Promotional discounts are subject to terms and conditions</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">3.3 Cancellation & Rescheduling</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Free cancellation up to 4 hours before scheduled appointment</li>
                  <li>Rescheduling allowed once without additional charges</li>
                  <li>No-show appointments are non-refundable</li>
                  <li>Emergency cancellations will be reviewed case-by-case</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Privacy & Data Protection */}
          <div className="  p-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-blue-600">4. Privacy & Data Protection</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>
                Your privacy and the security of your health information are our top priorities. We are committed to protecting your personal and medical data in accordance with applicable data protection laws.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>All health data is encrypted and stored securely</li>
                <li>Medical reports are accessible only to you and authorized healthcare providers</li>
                <li>We do not share personal information with third parties without consent</li>
                <li>You have the right to access, modify, or delete your personal data</li>
              </ul>
              <div className="bg-gray-50 rounded-lg p-4 mt-4">
                <p className="text-sm text-gray-800">
                  For detailed information about how we collect, use, and protect your data, please refer to our comprehensive Privacy Policy.
                </p>
              </div>
            </div>
          </div>

          {/* Service Quality & Limitations */}
          <div className="  p-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-blue-600">5. Service Quality & Limitations</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">5.1 Service Standards</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>All tests are conducted by NABL-accredited laboratories</li>
                  <li>Sample collection by trained and certified technicians</li>
                  <li>Digital reports delivered within specified timeframes</li>
                  <li>Customer support available for queries and assistance</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">5.2 Service Limitations</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Services may be unavailable during maintenance periods</li>
                  <li>Some tests may require fasting or specific preparations</li>
                  <li>Emergency medical services are not provided through our platform</li>
                  <li>Results should be interpreted by qualified healthcare professionals</li>
                </ul>
              </div>

              <div className="bg-yellow-50 rounded-lg p-4 mt-4">
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> Our services are for diagnostic and preventive purposes only. In case of medical emergencies, please contact emergency services immediately.
                </p>
              </div>
            </div>
          </div>

          {/* Liability & Warranty */}
          <div className="  p-8">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-blue-600">6. Liability & Warranty</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">6.1 Service Warranty</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>We guarantee accurate test results within standard laboratory parameters</li>
                  <li>Repeat testing at no additional cost if technical errors occur</li>
                  <li>Timely delivery of reports as per specified schedules</li>
                  <li>Professional sample collection and handling procedures</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">6.2 Limitation of Liability</h3>
                <p>
                  Our liability is limited to the cost of the specific service purchased. We are not liable for any indirect, incidental, or consequential damages arising from the use of our services. This includes but is not limited to medical decisions made based on test results.
                </p>
              </div>

              <div className="bg-red-50 rounded-lg p-4 mt-4">
                <p className="text-sm text-red-800">
                  <strong>Smart Care Disclaimer:</strong> Test results should always be interpreted by qualified healthcare professionals. Do not make medical decisions based solely on test results without consulting a doctor.
                </p>
              </div>
            </div>
          </div>

          {/* Legal Jurisdiction */}
          <div className="  p-8">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-blue-600">7. Legal Jurisdiction & Governing Law</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">7.1 Governing Law</h3>
                <p>
                  These Terms of Service are governed by and construed in accordance with the laws of India, including but not limited to the Information Technology Act, 2000, and Consumer Protection Act, 2019.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">7.2 Jurisdiction</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>All disputes arising from these terms shall be subject to the exclusive jurisdiction of courts in Ghaziabad, Uttar Pradesh, India</li>
                  <li>Any legal proceedings must be conducted in English language</li>
                  <li>Disputes will first be attempted to be resolved through mediation</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">7.3 Dispute Resolution</h3>
                <p>
                  We encourage resolving disputes through our customer support team first. For unresolved issues, we prefer alternative dispute resolution methods before pursuing legal action.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-blue-600 rounded-lg shadow-sm p-8 text-white">
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Email:</p>
                <p>support@SmartCare.com</p>
                <p>legal@SmartCare.com</p>
              </div>
              <div>
                <p className="font-medium">Phone:</p>
                <p>+91-XXXX-XXXXXX</p>
                <p>Customer Support: 24/7</p>
              </div>
              <div>
                <p className="font-medium">Address:</p>
                <p>Smart Care Healthcare Pvt. Ltd.</p>
                <p>Jaypur, India</p>
              </div>
              <div>
                <p className="font-medium">Business Hours:</p>
                <p>Monday - Sunday</p>
                <p>6:00 AM - 10:00 PM IST</p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            These terms may be updated periodically. Continued use of our services constitutes acceptance of any changes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;