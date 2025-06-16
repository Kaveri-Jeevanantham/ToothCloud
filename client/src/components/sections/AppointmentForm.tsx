import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../ui/Button';
import Alert from '../ui/Alert';
import { AppointmentFormData, getAvailableTimeSlots } from '../../services/appointmentService';
import useAppointment from '../../hooks/useAppointment';
import ConfirmationModal from '../ui/ConfirmationModal';

const dentists = [
  { id: 1, name: 'Dr. Sarah Johnson' },
  { id: 2, name: 'Dr. Michael Chen' },
  { id: 3, name: 'Dr. Emily Rodriguez' }
];

const services = [
  { id: 1, name: 'General Check-up' },
  { id: 2, name: 'Teeth Cleaning' },
  { id: 3, name: 'Teeth Whitening' },
  { id: 4, name: 'Root Canal' },
  { id: 5, name: 'Dental Implants' }
];

const AppointmentForm: React.FC = () => {
  const { isSubmitting, submitStatus, submitAppointment } = useAppointment();
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [isLoadingTimes, setIsLoadingTimes] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState<AppointmentFormData | null>(null);
  
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<AppointmentFormData>();
  
  // Watch the date field to update available times
  const watchDate = watch('date');
  
  // Update available times when date changes
  useEffect(() => {
    if (watchDate && watchDate !== selectedDate) {
      setSelectedDate(watchDate);
      setIsLoadingTimes(true);
      
      getAvailableTimeSlots(watchDate)
        .then(slots => {
          setAvailableTimes(slots);
        })
        .catch(error => {
          console.error('Error loading time slots:', error);
          setAvailableTimes([]);
        })
        .finally(() => {
          setIsLoadingTimes(false);
        });
    }
  }, [watchDate, selectedDate]);

  // Clear form when appointment is successfully submitted
  useEffect(() => {
    if (submitStatus?.type === 'success') {
      reset();
      setFormData(null);
      setSelectedDate('');
      setAvailableTimes([]);
    }
  }, [submitStatus, reset]);
  
  const onSubmit = async (data: AppointmentFormData) => {
    // Show confirmation modal first
    setFormData(data);
    setShowConfirmation(true);
  };
  
  const handleConfirmAppointment = async () => {
    if (formData) {
      setShowConfirmation(false);
      await submitAppointment(formData);
    }
  };

  return (
    <section id="book-appointment" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Book an Appointment</h2>
            <p className="text-gray-600">
              Schedule your visit with our experienced dental professionals.
            </p>
          </div>
          
          {submitStatus && (
            <Alert 
              type={submitStatus.type} 
              className="mb-6"
            >
              {submitStatus.message}
            </Alert>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  id="name"
                  type="text"
                  className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Your full name"
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Your email address"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Your phone number (e.g., 123-456-7890)"
                  {...register('phone', { 
                    required: 'Phone number is required',
                    pattern: {
                      value: /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                      message: 'Please enter a valid phone number'
                    }
                  })}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
              </div>
              
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Date *
                </label>
                <input
                  id="date"
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.date ? 'border-red-500' : 'border-gray-300'}`}
                  {...register('date', { 
                    required: 'Date is required',
                    validate: {
                      isFuture: (value) => {
                        const selectedDate = new Date(value);
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return selectedDate >= today || 'Please select a future date';
                      }
                    }
                  })}
                />
                {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>}
              </div>
              
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Time *
                </label>
                <select
                  id="time"
                  className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.time ? 'border-red-500' : 'border-gray-300'}`}
                  {...register('time', { required: 'Time is required' })}
                  disabled={!selectedDate || isLoadingTimes}
                >
                  {isLoadingTimes ? (
                    <option value="">Loading available times...</option>
                  ) : !selectedDate ? (
                    <option value="">Please select a date first</option>
                  ) : (
                    <>
                      <option value="">Select a time</option>
                      {availableTimes.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </>
                  )}
                </select>
                {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>}
              </div>
              
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                  Service Type *
                </label>
                <select
                  id="service"
                  className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.service ? 'border-red-500' : 'border-gray-300'}`}
                  {...register('service', { required: 'Service is required' })}
                >
                  <option value="">Select a service</option>
                  {services.map(service => (
                    <option key={service.id} value={service.name}>
                      {service.name}
                    </option>
                  ))}
                </select>
                {errors.service && <p className="mt-1 text-sm text-red-600">{errors.service.message}</p>}
              </div>
              
              <div>
                <label htmlFor="dentist" className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Dentist
                </label>
                <select
                  id="dentist"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  {...register('dentist')}
                >
                  <option value="">No preference</option>
                  {dentists.map(dentist => (
                    <option key={dentist.id} value={dentist.name}>
                      {dentist.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Additional Information
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Please share any specific concerns or questions"
                {...register('message')}
              ></textarea>
            </div>
            
            <div className="text-center">
              <Button 
                type="submit" 
                variant="primary" 
                size="lg" 
                isLoading={isSubmitting}
                className="px-8"
              >
                Book Appointment
              </Button>
            </div>
          </form>
          
          {formData && (
            <ConfirmationModal
              isOpen={showConfirmation}
              onClose={() => setShowConfirmation(false)}
              appointmentData={formData}
              onConfirm={handleConfirmAppointment}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default AppointmentForm;