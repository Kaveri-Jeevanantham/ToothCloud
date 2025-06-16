import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';


const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="flex justify-center items-center h-[calc(100vh-200px)]">
        <h1 className="text-3xl font-bold">Welcome!!</h1>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
