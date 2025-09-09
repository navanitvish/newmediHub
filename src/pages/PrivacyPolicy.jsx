import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-blue-600">Smart Care</h1>
        <h2 className="text-2xl font-semibold text-gray-800">Privacy Policy</h2>
         <div className="mb-8 text-gray-700 flex justify-center space-x-6 p-2 font-semibold">
        <p className="text-sm mb-2">Applicable to: www.smartcare.com</p>
        <p className="text-sm mb-2">Effective Date: January 1, 2024</p>
        <p className="text-sm">Last Updated: June 23, 2025</p>
      </div>
      </div>

      {/* Policy Info */}
     

      {/* Introduction */}
      <section className="mb-8">
        <p className="mb-4 text-gray-800">
          At Smart Care, we are committed to protecting your privacy and ensuring the security of your personal information. 
          This Privacy Policy explains how we collect, use, store, and protect your data when you use our healthcare services, 
          website, mobile application, and related services.
        </p>
      </section>

      {/* Information We Collect */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">1. Information We Collect</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-blue-600">Personal Information</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-800">
            <li>Name, email address, phone number, and mailing address</li>
            <li>Date of birth, gender, and emergency contact information</li>
            <li>Government-issued ID numbers (for identity verification)</li>
            <li>Payment information (credit card, billing address)</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-blue-600">Health Information</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-800">
            <li>Medical history, symptoms, and health conditions</li>
            <li>Prescription and medication information</li>
            <li>Lab test results and diagnostic reports</li>
            <li>Doctor consultations and treatment records</li>
            <li>Health insurance information</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-blue-600">Technical Information</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-800">
            <li>IP address, device type, and browser information</li>
            <li>Location data (with your permission)</li>
            <li>App usage patterns and preferences</li>
            <li>Cookies and tracking technologies data</li>
          </ul>
        </div>
      </section>

      {/* How We Use Information */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-800">
          <li>Provide healthcare services, consultations, and medical support</li>
          <li>Process lab test bookings and deliver reports</li>
          <li>Facilitate doctor appointments and telemedicine consultations</li>
          <li>Process payments and maintain billing records</li>
          <li>Send appointment reminders and health notifications</li>
          <li>Improve our services and develop new healthcare features</li>
          <li>Comply with legal and regulatory requirements</li>
          <li>Prevent fraud and ensure platform security</li>
        </ul>
      </section>

      {/* Data Protection */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">3. Data Protection & Security</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-800">
          <li>All data is encrypted in transit and at rest using industry-standard protocols</li>
          <li>Secure servers with regular security audits and monitoring</li>
          <li>Access restricted to authorized healthcare professionals and support staff</li>
          <li>Multi-factor authentication for sensitive operations</li>
          <li>Regular data backups and disaster recovery procedures</li>
          <li>Compliance with HIPAA and other healthcare privacy regulations</li>
        </ul>
      </section>

      {/* Cookies and Tracking */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">4. Cookies and Tracking Technologies</h2>
        <p className="mb-3 text-gray-800">We use cookies and similar technologies to:</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-800">
          <li>Remember your login preferences and settings</li>
          <li>Personalize your healthcare experience</li>
          <li>Analyze website usage and improve functionality</li>
          <li>Provide targeted health information and reminders</li>
          <li>Enable social media integration features</li>
        </ul>
        <p className="mt-3 text-gray-800">
          You can control cookie settings through your browser preferences.
        </p>
      </section>

      {/* Information Sharing */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">5. Information Sharing</h2>
        <p className="mb-3 text-gray-800">We may share your information with:</p>
        
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 text-blue-600">Healthcare Providers</h3>
          <ul className="list-disc pl-6 space-y-1 text-gray-800">
            <li>Doctors, specialists, and healthcare professionals for treatment</li>
            <li>Laboratories and diagnostic centers for test processing</li>
            <li>Pharmacies for prescription fulfillment</li>
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 text-blue-600">Service Providers</h3>
          <ul className="list-disc pl-6 space-y-1 text-gray-800">
            <li>Payment processors and financial institutions</li>
            <li>Delivery services for medicine and test kit delivery</li>
            <li>Technology vendors for platform maintenance</li>
            <li>Customer support and communication services</li>
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 text-blue-600">Legal Requirements</h3>
          <ul className="list-disc pl-6 space-y-1 text-gray-800">
            <li>Government agencies as required by law</li>
            <li>Healthcare regulators and licensing boards</li>
            <li>Legal proceedings and court orders</li>
          </ul>
        </div>
      </section>

      {/* Your Rights */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">6. Your Privacy Rights</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-800">
          <li><strong>Access:</strong> Request a copy of your personal information</li>
          <li><strong>Correction:</strong> Update or correct inaccurate information</li>
          <li><strong>Deletion:</strong> Request deletion of your personal data (subject to legal requirements)</li>
          <li><strong>Portability:</strong> Request transfer of your data to another provider</li>
          <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
          <li><strong>Consent Withdrawal:</strong> Withdraw consent for data processing</li>
        </ul>
        <p className="mt-3 text-gray-800">
          To exercise these rights, contact us at <a href="mailto:privacy@smartcare.com" className="text-blue-600 underline hover:text-blue-700">privacy@smartcare.com</a>
        </p>
      </section>

      {/* Data Retention */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">7. Data Retention</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-800">
          <li>Personal information: Retained as long as your account is active</li>
          <li>Health records: Retained for 7 years as per medical regulations</li>
          <li>Payment information: Retained for 3 years for tax and audit purposes</li>
          <li>Marketing data: Retained until you opt-out</li>
          <li>Technical logs: Retained for 1 year for security purposes</li>
        </ul>
      </section>

      {/* International Transfers */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">8. International Data Transfers</h2>
        <p className="text-gray-800">
          Your information may be transferred to and processed in countries other than your own. 
          We ensure adequate protection through appropriate safeguards, including standard contractual clauses 
          and certification schemes approved by regulatory authorities.
        </p>
      </section>

      {/* Children's Privacy */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">9. Children's Privacy</h2>
        <p className="text-gray-800">
          Smart Care services are not intended for children under 13. We do not knowingly collect personal 
          information from children under 13. For users between 13-17, parental consent is required for 
          account creation and health services.
        </p>
      </section>

      {/* Updates to Policy */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">10. Updates to This Policy</h2>
        <p className="text-gray-800">
          We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. 
          We will notify you of significant changes via email or app notification. The updated policy will be 
          effective immediately upon posting.
        </p>
      </section>

      {/* Contact Information */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">11. Contact Us</h2>
        <p className="mb-3 text-gray-800">
          If you have questions about this Privacy Policy or our data practices, contact us:
        </p>
        <div className="space-y-2 text-gray-800">
          <p><strong>Email:</strong> <a href="mailto:privacy@smartcare.com" className="text-blue-600 underline hover:text-blue-700">privacy@smartcare.com</a></p>
          <p><strong>Phone:</strong> <a href="tel:+1-800-SMARTCARE" className="text-blue-600 underline hover:text-blue-700">1-800-SMARTCARE</a></p>
          <p><strong>Address:</strong> Smart Care Privacy Office, 123 Healthcare Blvd, Medical City, MC 12345</p>
          <p><strong>Data Protection Officer:</strong> <a href="mailto:dpo@smartcare.com" className="text-blue-600 underline hover:text-blue-700">dpo@smartcare.com</a></p>
        </div>
      </section>

      {/* Footer */}
      <div className="mt-12 pt-6">
        <p className="text-sm text-gray-600 text-center">
          This Privacy Policy is effective as of the date above and governs our collection, use, and disclosure 
          of your information. By using Smart Care services, you agree to this Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;