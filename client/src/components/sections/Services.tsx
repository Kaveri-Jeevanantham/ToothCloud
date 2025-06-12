import React from 'react';
import { FaTooth, FaUserMd, FaShieldAlt, FaCut, FaGem, FaChild } from 'react-icons/fa';
import Card from '../ui/Card';

const Services: React.FC = () => {
  const services = [
    {
      icon: <FaTooth className="text-4xl text-blue-600" />,
      title: 'General Dentistry',
      description: 'Comprehensive oral health checkups, cleanings, and preventive care to maintain your dental health.',
      features: ['Regular Checkups', 'Professional Cleaning', 'Cavity Treatment', 'Oral Health Education']
    },
    {
      icon: <FaGem className="text-4xl text-teal-500" />,
      title: 'Cosmetic Dentistry',
      description: 'Transform your smile with our aesthetic dental procedures designed to enhance your confidence.',
      features: ['Teeth Whitening', 'Veneers', 'Bonding', 'Smile Makeovers']
    },
    {
      icon: <FaCut className="text-4xl text-purple-600" />,
      title: 'Oral Surgery',
      description: 'Expert surgical procedures performed with precision and care for optimal patient comfort.',
      features: ['Tooth Extraction', 'Wisdom Teeth', 'Implant Surgery', 'Gum Surgery']
    },
    {
      icon: <FaShieldAlt className="text-4xl text-green-600" />,
      title: 'Preventive Care',
      description: 'Proactive treatments to prevent dental issues and maintain long-term oral health.',
      features: ['Fluoride Treatment', 'Sealants', 'Periodontal Care', 'Risk Assessment']
    },
    {
      icon: <FaUserMd className="text-4xl text-red-600" />,
      title: 'Restorative Dentistry',
      description: 'Restore function and aesthetics of damaged or missing teeth with advanced techniques.',
      features: ['Crowns & Bridges', 'Dental Implants', 'Dentures', 'Root Canal Therapy']
    },
    {
      icon: <FaChild className="text-4xl text-orange-600" />,
      title: 'Pediatric Dentistry',
      description: 'Specialized dental care for children in a comfortable and friendly environment.',
      features: ['Child-Friendly Care', 'Early Prevention', 'Orthodontic Guidance', 'Emergency Care']
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Dental Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From routine checkups to advanced procedures, we offer a full range of dental services 
            using the latest technology and techniques to ensure the best possible outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="h-full hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 text-center">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Don't see what you're looking for? We offer many more specialized services.
          </p>
          <button
            onClick={() => {
              const element = document.querySelector('#contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="text-blue-600 hover:text-blue-700 font-medium underline"
          >
            Contact us to learn more about our complete range of services
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
