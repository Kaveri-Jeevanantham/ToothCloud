import React, { lazy, Suspense } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import HeroBanner from '../../components/sections/HeroBanner';

// Lazy load components for better performance
const Services = lazy(() => import('../../components/sections/Services'));
const AboutSection = lazy(() => import('../../components/sections/AboutSection'));
const BookingSection = lazy(() => import('../../components/sections/BookingSection'));
const ContactSection = lazy(() => import('../../components/sections/ContactSection'));

// Loading component for better UX during lazy loading
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroBanner />
        <Suspense fallback={<LoadingSpinner />}>
          <Services />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <BookingSection />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
