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
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
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
