import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaPhone } from 'react-icons/fa';
import Logo from '../ui/Logo';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'shadow-xl py-2' : 'shadow-lg py-4'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Logo className="transition-transform duration-300 hover:scale-105" />
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-700 focus:outline-none transition-transform duration-300 hover:scale-110" 
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 hover:scale-105 inline-block"
          >
            Home
          </a>
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 hover:scale-105 inline-block"
          >
            Services
          </a>
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 hover:scale-105 inline-block"
          >
            Contact
          </a>
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 hover:scale-105 inline-block"
          >
            About Us
          </a>
          <Button 
            variant="primary" 
            className="shadow-md transition-transform duration-300 hover:scale-105"
            onClick={() => document.getElementById('book-appointment')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Book Appointment
          </Button>
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      <div 
        className={`md:hidden bg-white border-t border-gray-200 overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container mx-auto px-6 py-2">
          <nav className="flex flex-col space-y-4 py-3">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
              className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-300"
            >
              Home
            </a>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
              className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-300"
            >
              Services
            </a>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
              className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-300"
            >
              Contact
            </a>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
              className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-300"
            >
              About Us
            </a>
            <Button 
              variant="primary" 
              fullWidth 
              className="shadow-md"
              onClick={() => {
                document.getElementById('book-appointment')?.scrollIntoView({ behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
            >
              Book Appointment
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
