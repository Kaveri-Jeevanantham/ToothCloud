import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import HeroBanner from '../../components/sections/HeroBanner';
import Services from '../../components/sections/Services';
import AboutSection from '../../components/sections/AboutSection';
import BookingSection from '../../components/sections/BookingSection';
import ContactSection from '../../components/sections/ContactSection';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroBanner />
        <Services />
        <AboutSection />
        <BookingSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
