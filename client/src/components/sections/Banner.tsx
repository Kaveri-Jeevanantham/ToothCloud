import React from 'react';
import Button from '../ui/Button';

const Banner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-400 text-white">
      <div className="container mx-auto px-6 py-20 md:py-28">
        <div className="max-w-3xl animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 transition-all duration-300 hover:text-white hover:shadow-lg">Welcome to ToothCloud</h1>
          <p className="text-xl mb-10 transition-opacity duration-300 hover:opacity-90">
            Your trusted partner for comprehensive dental care. Experience the perfect blend of 
            cutting-edge technology and compassionate service.
          </p>
          <div className="flex flex-wrap gap-5">
            <Button 
              variant="secondary" 
              size="lg"
              className="transition-transform duration-300 hover:scale-105 shadow-lg"
              onClick={() => document.getElementById('book-appointment')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Book Appointment
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-white hover:bg-gray-100 transition-transform duration-300 hover:scale-105 shadow-lg"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Our Services
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;