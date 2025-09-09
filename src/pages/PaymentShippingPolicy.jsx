import React from "react";
import {
  Shield,
  CreditCard,
  Truck,
  Clock,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
} from "lucide-react";

const PaymentShippingPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto p-8  min-h-screen">
      {/* Header Section */}
      <div className=" p-6 mb-8 ">
        <div className="text-center mb-3">
          <h1 className="text-3xl font-bold mb-2 text-blue-600">Smart Care</h1>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl text-center font-bold text-gray-800">
              Payment & Shipping Policy
            </h1>
          </div>
          <div className="mb-8 text-gray-700 flex justify-center space-x-6 p-2 font-semibold">
            <p className="text-sm mb-2">Applicable to: www.smartcare.com</p>
            <p className="text-sm mb-2">Effective Date: January 1, 2024</p>
            <p className="text-sm">Last Updated: June 23, 2025</p>
          </div>
        </div>
      </div>

      {/* Payment Methods Section */}
      <section className=" p-6 mb-2">
        <div className="flex items-center gap-3 mb-6">
          <CreditCard className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-semibold text-gray-800">
            Payment Methods
          </h2>
        </div>

        <p className="mb-6 text-gray-700 leading-relaxed">
          We offer a comprehensive range of secure payment options designed to
          provide maximum convenience and flexibility for our customers:
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-600 mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Accepted Payment Methods
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Credit Cards (Visa, MasterCard, American Express)</li>
              <li>• Debit Cards</li>
              <li>• Net Banking (All major banks)</li>
              <li>• UPI (PhonePe, Google Pay, Paytm)</li>
              <li>• Digital Wallets</li>
              <li>• EMI Options (3, 6, 9, 12 months)</li>
              <li>• Cash on Delivery (COD)</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-600 mb-3">
              COD Terms & Conditions
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• Available in select serviceable pin codes only</li>
              <li>• Maximum order value: ₹50,000</li>
              <li>• Additional COD charges: ₹50 per order</li>
              <li>• Valid ID proof required at delivery</li>
              <li>• Exact change appreciated</li>
            </ul>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Security & Protection
          </h3>
          <p className="text-green-700 text-sm">
            All transactions are secured with 256-bit SSL encryption and
            processed through PCI DSS compliant payment gateways including
            Razorpay, Stripe, and PayU. We never store your payment information.
          </p>
        </div>
      </section>

      {/* Order Processing Section */}
      <section className=" p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-semibold text-gray-800">
            Order Processing
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="font-bold">1</span>
            </div>
            <h3 className="font-semibold text-blue-600 mb-2">
              Order Confirmation
            </h3>
            <p className="text-sm text-gray-600">
              Instant email & SMS confirmation upon successful payment
            </p>
          </div>

          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="font-bold">2</span>
            </div>
            <h3 className="font-semibold text-blue-600 mb-2">Processing</h3>
            <p className="text-sm text-gray-600">
              Orders processed within 24 hours on business days
            </p>
          </div>

          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="font-bold">3</span>
            </div>
            <h3 className="font-semibold text-blue-600 mb-2">Dispatch</h3>
            <p className="text-sm text-gray-600">
              Tracking details shared via email & SMS
            </p>
          </div>
        </div>
      </section>

      {/* Shipping & Delivery Section */}
      <section className=" p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Truck className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-semibold text-gray-800">
            Shipping & Delivery
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-semibold text-blue-600 mb-3">
              Delivery Partners
            </h3>
            <p className="text-gray-700 mb-3">
              We partner with India's most reliable logistics providers:
            </p>
            <ul className="space-y-1 text-gray-700">
              <li>• Blue Dart Express</li>
              <li>• Delhivery</li>
              <li>• Ekart Logistics</li>
              <li>• FedEx</li>
              <li>• India Post</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-blue-600 mb-3">
              Delivery Timeline
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-gray-700">Metro Cities</span>
                <span className="font-semibold text-blue-600">2-4 days</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-gray-700">Tier 2 Cities</span>
                <span className="font-semibold text-blue-600">3-5 days</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-gray-700">Rural Areas</span>
                <span className="font-semibold text-blue-600">5-7 days</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-600 mb-2">Shipping Charges</h3>
          <p className="text-blue-700 text-sm mb-2">
            Shipping charges are calculated based on product weight, dimensions,
            and delivery location.
          </p>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• Free shipping on orders above ₹999</li>
            <li>• Standard shipping: ₹50-150 depending on location</li>
            <li>• Express delivery available in select cities</li>
          </ul>
        </div>
      </section>

      {/* Tracking & Support Section */}
      <section className=" p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <MapPin className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-semibold text-gray-800">
            Order Tracking & Support
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-blue-600 mb-3">
              Real-Time Tracking
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Tracking ID shared via email & SMS</li>
              <li>• Real-time status updates</li>
              <li>• Estimated delivery time</li>
              <li>• Delivery attempt notifications</li>
              <li>• Proof of delivery with signature</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-blue-600 mb-3">
              Delivery Issues
            </h3>
            <p className="text-gray-700 mb-3">
              In case of delays due to unforeseen circumstances such as:
            </p>
            <ul className="space-y-1 text-gray-700 mb-3">
              <li>• Adverse weather conditions</li>
              <li>• Transportation strikes</li>
              <li>• Regulatory restrictions</li>
              <li>• Force majeure events</li>
            </ul>
            <p className="text-sm text-gray-600">
              We will proactively communicate with updated delivery timelines
              and alternative solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Returns & Refunds Section */}
      <section className=" rounded-lg  p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-semibold text-gray-800">
            Returns & Refunds
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-600 mb-3">Return Policy</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• 7-day return window from delivery date</li>
              <li>• Items must be unused and in original packaging</li>
              <li>• Original invoice required</li>
              <li>• Free return pickup available</li>
              <li>
                • Certain items are non-returnable (perishables, personal care)
              </li>
            </ul>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-600 mb-3">
              Refund Process
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• Refunds processed within 7-10 business days</li>
              <li>• Amount credited to original payment method</li>
              <li>• COD orders refunded via bank transfer</li>
              <li>• Refund status notifications via email/SMS</li>
              <li>• Partial refunds for damaged items</li>
            </ul>
          </div>
        </div>
      </section>

      {/* International Shipping Section */}
      <section className=" p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Truck className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-semibold text-gray-800">
            International Shipping
          </h2>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <p className="text-yellow-700 text-sm">
            <strong>Currently Available:</strong> We offer international
            shipping to select countries. Additional customs duties and taxes
            may apply based on destination country regulations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-blue-600 mb-2">Delivery Time</h4>
            <p className="text-sm text-gray-600">7-15 business days</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-blue-600 mb-2">Shipping Cost</h4>
            <p className="text-sm text-gray-600">Calculated at checkout</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-blue-600 mb-2">Tracking</h4>
            <p className="text-sm text-gray-600">Full tracking available</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className=" p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Need Help?
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <Phone className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-blue-600 mb-2">Phone Support</h3>
            <p className="text-sm text-gray-600">1800-XXX-XXXX</p>
            <p className="text-xs text-gray-500">Mon-Sat, 9 AM - 7 PM</p>
          </div>

          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <Mail className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-blue-600 mb-2">Email Support</h3>
            <p className="text-sm text-gray-600">support@yourwebsite.com</p>
            <p className="text-xs text-gray-500">Response within 24 hours</p>
          </div>

          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-blue-600 mb-2">Live Chat</h3>
            <p className="text-sm text-gray-600">Available on website</p>
            <p className="text-xs text-gray-500">24/7 automated assistance</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 text-center">
            <span className="font-semibold text-blue-600">Note:</span> This
            policy is subject to change without prior notice. Please check this
            page regularly for updates. For any queries or clarifications, feel
            free to contact our customer support team.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PaymentShippingPolicy;
