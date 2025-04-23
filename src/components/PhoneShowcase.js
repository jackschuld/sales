import React, { useState, useEffect, useRef, useMemo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ShowcaseSection = styled.section`
  position: relative;
  min-height: 100vh;
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
    justify-content: space-between;
    align-items: flex-start;
    padding: 0 40px;
    min-height: 100vh;
  }
`;

const PhoneContainer = styled.div`
  width: 100%;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;

  @media (min-width: 1024px) {
    width: 40%;
    position: sticky;
    top: 50%;
    transform: translateY(-50%);
    margin-bottom: 0;
    height: auto;
    display: flex;
    align-items: center;
  }
`;

const Phone = styled.div`
  width: 280px;
  height: 560px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 40px;
  position: relative;
  overflow: hidden;
  opacity: 0.95;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const PhoneScreen = styled(motion.div)`
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  overflow: hidden;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Content = styled.div`
  width: 100%;
  padding: 20px;
  position: relative;
  z-index: 1;

  @media (min-width: 1024px) {
    width: 50%;
    padding: 40px 0;
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
    <ShowcaseSection>
      <ShowcaseContainer>
        <PhoneContainer
          ref={phoneRef}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(-50%)' : 'translateY(-30%)',
            transition: 'opacity 0.3s ease, transform 0.3s ease'
          }}
        >
          <Phone>
            <PhoneScreen
              animate={{
                background: [
                  'rgba(99, 102, 241, 0.1)',
                  'rgba(139, 92, 246, 0.1)',
                  'rgba(236, 72, 153, 0.1)',
                  'rgba(245, 158, 11, 0.1)',
                  'rgba(99, 102, 241, 0.1)'
                ]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </Phone>
        </PhoneContainer>

        <Content>
          <TextGroup
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Full Stack Development</h2>
            <p>Experienced in building complete web applications using React, Angular, Laravel, and .NET frameworks.</p>
          </TextGroup>

          <TextGroup
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2>API Integration</h2>
            <p>Seamless integration with third-party APIs and services.</p>
          </TextGroup>

          <TextGroup
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2>Mobile Development</h2>
            <p>Creating responsive and mobile-first applications.</p>
          </TextGroup>

          <TextGroup
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2>Cloud Solutions</h2>
            <p>Implementing scalable cloud-based solutions.</p>
          </TextGroup>

          <TextGroup
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2>DevOps Practices</h2>
            <p>Implementing continuous integration and deployment pipelines.</p>
          </TextGroup>

          <TextGroup
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2>Security First</h2>
            <p>Building with security best practices in mind.</p>
          </TextGroup>
        </Content>
      </ShowcaseContainer>
    </ShowcaseSection>
  );
};

export default PhoneShowcase;