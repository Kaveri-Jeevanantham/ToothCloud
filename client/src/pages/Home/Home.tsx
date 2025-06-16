import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Banner from '../../components/sections/Banner';
import Services from '../../components/sections/Services';
import AppointmentForm from '../../components/sections/AppointmentForm';
import EmergencyContact from '../../components/sections/EmergencyContact';
import OpeningHours from '../../components/sections/OpeningHours';
import Contact from '../../components/sections/Contact';
import About from '../../components/sections/About';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Banner />
        <Services />
        <div className="bg-white py-8">
          <EmergencyContact />
        </div>
        <OpeningHours />
        <About />
        <Contact />
        <AppointmentForm />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
