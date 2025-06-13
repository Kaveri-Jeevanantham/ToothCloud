import React from 'react';
import Logo from '../ui/Logo';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <Logo variant="white" className="mb-4" />
            <p className="text-gray-300 mb-4">
              Your trusted dental care partner, providing comprehensive oral health services with modern technology and compassionate care.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com/toothcloud" 
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Follow ToothCloud on Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook size={24} />
              </a>
              <a 
                href="https://twitter.com/toothcloud" 
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Follow ToothCloud on Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter size={24} />
              </a>
              <a 
                href="https://instagram.com/toothcloud" 
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Follow ToothCloud on Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={24} />
              </a>
              <a 
                href="https://linkedin.com/company/toothcloud" 
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Follow ToothCloud on LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-3 text-teal-400" />
                <span className="text-gray-300">123 Dental Street, Healthcare City, HC 12345</span>
              </div>
              <div className="flex items-center">
                <FaPhone className="mr-3 text-teal-400" />
                <a href="tel:+1234567890" className="text-gray-300 hover:text-white">
                  (123) 456-7890
                </a>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-3 text-teal-400" />
                <a href="mailto:info@toothcloud.com" className="text-gray-300 hover:text-white">
                  info@toothcloud.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-gray-300 hover:text-white transition-colors">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © {currentYear} ToothCloud. All rights reserved. | Designed with care for your smile.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
