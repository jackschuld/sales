import React from 'react';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PhoneShowcase from './components/PhoneShowcase';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';

const AppContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
  background: linear-gradient(
    135deg,
    #6366f1 0%,
    #8b5cf6 25%,
    #ec4899 50%,
    #f59e0b 75%,
    #6366f1 100%
  );
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
  color: #fff;

  @keyframes gradientBG {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const SectionSpacer = styled.div`
  height: 0;
`;

function App() {
  return (
    <AppContainer>
      <Navbar />
      <Hero />
      <SectionSpacer />
      <PhoneShowcase />
      <SectionSpacer />
      <Services />
      <SectionSpacer />
      <Contact />
      <Footer />
    </AppContainer>
  );
}

export default App;
