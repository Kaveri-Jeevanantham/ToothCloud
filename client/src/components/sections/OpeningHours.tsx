import React, { useMemo } from 'react';
import Card from '../ui/Card';

interface HoursType {
  day: string;
  hours: string;
}

const OpeningHours: React.FC = () => {
  const hours: HoursType[] = [
    { day: 'Monday', hours: '8:00 AM - 7:00 PM' },
    { day: 'Tuesday', hours: '8:00 AM - 7:00 PM' },
    { day: 'Wednesday', hours: '8:00 AM - 7:00 PM' },
    { day: 'Thursday', hours: '8:00 AM - 7:00 PM' },
    { day: 'Friday', hours: '8:00 AM - 7:00 PM' },
    { day: 'Saturday', hours: '9:00 AM - 5:00 PM' },
    { day: 'Sunday', hours: 'Closed' }
  ];

  const currentDay = useMemo(() => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date().getDay()];
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 transition-colors duration-300 hover:text-blue-600">Opening Hours</h2>
            <p className="text-gray-600">
              We're here when you need us. Check our working hours below.
            </p>
          </div>
          
          <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
            <div className="p-8">
              <div className="grid grid-cols-1 divide-y divide-gray-200">
                {hours.map((item, index) => (
                  <div 
                    key={item.day} 
                    className={`py-4 flex justify-between items-center transition-all duration-300 hover:bg-blue-50 ${
                      item.day === currentDay ? 'bg-blue-50 -mx-8 px-8' : ''
                    }`}
                    style={{animationDelay: `${index * 0.05}s`}}
                  >
                    <span className={`font-medium ${item.day === currentDay ? 'text-blue-700' : 'text-gray-700'}`}>
                      {item.day}
                      {item.day === currentDay && <span className="ml-2 text-sm bg-blue-100 text-blue-800 py-0.5 px-2 rounded-full">Today</span>}
                    </span>
                    <span className={item.day === currentDay ? 'text-blue-700 font-medium' : 'text-gray-600'}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default OpeningHours;