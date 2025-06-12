import React from 'react';
import { FaTooth } from 'react-icons/fa';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'white';
}

const Logo: React.FC<LogoProps> = ({ className = '', variant = 'default' }) => {
  const isWhite = variant === 'white' || className.includes('text-white');
  
  return (
    <div className={`flex items-center ${className}`}>
      <FaTooth className={`${isWhite ? 'text-white' : 'text-blue-600'} text-2xl mr-2`} />
      <span className="text-2xl font-bold">
        <span className={isWhite ? 'text-white' : 'text-blue-600'}>Tooth</span>
        <span className={isWhite ? 'text-teal-300' : 'text-teal-500'}>Cloud</span>
      </span>
    </div>
  );
};

export default Logo;
