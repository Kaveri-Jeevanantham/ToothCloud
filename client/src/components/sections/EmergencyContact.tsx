import React from 'react';
import { FaPhone, FaEnvelope } from 'react-icons/fa';
import Button from '../ui/Button';

const EmergencyContact: React.FC = () => {
  return (
    <section className="bg-red-50 py-14">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-lg shadow-xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between transform transition-all duration-300 hover:translate-y-[-5px]">
          <div className="mb-6 md:mb-0 md:mr-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-3 transition-colors duration-300 hover:text-red-600">Dental Emergency?</h2>
            <p className="text-gray-600 max-w-xl">
              Don't wait if you're experiencing severe pain or injury. Our emergency dental team is ready to help you.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-5">
            <a href="tel:+15551234567" className="transition-transform duration-300 hover:scale-105">
              <Button variant="primary" className="flex items-center justify-center shadow-md">
                <FaPhone className="mr-2" />
                <span>(555) 123-4567</span>
              </Button>
            </a>
            
            <a href="mailto:emergency@toothcloud.com" className="transition-transform duration-300 hover:scale-105">
              <Button variant="outline" className="flex items-center justify-center shadow-md">
                <FaEnvelope className="mr-2" />
                <span>emergency@toothcloud.com</span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmergencyContact;