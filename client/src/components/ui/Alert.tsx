import React, { ReactNode } from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimes } from 'react-icons/fa';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  type: AlertType;
  title?: string;
  children: ReactNode;
  onClose?: () => void;
  className?: string;
}

const Alert: React.FC<AlertProps> = ({
  type,
  title,
  children,
  onClose,
  className = '',
}) => {
  const alertStyles = {
    success: {
      container: 'bg-green-50 border-green-400 text-green-800',
      icon: <FaCheckCircle className="h-5 w-5 text-green-500" />,
    },
    error: {
      container: 'bg-red-50 border-red-400 text-red-800',
      icon: <FaExclamationTriangle className="h-5 w-5 text-red-500" />,
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-400 text-yellow-800',
      icon: <FaExclamationTriangle className="h-5 w-5 text-yellow-500" />,
    },
    info: {
      container: 'bg-blue-50 border-blue-400 text-blue-800',
      icon: <FaInfoCircle className="h-5 w-5 text-blue-500" />,
    },
  };

  return (
    <div className={`border-l-4 p-4 rounded-md ${alertStyles[type].container} ${className}`} role="alert">
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-0.5">
          {alertStyles[type].icon}
        </div>
        <div className="ml-3 flex-1">
          {title && <h3 className="text-sm font-medium">{title}</h3>}
          <div className="text-sm mt-1">{children}</div>
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  type === 'success' ? 'text-green-500 hover:bg-green-100 focus:ring-green-600' :
                  type === 'error' ? 'text-red-500 hover:bg-red-100 focus:ring-red-600' :
                  type === 'warning' ? 'text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-600' :
                  'text-blue-500 hover:bg-blue-100 focus:ring-blue-600'
                }`}
                onClick={onClose}
                aria-label="Dismiss"
              >
                <FaTimes className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;
