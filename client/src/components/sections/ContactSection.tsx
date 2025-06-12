import React from 'react';
import { FaClock, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Card from '../ui/Card';

const ContactSection: React.FC = () => {
  const getCurrentDayHours = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = days[new Date().getDay()];
    
    const hours = {
      'Monday': '8:00 AM - 6:00 PM',
      'Tuesday': '8:00 AM - 6:00 PM',
      'Wednesday': '8:00 AM - 6:00 PM',
      'Thursday': '8:00 AM - 6:00 PM',
      'Friday': '8:00 AM - 5:00 PM',
      'Saturday': '9:00 AM - 3:00 PM',
      'Sunday': 'Closed'
    };

    return { currentDay, hours: hours[currentDay as keyof typeof hours] };
  };

  const { currentDay, hours } = getCurrentDayHours();

  const weeklyHours = [
    { day: 'Monday', hours: '8:00 AM - 6:00 PM' },
    { day: 'Tuesday', hours: '8:00 AM - 6:00 PM' },
    { day: 'Wednesday', hours: '8:00 AM - 6:00 PM' },
    { day: 'Thursday', hours: '8:00 AM - 6:00 PM' },
    { day: 'Friday', hours: '8:00 AM - 5:00 PM' },
    { day: 'Saturday', hours: '9:00 AM - 3:00 PM' },
    { day: 'Sunday', hours: 'Closed' }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Contact & Hours
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get in touch with us or visit our practice. We're here to help with all your dental needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Hours */}
          <Card className="text-center">
            <div className="p-6">
              <FaClock className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Today's Hours
              </h3>
              <p className="text-lg font-medium text-blue-600 mb-2">
                {currentDay}
              </p>
              <p className={`text-lg ${hours === 'Closed' ? 'text-red-600' : 'text-green-600'}`}>
                {hours}
              </p>
              {hours !== 'Closed' && (
                <p className="text-sm text-gray-600 mt-2">
                  We're open today!
                </p>
              )}
            </div>
          </Card>

          {/* Emergency Contact */}
          <Card className="text-center bg-red-50 border-red-200">
            <div className="p-6">
              <FaPhone className="text-4xl text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Emergency Contact
              </h3>
              <a
                href="tel:+1234567890"
                className="text-2xl font-bold text-red-600 hover:text-red-700 block mb-2"
              >
                (123) 456-7890
              </a>
              <p className="text-sm text-gray-600 mb-4">
                Available 24/7 for dental emergencies
              </p>
              <a
                href="tel:+1234567890"
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                <FaPhone className="mr-2" />
                Call Now
              </a>
            </div>
          </Card>

          {/* General Contact */}
          <Card className="text-center">
            <div className="p-6">
              <FaEnvelope className="text-4xl text-teal-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                General Contact
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-center">
                  <FaMapMarkerAlt className="text-teal-500 mr-2" />
                  <span className="text-gray-700">123 Dental Street</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-gray-700">Healthcare City, HC 12345</span>
                </div>
                <div className="flex items-center justify-center">
                  <FaPhone className="text-teal-500 mr-2" />
                  <a href="tel:+1234567890" className="text-blue-600 hover:text-blue-700">
                    (123) 456-7890
                  </a>
                </div>
                <div className="flex items-center justify-center">
                  <FaEnvelope className="text-teal-500 mr-2" />
                  <a href="mailto:info@toothcloud.com" className="text-blue-600 hover:text-blue-700">
                    info@toothcloud.com
                  </a>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Weekly Hours Schedule */}
        <div className="mt-12">
          <Card>
            <div className="p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                Weekly Schedule
              </h3>
              <div className="max-w-md mx-auto">
                {weeklyHours.map((schedule) => (
                  <div
                    key={schedule.day}
                    className={`flex justify-between items-center py-3 px-4 rounded-lg mb-2 ${
                      schedule.day === currentDay
                        ? 'bg-blue-50 border border-blue-200'
                        : 'bg-gray-50'
                    }`}
                  >
                    <span className={`font-medium ${
                      schedule.day === currentDay ? 'text-blue-700' : 'text-gray-700'
                    }`}>
                      {schedule.day}
                    </span>
                    <span className={`${
                      schedule.hours === 'Closed'
                        ? 'text-red-600'
                        : schedule.day === currentDay
                        ? 'text-blue-700 font-medium'
                        : 'text-gray-600'
                    }`}>
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>
              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  Please note: Hours may vary on holidays. 
                  <br />
                  For urgent matters outside business hours, use our emergency contact.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
