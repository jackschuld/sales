import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SectionNavigation from './SectionNavigation';

const ShowcaseSection = styled.section`
  padding: 100px 0;
  position: relative;
  height: 100vh;
  background: transparent;
  overflow: visible;
  display: flex;
  align-items: center;
`;

const ShowcaseContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  position: relative;

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: center;
    gap: 60px;
    align-items: center;
    padding: 0 40px;
    height: 100vh;
  }
`;

const PhoneContainer = styled(motion.div)`
  width: 100%;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;

  @media (min-width: 1024px) {
    width: 40%;
    margin-bottom: 0;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Phone = styled(motion.div)`
  width: 280px;
  height: 560px;
  background: linear-gradient(145deg, #222, #333);
  border-radius: 40px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const PhoneScreen = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  border-radius: 30px;
  overflow: hidden;
  background: #000;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const PhoneImage = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  opacity: 0;
`;

const Content = styled.div`
  width: 100%;
  padding: 20px;
  position: relative;
  z-index: 1;

  @media (min-width: 1024px) {
    width: 50%;
    padding: 40px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const TextGroup = styled(motion.div)`
  margin: 40px 0;
  padding: 30px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  color: #fff;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  &:first-child {
    margin-top: 0;
  }

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }

  h2 {
    margin: 0 0 15px 0;
    font-size: 1.8rem;
    color: #fff;
    font-weight: 600;
    letter-spacing: -0.5px;
  }

  p {
    margin: 0;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.9);
  }
`;

const phoneImages = [
  "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80",
  "https://images.unsplash.com/photo-1551739440-5dd934d3a94a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1300&q=80",
  "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
];

const PhoneShowcase = () => {
  const [isVisible, setIsVisible] = useState(true);
  const phoneRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
    };

    const handleIntersect = (entries) => {
      entries.forEach(entry => {
        setIsVisible(entry.intersectionRatio > 0.3);
      });
    };

    const observer = new IntersectionObserver(handleIntersect, options);

    if (phoneRef.current) {
      observer.observe(phoneRef.current);
    }

    return () => {
      if (phoneRef.current) {
        observer.unobserve(phoneRef.current);
      }
    };
  }, []);

  return (
    <ShowcaseSection id="showcase">
      <ShowcaseContainer>
        <PhoneContainer 
          ref={phoneRef}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <Phone
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <PhoneScreen>
              {phoneImages.map((img, index) => (
                <PhoneImage
                  key={index}
                  style={{ backgroundImage: `url(${img})` }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    scale: [1, 1.02, 1.02, 1],
                  }}
                  transition={{
                    duration: 5,
                    times: [0, 0.1, 0.9, 1],
                    repeat: Infinity,
                    repeatDelay: phoneImages.length * 5 - 5,
                    delay: index * 5,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </PhoneScreen>
          </Phone>
        </PhoneContainer>

        <Content>
          <TextGroup
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <h2>Full Stack Development</h2>
            <p>Experienced in building complete web applications using React, Angular, Laravel, and .NET frameworks.</p>
          </TextGroup>

          <TextGroup
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <h2>API Integration</h2>
            <p>Seamless integration with third-party APIs and services.</p>
          </TextGroup>

          <TextGroup
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <h2>Mobile Development</h2>
            <p>Creating responsive and mobile-first applications.</p>
          </TextGroup>

          {/* <TextGroup
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <h2>Cloud Solutions</h2>
            <p>Implementing scalable cloud-based solutions.</p>
          </TextGroup>

          <TextGroup
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
          >
            <h2>DevOps Practices</h2>
            <p>Implementing continuous integration and deployment pipelines.</p>
          </TextGroup> */}

          <TextGroup
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <h2>Security First</h2>
            <p>Building with security best practices in mind.</p>
          </TextGroup>
        </Content>
      </ShowcaseContainer>
      <SectionNavigation />
    </ShowcaseSection>
  );
};

export default PhoneShowcase;
