import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const NavigationContainer = styled.div`
  position: fixed;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 100;

  @media (max-width: 768px) {
    display: none; /* Hide on mobile */
  }
`;

const NavButton = styled(motion.div)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.isDark ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255, 255, 255, 0.1)'};
  border: 1px solid ${props => props.isDark ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.2)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  opacity: ${props => props.disabled ? 0.3 : 1};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
  transition: background-color 0.3s ease, border-color 0.3s ease;

  &:hover {
    background: ${props => {
      if (props.disabled) return props.isDark ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255, 255, 255, 0.1)';
      return props.isDark ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255, 255, 255, 0.2)';
    }};
  }
`;

const SectionNavigation = () => {
  const [currentSection, setCurrentSection] = useState(null);
  const [prevSection, setPrevSection] = useState(null);
  const [nextSection, setNextSection] = useState(null);
  const [atTop, setAtTop] = useState(false);
  const [atBottom, setAtBottom] = useState(false);
  const [isDark, setIsDark] = useState(false);
  
  // The ordered list of section IDs
  const sections = ['home', 'showcase', 'services', 'contact'];
  
  useEffect(() => {
    // Check for dark mode
    const checkDarkMode = () => {
      const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
      setIsDark(isDarkMode);
    };
    
    checkDarkMode();
    
    // Create a mutation observer to detect theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          checkDarkMode();
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    const handleScroll = () => {
      // Check if at top of page
      setAtTop(window.scrollY < 50);
      
      // Check if at bottom of page
      const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50;
      setAtBottom(bottom);
      
      // Determine current section
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      // Find which section is currently in view
      let currentIndex = -1;
      for (let i = 0; i < sections.length; i++) {
        const section = document.getElementById(sections[i]);
        if (!section) continue;
        
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          currentIndex = i;
          setCurrentSection(sections[i]);
          break;
        }
      }
      
      // Determine prev and next sections
      if (currentIndex > 0) {
        setPrevSection(sections[currentIndex - 1]);
      } else {
        setPrevSection(null);
      }
      
      if (currentIndex < sections.length - 1 && currentIndex !== -1) {
        setNextSection(sections[currentIndex + 1]);
      } else {
        setNextSection(null);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [sections]);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Disable up arrow when at the top and no previous section
  const upDisabled = atTop || !prevSection;
  
  // Disable down arrow when at the bottom and no next section
  const downDisabled = atBottom || !nextSection;

  return (
    <NavigationContainer>
      <NavButton
        whileTap={{ scale: 0.95 }}
        onClick={() => prevSection && scrollToSection(prevSection)}
        aria-label={`Scroll to previous section`}
        disabled={upDisabled}
        isDark={isDark}
        className="clickable"
      >
        ↑
      </NavButton>
      <NavButton
        whileTap={{ scale: 0.95 }}
        onClick={() => nextSection && scrollToSection(nextSection)}
        aria-label={`Scroll to next section`}
        disabled={downDisabled}
        isDark={isDark}
        className="clickable"
      >
        ↓
      </NavButton>
    </NavigationContainer>
  );
};

export default SectionNavigation; 