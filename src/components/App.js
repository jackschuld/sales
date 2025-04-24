import React from 'react';
import Hero from './components/Hero';
import PhoneShowcase from './components/PhoneShowcase';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Hero />
        <PhoneShowcase />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App; 