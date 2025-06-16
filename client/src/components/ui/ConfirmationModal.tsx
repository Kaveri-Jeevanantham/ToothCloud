import React from 'react';
import { AppointmentFormData } from '../../services/appointmentService';
import Button from './Button';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointmentData: AppointmentFormData;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  appointmentData,
  onConfirm
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 animate-fadeIn">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Your Appointment</h3>
        
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-2">
            <p className="text-gray-600 font-medium">Name:</p>
            <p className="text-gray-800">{appointmentData.name}</p>
            
            <p className="text-gray-600 font-medium">Email:</p>
            <p className="text-gray-800">{appointmentData.email}</p>
            
            <p className="text-gray-600 font-medium">Phone:</p>
            <p className="text-gray-800">{appointmentData.phone}</p>
            
            <p className="text-gray-600 font-medium">Date:</p>
            <p className="text-gray-800">{appointmentData.date}</p>
            
            <p className="text-gray-600 font-medium">Time:</p>
            <p className="text-gray-800">{appointmentData.time}</p>
            
            <p className="text-gray-600 font-medium">Service:</p>
            <p className="text-gray-800">{appointmentData.service}</p>
            
            {appointmentData.dentist && (
              <>
                <p className="text-gray-600 font-medium">Dentist:</p>
                <p className="text-gray-800">{appointmentData.dentist}</p>
              </>
            )}
          </div>
          
          {appointmentData.message && (
            <div>
              <p className="text-gray-600 font-medium">Additional Information:</p>
              <p className="text-gray-800 mt-1">{appointmentData.message}</p>
            </div>
          )}
        </div>
        
        <div className="flex justify-end space-x-3">
          <Button 
            variant="outline" 
            onClick={onClose}
          >
            Edit
          </Button>
          <Button 
            variant="primary" 
            onClick={onConfirm}
          >
            Confirm Booking
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;