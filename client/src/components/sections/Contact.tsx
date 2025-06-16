import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Card from '../ui/Card';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 transition-colors duration-300 hover:text-blue-600">Contact Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions or need to schedule an appointment? Reach out to us using any of the methods below.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="shadow-md hover:shadow-xl transition-all duration-300 h-full">
            <div className="p-6 flex flex-col items-center text-center h-full">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <FaPhone className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p className="text-gray-600 mb-4">Call us directly to speak with our team</p>
              <a 
                href="tel:+15551234567" 
                className="mt-auto text-blue-600 hover:text-blue-800 font-medium transition-all duration-300"
              >
                (555) 123-4567
              </a>
            </div>
          </Card>
          
          <Card className="shadow-md hover:shadow-xl transition-all duration-300 h-full">
            <div className="p-6 flex flex-col items-center text-center h-full">
              <div className="bg-teal-100 p-4 rounded-full mb-4">
                <FaEnvelope className="text-teal-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-gray-600 mb-4">Send us an email and we'll respond promptly</p>
              <a 
                href="mailto:contact@toothcloud.com" 
                className="mt-auto text-teal-600 hover:text-teal-800 font-medium transition-all duration-300"
              >
                contact@toothcloud.com
              </a>
            </div>
          </Card>
          
          <Card className="shadow-md hover:shadow-xl transition-all duration-300 h-full">
            <div className="p-6 flex flex-col items-center text-center h-full">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <FaMapMarkerAlt className="text-purple-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Location</h3>
              <p className="text-gray-600 mb-4">Visit our office at this address</p>
              <address className="mt-auto text-purple-600 not-italic font-medium">
                123 Dental Street<br />
                Medical District<br />
                City, 12345
              </address>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;