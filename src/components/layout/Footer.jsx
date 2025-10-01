// src/components/layout/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Footer Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex flex-col mb-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              MediSeve
              </h1>

            </div>


            <p className="text-gray-400 mb-4">
              India's leading diagnostic services provider, offering precise
              laboratory tests and health checkups with home collection across
              major cities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/lab-tests"
                  className="text-gray-400 hover:text-white transition"
                >
                  Lab Tests
                </Link>
              </li>
              <li>
                <Link
                  to="/health-packages"
                  className="text-gray-400 hover:text-white transition"
                >
                  Health Packages
                </Link>
              </li>
              <li>
                <Link
                  to="/health-articles"
                  className="text-gray-400 hover:text-white transition"
                >
                  Health Articles
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-gray-400 hover:text-white transition"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white transition"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Tests & Packages */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tests & Packages</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/tests/diabetes"
                  className="text-gray-400 hover:text-white transition"
                >
                  Diabetes Tests
                </Link>
              </li>
              <li>
                <Link
                  to="/tests/thyroid"
                  className="text-gray-400 hover:text-white transition"
                >
                  Thyroid Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/tests/vitamin"
                  className="text-gray-400 hover:text-white transition"
                >
                  Vitamin Tests
                </Link>
              </li>
              <li>
                <Link
                  to="/packages/full-body"
                  className="text-gray-400 hover:text-white transition"
                >
                  Full Body Checkup
                </Link>
              </li>
              <li>
                <Link
                  to="/packages/women-health"
                  className="text-gray-400 hover:text-white transition"
                >
                  Women's Health
                </Link>
              </li>
              <li>
                <Link
                  to="/packages/cardiac"
                  className="text-gray-400 hover:text-white transition"
                >
                  Heart Checkup
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin
                  size={20}
                  className="text-blue-400 mr-3 mt-1 flex-shrink-0"
                />
                <span className="text-gray-400">
                  FLOOR 2, B88, B89, UNIT NO S2,
                  SHYAM MITRA MANDAL, MURLIPURA
                  Jaipur, Rajasthan, India- 302039
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-blue-400 mr-3 flex-shrink-0" />
                <span className="text-gray-400">+91 7976379263</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-blue-400 mr-3 flex-shrink-0" />
                <span className="text-gray-400">support@smartcare.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Download App Section */}
        <div className="border-t border-gray-800 pt-8 pb-6 mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">
                Download the Smart Care App
              </h3>
              <p className="text-gray-400">
                Get exclusive offers and manage your health on the go
              </p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="block">
                <img
                  src="/api/placeholder/140/45"
                  alt="Download on App Store"
                  className="h-12"
                />
              </a>
              <a href="#" className="block">
                <img
                  src="/api/placeholder/140/45"
                  alt="Get it on Google Play"
                  className="h-12"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        {/* <div className="border-t border-gray-800 pt-6 pb-4 mb-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-sm font-medium">Accepted Payment Methods</h3>
            </div>
            <div className="flex space-x-3">
              {['Visa', 'Mastercard', 'PayPal', 'GPay', 'PhonePe'].map((method) => (
                <div key={method} className="bg-gray-800 text-xs px-3 py-1 rounded">
                  {method}
                </div>
              ))}
            </div>
          </div>
        </div> */}

        {/* Copyright Section */}
        <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} Smart Care Diagnostics. All rights
            reserved.
          </p>
          <div className="mt-2 flex justify-center space-x-4">
            <Link
              to="privacy-policy"
              className="hover:text-gray-300 transition"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="hover:text-gray-300 transition"
            >
              Terms of Service
            </Link>
            <Link
              to="/replacement-policy"
              className="hover:text-gray-300 transition"
            >
              Refund & Replacement Policy{" "}
            </Link>
            <Link
              to="/payement-shipping-policy"
              className="hover:text-gray-300 transition"
            >
              Payment & shipping Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
