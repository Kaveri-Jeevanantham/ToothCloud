import React from 'react';
import Logo from '../ui/Logo';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt, FaArrowUp } from 'react-icons/fa';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gray-900 text-white relative">
      <div className="absolute right-6 -top-5">
        <button 
          onClick={scrollToTop}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:transform hover:scale-110"
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </button>
      </div>
      
      <div className="container mx-auto px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-4">
          {/* Logo and About */}
          <div className="animate-fadeIn">
            <Logo variant="white" className="transition-transform duration-300 hover:scale-105" />
            <p className="mt-6 text-gray-300 leading-relaxed">
              Providing quality dental care with the latest technology and a patient-centered approach.
            </p>
            <div className="flex mt-8 space-x-5">
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 hover:scale-125 transform inline-block">
                <FaFacebook size={22} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 hover:scale-125 transform inline-block">
                <FaTwitter size={22} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 hover:scale-125 transform inline-block">
                <FaInstagram size={22} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 hover:scale-125 transform inline-block">
                <FaLinkedin size={22} />
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div className="animate-fadeIn" style={{animationDelay: '0.2s'}}>
            <h3 className="text-xl font-semibold mb-6 text-teal-300">Contact Us</h3>
            <div className="space-y-5">
              <div className="flex items-start group">
                <FaMapMarkerAlt className="text-teal-400 mt-1 mr-3 group-hover:text-teal-300 transition-colors duration-300" />
                <span className="group-hover:text-teal-100 transition-colors duration-300">123 Dental Street, Medical District, City, 12345</span>
              </div>
              <div className="flex items-center group">
                <FaPhone className="text-teal-400 mr-3 group-hover:text-teal-300 transition-colors duration-300" />
                <span className="group-hover:text-teal-100 transition-colors duration-300">(555) 123-4567</span>
              </div>
              <div className="flex items-center group">
                <FaEnvelope className="text-teal-400 mr-3 group-hover:text-teal-300 transition-colors duration-300" />
                <span className="group-hover:text-teal-100 transition-colors duration-300">contact@toothcloud.com</span>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="animate-fadeIn" style={{animationDelay: '0.4s'}}>
            <h3 className="text-xl font-semibold mb-6 text-teal-300">Opening Hours</h3>
            <ul className="space-y-4">
              <li className="flex justify-between transition-colors duration-300 hover:text-teal-100 px-2 py-1 hover:bg-gray-800 rounded">
                <span>Monday - Friday</span>
                <span>8:00 AM - 7:00 PM</span>
              </li>
              <li className="flex justify-between transition-colors duration-300 hover:text-teal-100 px-2 py-1 hover:bg-gray-800 rounded">
                <span>Saturday</span>
                <span>9:00 AM - 5:00 PM</span>
              </li>
              <li className="flex justify-between transition-colors duration-300 hover:text-teal-100 px-2 py-1 hover:bg-gray-800 rounded">
                <span>Sunday</span>
                <span>Closed</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-20 pt-10 text-center text-gray-400">
          <p className="transition-colors duration-300 hover:text-teal-300">&copy; {new Date().getFullYear()} ToothCloud. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
