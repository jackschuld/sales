import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SectionNavigation from './SectionNavigation';

const HeroSection = styled.section`
  padding: 100px 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: white;
  position: relative;
  z-index: 1;
`;

const HeroContent = styled.div`
  text-align: center;
  max-width: 800px;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  margin-bottom: 40px;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const CTAButton = styled(motion.button)`
  padding: 15px 40px;
  font-size: 1.2rem;
  background: white;
  // color: #6366f1;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  opacity: 0.8;
  cursor: pointer;
`;

const ScrollText = styled.span`
  font-size: 1rem;
  margin-bottom: 10px;
`;

const ScrollIcon = styled.div`
  font-size: 24px;
`;

const Hero = () => {
  const scrollToShowcase = () => {
    const showcaseSection = document.getElementById('showcase');
    if (showcaseSection) {
      showcaseSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeroSection id="home">
      <HeroContent>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Full Stack Developer & Project Manager
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Specializing in React, Angular, Laravel, and .NET development with a background in marketing and project management.
        </Subtitle>
        <CTAButton
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToShowcase}
        >
          View My Portfolio
        </CTAButton>
      </HeroContent>
      <SectionNavigation nextSection="showcase" />
    </HeroSection>
  );
};

export default Hero;