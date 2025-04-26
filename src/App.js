import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Hero from './components/Hero';
import PhoneShowcase from './components/PhoneShowcase';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SectionNavigation from './components/SectionNavigation';
import DarkModeToggle from './components/DarkModeToggle';

// Theme configurations
const lightTheme = {
  gradientStart: '#6366f1',
  gradientMid1: '#8b5cf6',
  gradientMid2: '#ec4899',
  gradientEnd: '#f59e0b',
  textColor: '#ffffff',
  scrollbarThumb: '#1a1a1a',
  scrollbarTrack: 'rgba(26, 26, 26, 0.2)',
};

const darkTheme = {
  gradientStart: '#1a1a1a',
  gradientMid1: '#222222',
  gradientMid2: '#2a2a2a',
  gradientEnd: '#333333',
  textColor: '#ffffff',
  scrollbarThumb: '#6366f1',
  scrollbarTrack: 'rgba(99, 102, 241, 0.1)',
};

// Global style for dark mode
const GlobalStyle = createGlobalStyle`
  :root {
    --scrollbar-thumb: ${props => props.theme.scrollbarThumb};
    --scrollbar-track: ${props => props.theme.scrollbarTrack};
  }
  
  ::-webkit-scrollbar-thumb {
    background: var(--scrollbar-thumb);
  }
  
  ::-webkit-scrollbar-track {
    background: var(--scrollbar-track);
  }
`;

const AppContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
  background: linear-gradient(
    135deg,
    ${props => props.theme.gradientStart} 0%,
    ${props => props.theme.gradientMid1} 25%,
    ${props => props.theme.gradientMid2} 50%,
    ${props => props.theme.gradientEnd} 75%,
    ${props => props.theme.gradientStart} 100%
  );
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
  color: ${props => props.theme.textColor};

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
  height: 40px;
  
  @media (max-width: 768px) {
    height: 60px;
  }
`;

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Save preference to localStorage
    localStorage.setItem('darkMode', !isDarkMode);
  };
  
  useEffect(() => {
    // Check for saved preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
      setIsDarkMode(true);
    }
    
    // Custom cursor implementation
    const cursorDot = document.createElement('div');
    const cursorOutline = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    cursorOutline.className = 'cursor-outline';
    
    // Set initial position to center of the viewport
    const initialX = window.innerWidth / 2;
    const initialY = window.innerHeight / 2;
    
    cursorDot.style.left = `${initialX}px`;
    cursorDot.style.top = `${initialY}px`;
    cursorOutline.style.left = `${initialX}px`;
    cursorOutline.style.top = `${initialY}px`;
    
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);
    
    // Force cursor display for touchscreen devices
    document.addEventListener('touchstart', () => {
      cursorDot.style.display = 'none';
      cursorOutline.style.display = 'none';
      document.body.style.cursor = 'auto';
    });
    
    // Show cursor for mouse devices
    document.addEventListener('mousedown', () => {
      cursorDot.style.display = 'block';
      cursorOutline.style.display = 'block';
      document.body.style.cursor = 'none';
    });
    
    const mouseMoveHandler = (e) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
      
      // Move custom cursor elements with precise positioning
      cursorDot.style.left = `${clientX}px`;
      cursorDot.style.top = `${clientY}px`;
      
      // Slight delay for outline for smoother effect
      setTimeout(() => {
        cursorOutline.style.left = `${clientX}px`;
        cursorOutline.style.top = `${clientY}px`;
      }, 50);
    };

    // Add hover effect for clickable elements
    const addCursorHoverEffect = () => {
      const clickableElements = document.querySelectorAll(
        'a, button, input[type="submit"], input[type="button"], .clickable'
      );

      clickableElements.forEach((element) => {
        element.addEventListener('mouseenter', () => {
          cursorDot.classList.add('cursor-hover');
          cursorOutline.classList.add('cursor-hover');
        });

        element.addEventListener('mouseleave', () => {
          cursorDot.classList.remove('cursor-hover');
          cursorOutline.classList.remove('cursor-hover');
        });
      });
    };

    // Scroll animation implementation
    const scrollReveal = () => {
      const reveals = document.querySelectorAll('.reveal');
      
      reveals.forEach((reveal) => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          reveal.classList.add('active');
        } else {
          reveal.classList.remove('active');
        }
      });
    };
    
    window.addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('scroll', scrollReveal);
    scrollReveal(); // Initial check
    
    // Run the hover effect setup
    addCursorHoverEffect();

    // Add reveal classes to section components
    const sections = document.querySelectorAll('section:not(#home)');
    sections.forEach(section => {
      section.classList.add('reveal', 'fade-bottom');
    });
    
    return () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('scroll', scrollReveal);
      document.body.removeChild(cursorDot);
      document.body.removeChild(cursorOutline);
    };
  }, []);

  // Update cursor styles on dark mode toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <AppContainer>
        <Hero />
        <SectionSpacer />
        <PhoneShowcase />
        <SectionSpacer />
        <Services />
        <SectionSpacer />
        <Contact />
        <Footer />
        <SectionNavigation />
        <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;

        