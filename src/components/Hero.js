import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const HeroSection = styled.section`
  padding: 80px 20px;
  min-height: 100vh;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: white;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    padding: 40px 20px;
    justify-content: flex-start;
  }
`;

const HeroContent = styled.div`
  text-align: center;
  max-width: 800px;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    margin-top: 60px;
  }
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
`;

const ScrollText = styled.span`
  font-size: 1rem;
  margin-bottom: 10px;
`;

const ScrollIcon = styled.div`
  font-size: 24px;
`;

const Hero = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  });
  const [hasShownOnce, setHasShownOnce] = useState(false);
  
  // Initial load animation
  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
    setHasShownOnce(true);
  }, [controls]);
  
  // Scroll-based animation
  useEffect(() => {
    if (hasShownOnce) {
      if (inView) {
        controls.start({ opacity: 1, y: 0 });
      } else {
        controls.start({ opacity: 0, y: 20 });
      }
    }
  }, [controls, inView, hasShownOnce]);

  const scrollToShowcase = () => {
    const showcaseSection = document.getElementById('showcase');
    if (showcaseSection) {
      showcaseSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeroSection id="home" ref={ref}>
      <HeroContent>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ duration: 0.8 }}
        >
          Web Development and Marketing
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Increase your online presence!
        </Subtitle>
        <CTAButton
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToShowcase}
        >
          Explore
        </CTAButton>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;