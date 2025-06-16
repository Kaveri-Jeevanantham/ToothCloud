import React from 'react';
import { FaUserMd, FaTooth, FaAward } from 'react-icons/fa';

const About: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 transition-colors duration-300 hover:text-blue-600">About Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            ToothCloud is a modern dental practice committed to providing exceptional care with the latest technology and a patient-centered approach.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center transition-all duration-300 hover:transform hover:translate-y-[-5px]">
            <div className="bg-blue-100 p-5 rounded-full mb-5">
              <FaUserMd className="text-blue-600 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Expert Team</h3>
            <p className="text-gray-600">
              Our team of experienced dentists and specialists are dedicated to providing the highest quality care for all your dental needs.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center transition-all duration-300 hover:transform hover:translate-y-[-5px]">
            <div className="bg-teal-100 p-5 rounded-full mb-5">
              <FaTooth className="text-teal-600 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Modern Technology</h3>
            <p className="text-gray-600">
              We utilize the latest dental technology and techniques to ensure efficient, comfortable, and effective treatments.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center transition-all duration-300 hover:transform hover:translate-y-[-5px]">
            <div className="bg-purple-100 p-5 rounded-full mb-5">
              <FaAward className="text-purple-600 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Patient-Centered Care</h3>
            <p className="text-gray-600">
              We prioritize your comfort and satisfaction, creating personalized treatment plans tailored to your unique dental health needs.
            </p>
          </div>
        </div>
        
        <div className="mt-16 bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold mb-4 text-center">Our Mission</h3>
          <p className="text-gray-700 leading-relaxed">
            At ToothCloud, our mission is to transform dental care through innovation and compassion. We strive to create a welcoming environment where patients feel comfortable and confident in their dental care decisions. By combining advanced technology with personalized attention, we aim to improve not just your oral health, but your overall well-being and quality of life.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;