import React from 'react';

const RefundReplacementPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2 text-blue-600">Smart Care</h1>
        <h2 className="text-2xl font-semibold text-gray-800">Refund & Replacement Policy</h2>
         <div className="mb-8 text-gray-700 flex justify-center space-x-6 p-2 font-semibold">
        <p className="text-sm mb-2">Applicable to: www.smartcare.com</p>
        <p className="text-sm mb-2">Effective Date: January 1, 2024</p>
        <p className="text-sm">Last Updated: June 23, 2025</p>
      </div>
      </div>

      {/* Replacement Policy Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">Replacement Policy</h2>
        
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-blue-600">Eligibility</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-800">
            <li>Replacement is requested within 24 hours of receiving the delivery</li>
            <li>Applicable only for damaged, defective, or incorrect products</li>
            <li>Products must be unused, in original condition, and returned with original packaging</li>
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-blue-600">Process</h3>
          <p className="mb-3 text-gray-800">
            Email your request to <a href="mailto:support@smartcare.com" className="text-blue-600 underline hover:text-blue-700">support@smartcare.com</a> with:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-800">
            <li>A valid Order ID</li>
            <li>Clear photographs of the product showing the defect or damage</li>
            <li>Brief description of the issue</li>
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-blue-600">Replacement Terms</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-800">
            <li>Replacement will be shipped at no additional cost if the item is available in stock</li>
            <li>If the item is out of stock, a full refund will be processed to the original payment method</li>
            <li>Promotional items must also be returned along with the original product</li>
            <li>Processing time: 2-3 business days after approval</li>
          </ul>
        </div>
      </section>

      {/* Refund Policy Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">Refund Policy</h2>
        
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-blue-600">Eligibility</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-800">
            <li>Refund requests must be made within 7 days of delivery</li>
            <li>Products must be unused and in original condition</li>
            <li>Original packaging, tags, and accessories must be included</li>
            <li>Personalized or customized items are not eligible for refund</li>
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-blue-600">Process</h3>
          <ol className="list-decimal pl-6 space-y-2 text-gray-800">
            <li>Contact Smart Care support at <a href="mailto:support@smartcare.com" className="text-blue-600 underline hover:text-blue-700">support@smartcare.com</a></li>
            <li>Provide your Order ID and reason for refund</li>
            <li>Ship back the product with provided return label</li>
            <li>Receive refund confirmation once item is inspected</li>
          </ol>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-blue-600">Refund Terms</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-800">
            <li>Refunds processed to original payment method</li>
            <li>Customer responsible for return shipping costs (unless product is defective)</li>
            <li>Processing time: 5-7 business days after we receive the returned item</li>
            <li>Items subject to quality inspection before refund approval</li>
          </ul>
        </div>
      </section>

      {/* Contact Information */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">Contact Smart Care Support</h2>
        <div className="space-y-3 text-gray-800">
          <p>
            <strong>Email:</strong> <a href="mailto:support@smartcare.com" className="text-blue-600 underline hover:text-blue-700">support@smartcare.com</a>
          </p>
          <p>
            <strong>Phone:</strong> <a href="tel:+1-800-SMARTCARE" className="text-blue-600 underline hover:text-blue-700">1-800-SMARTCARE</a>
          </p>
          <p>
            <strong>Business Hours:</strong> Monday-Friday: 9AM-6PM, Saturday: 10AM-4PM
          </p>
        </div>
      </section>

      {/* Footer Note */}
      <div className="mt-8">
        <p className="text-sm text-gray-600 text-center">
          <strong>Note:</strong> This policy is effective as of the date of purchase. Smart Care reserves the right to update this policy at any time.
        </p>
      </div>
    </div>
  );
};

export default RefundReplacementPolicy;