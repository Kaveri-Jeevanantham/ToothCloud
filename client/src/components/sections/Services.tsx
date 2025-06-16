import React from 'react';
import { FaTooth, FaSmile, FaUserMd, FaClipboardCheck } from 'react-icons/fa';
import Card from '../ui/Card';

const services = [
  {
    id: 1,
    title: 'General Dentistry',
    description: 'Comprehensive dental care including check-ups, cleanings, and preventive treatments.',
    icon: <FaTooth className="text-blue-500 text-4xl" />,
    link: '/services/general'
  },
  {
    id: 2,
    title: 'Cosmetic Dentistry',
    description: 'Enhance your smile with teeth whitening, veneers, and other aesthetic procedures.',
    icon: <FaSmile className="text-blue-500 text-4xl" />,
    link: '/services/cosmetic'
  },
  {
    id: 3,
    title: 'Specialized Treatments',
    description: 'Advanced procedures including root canals, dental implants, and orthodontics.',
    icon: <FaUserMd className="text-blue-500 text-4xl" />,
    link: '/services/specialized'
  },
  {
    id: 4,
    title: 'Preventive Care',
    description: 'Proactive dental care to maintain oral health and prevent future problems.',
    icon: <FaClipboardCheck className="text-blue-500 text-4xl" />,
    link: '/services/preventive'
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-5 transition-all duration-300 hover:text-blue-600">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer a comprehensive range of dental services to meet all your oral health needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={service.id} className="h-full shadow-md hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col items-center text-center p-8 h-full" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="mb-5 transform transition-transform duration-300 hover:scale-110">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3 transition-colors duration-300 hover:text-blue-600">{service.title}</h3>
                <p className="text-gray-600 mb-5">{service.description}</p>
                <a 
                  href={service.link} 
                  className="mt-auto text-blue-600 hover:text-blue-800 font-medium transition-all duration-300 hover:pl-1"
                >
                  Learn More →
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;