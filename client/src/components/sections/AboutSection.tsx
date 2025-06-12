import React from 'react';
import { FaUserMd, FaGraduationCap, FaAward, FaHeart } from 'react-icons/fa';
import Card from '../ui/Card';

const AboutSection: React.FC = () => {
  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'General Dentistry & Practice Owner',
      credentials: 'DDS, MS',
      experience: '15+ years',
      image: '/api/placeholder/300/300',
      bio: 'Passionate about providing comprehensive dental care with a gentle approach.',
      specialties: ['General Dentistry', 'Preventive Care', 'Patient Education']
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Orthodontist',
      credentials: 'DDS, MS Orthodontics',
      experience: '12+ years',
      image: '/api/placeholder/300/300',
      bio: 'Specializes in creating beautiful, healthy smiles through advanced orthodontic treatments.',
      specialties: ['Invisalign', 'Traditional Braces', 'Jaw Alignment']
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Pediatric Dentist',
      credentials: 'DDS, Pediatric Specialty',
      experience: '10+ years',
      image: '/api/placeholder/300/300',
      bio: 'Dedicated to making dental visits fun and comfortable for children.',
      specialties: ['Pediatric Care', 'Preventive Treatment', 'Special Needs Dentistry']
    }
  ];

  const values = [
    {
      icon: <FaHeart className="text-4xl text-red-500" />,
      title: 'Compassionate Care',
      description: 'We treat every patient with kindness, understanding, and respect, ensuring comfort throughout their dental journey.'
    },
    {
      icon: <FaAward className="text-4xl text-yellow-500" />,
      title: 'Excellence',
      description: 'Our commitment to continuous learning and advanced technology ensures the highest quality dental care.'
    },
    {
      icon: <FaGraduationCap className="text-4xl text-blue-500" />,
      title: 'Patient Education',
      description: 'We believe in empowering our patients with knowledge to make informed decisions about their oral health.'
    },
    {
      icon: <FaUserMd className="text-4xl text-green-500" />,
      title: 'Professional Expertise',
      description: 'Our experienced team stays current with the latest techniques and technologies in modern dentistry.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Introduction */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            About ToothCloud
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            At ToothCloud, we're committed to providing exceptional dental care in a comfortable, 
            modern environment. Our team of experienced professionals uses the latest technology 
            to ensure the best possible outcomes for every patient.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-blue-50 to-teal-50">
            <div className="p-8 text-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-lg text-gray-700 max-w-4xl mx-auto">
                To provide comprehensive, compassionate dental care that promotes oral health and enhances 
                the overall well-being of our patients. We strive to create a welcoming environment where 
                every patient feels valued, informed, and confident in their dental care decisions.
              </p>
            </div>
          </Card>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Core Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center h-full">
                <div className="p-6">
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h4>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Meet Our Team */}
        <div>
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Meet Our Expert Team
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center h-full">
                <div className="p-6">
                  <div className="w-32 h-32 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
                    <FaUserMd className="text-6xl text-gray-400" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h4>
                  <p className="text-blue-600 font-medium mb-1">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    {member.credentials} • {member.experience}
                  </p>
                  <p className="text-gray-700 mb-4">
                    {member.bio}
                  </p>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-900">Specialties:</p>
                    {member.specialties.map((specialty, specialtyIndex) => (
                      <span
                        key={specialtyIndex}
                        className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-1 mb-1"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-teal-50 to-blue-50">
            <div className="p-8">
              <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">
                Why Choose ToothCloud?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-white text-sm">✓</span>
                      </span>
                      <span className="text-gray-700">State-of-the-art technology and equipment</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-white text-sm">✓</span>
                      </span>
                      <span className="text-gray-700">Comprehensive dental services under one roof</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-white text-sm">✓</span>
                      </span>
                      <span className="text-gray-700">Flexible scheduling and emergency care</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-white text-sm">✓</span>
                      </span>
                      <span className="text-gray-700">Insurance acceptance and flexible payment options</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-white text-sm">✓</span>
                      </span>
                      <span className="text-gray-700">Comfortable, spa-like environment</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-white text-sm">✓</span>
                      </span>
                      <span className="text-gray-700">Personalized treatment plans</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-white text-sm">✓</span>
                      </span>
                      <span className="text-gray-700">Ongoing patient education and support</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-white text-sm">✓</span>
                      </span>
                      <span className="text-gray-700">Years of experience and satisfied patients</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
