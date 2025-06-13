import React, { useState } from 'react';
import { FaCalendarAlt, FaClock, FaUserMd, FaStethoscope } from 'react-icons/fa';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Alert from '../ui/Alert';

interface AppointmentFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  practitioner: string;
  serviceType: string;
  message: string;
}

const BookingSection: React.FC = () => {
  const [formData, setFormData] = useState<AppointmentFormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    practitioner: '',
    serviceType: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const practitioners = [
    'Dr. Sarah Johnson - General Dentistry',
    'Dr. Michael Chen - Orthodontics',
    'Dr. Emily Rodriguez - Pediatric Dentistry',
    'Dr. David Thompson - Oral Surgery',
    'Dr. Lisa Park - Cosmetic Dentistry'
  ];

  const serviceTypes = [
    'General Checkup',
    'Teeth Cleaning',
    'Cosmetic Consultation',
    'Orthodontic Consultation',
    'Emergency Care',
    'Pediatric Care',
    'Oral Surgery Consultation'
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): string[] => {
    const newErrors: string[] = [];

    if (!formData.name.trim()) newErrors.push('Name is required');
    if (!formData.email.trim()) newErrors.push('Email is required');
    if (!formData.phone.trim()) newErrors.push('Phone number is required');
    if (!formData.date) newErrors.push('Date is required');
    if (!formData.time) newErrors.push('Time is required');
    if (!formData.practitioner) newErrors.push('Practitioner selection is required');
    if (!formData.serviceType) newErrors.push('Service type is required');

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.push('Please enter a valid email address');
    }

    // Phone validation
    const phoneRegex = /^[\d\s\-()]+$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.push('Please enter a valid phone number');
    }

    // Date validation (must be future date)
    if (formData.date) {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.push('Please select a future date');
      }
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Call the appointment API
      const response = await fetch('http://localhost:3001/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors && Array.isArray(result.errors)) {
          setErrors(result.errors);
        } else {
          setErrors([result.message ?? 'Failed to submit appointment request']);
        }
        return;
      }

      // Success
      console.log('Appointment request submitted successfully:', result.data);
      setShowConfirmation(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        practitioner: '',
        serviceType: '',
        message: ''
      });
    } catch (error) {
      console.error('Network error:', error);
      setErrors(['Network error. Please check your connection and try again.']);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (showConfirmation) {
    return (
      <section id="book-appointment" className="py-20 bg-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <Card>
              <div className="p-8 text-center">
                <div className="text-6xl text-green-500 mb-4">✓</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Appointment Request Submitted!
                </h2>
                <p className="text-gray-600 mb-6">
                  Thank you for choosing ToothCloud! We've received your appointment request and will contact you within 24 hours to confirm your appointment details.
                </p>
                <Button
                  variant="primary"
                  onClick={() => setShowConfirmation(false)}
                >
                  Book Another Appointment
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="book-appointment" className="py-20 bg-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Book Your Appointment
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Schedule your visit with our experienced dental professionals. 
            We'll get back to you within 24 hours to confirm your appointment.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <form onSubmit={handleSubmit} className="p-8">
              {errors.length > 0 && (
                <Alert
                  type="error"
                  title="Please correct the following errors:"
                  className="mb-6"
                >
                  <ul className="list-disc list-inside mt-2">
                    {errors.map((error) => (
                      <li key={error}>{error}</li>
                    ))}
                  </ul>
                </Alert>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Personal Information
                  </h3>
                  
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Appointment Details
                  </h3>
                  
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                      <FaCalendarAlt className="inline mr-2" />
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      min={getTomorrowDate()}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                      <FaClock className="inline mr-2" />
                      Preferred Time *
                    </label>
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select a time</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="practitioner" className="block text-sm font-medium text-gray-700 mb-1">
                      <FaUserMd className="inline mr-2" />
                      Preferred Practitioner *
                    </label>
                    <select
                      id="practitioner"
                      name="practitioner"
                      value={formData.practitioner}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select a practitioner</option>
                      {practitioners.map((practitioner) => (
                        <option key={practitioner} value={practitioner}>{practitioner}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-1">
                      <FaStethoscope className="inline mr-2" />
                      Type of Service *
                    </label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select a service</option>
                      {serviceTypes.map((service) => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="mt-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Please share any specific concerns or questions about your appointment..."
                />
              </div>

              <div className="mt-8 text-center">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isSubmitting}
                  className="px-8 py-3"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Appointment Request'}
                </Button>
                <p className="text-sm text-gray-600 mt-4">
                  * Required fields. We'll contact you within 24 hours to confirm your appointment.
                </p>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
