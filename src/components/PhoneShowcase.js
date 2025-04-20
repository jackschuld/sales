import React, { useState, useEffect, useRef, useMemo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ShowcaseSection = styled.section`
  min-height: 300vh;
  background: transparent;
  padding: 25vh 0 0 0;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-snap-type: y proximity;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
`;

const BackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, 
    rgba(99, 102, 241, 0) 0%,
    rgba(17, 24, 39, 0.9) 100%
  );
  opacity: ${props => props.scrollProgress};
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 1;
`;

const PhoneContainer = styled.div`
  position: ${props => props.position};
  top: ${props => props.isFixed ? '50%' : `${props.top}px`};
  left: ${props => props.align === 'left' ? '5%' : 'auto'};
  right: ${props => props.align === 'right' ? '5%' : 'auto'};
  transform: ${props => props.isFixed ? 'translateY(-50%)' : 'none'};
  height: 560px; /* Match the exact height of the phone */
  width: 100%;
  max-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  will-change: transform, top, position;
  transition: opacity 0.1s ease-out;
`;

const Phone = styled(motion.div)`
  width: 280px;
  height: 560px;
  background: #1a1a1a;
  border-radius: 40px;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
`;

const PhoneScreen = styled(motion.div)`
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  background: white;
  border-radius: 30px;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  height: 300vh;
  z-index: 2;
  scroll-margin: 50px;
`;

const TextGroup = styled(motion.div)`
  margin: 200px 0;
  padding: 20px;
  background: rgba(17, 24, 39, 0.8);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease, color 0.3s ease;
  color: #f8f9fa;
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: ${props => props.isVisible ? 'translateY(0)' : 'translateY(20px)'};
  transition: opacity 0.6s ease, transform 0.6s ease;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 20px;
  transition: color 0.3s ease;
  color: #f8f9fa;
`;

const Text = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  opacity: 0.9;
  transition: color 0.3s ease;
  color: #e9ecef;
`;

// Spacer elements to create scrollable content
const SpacerTop = styled.div`
  height: 10vh;
`;

const SpacerBottom = styled.div`
  height: 30vh;
`;

const PhoneSection = styled.div`
  height: 150vh;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  margin-bottom: 100px;
  scroll-snap-align: start;
  scroll-snap-stop: always;
`;

const SectionMarker = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: transparent;
  pointer-events: none;
`;

const SectionDivider = styled.div`
  height: 2px;
  background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.3), transparent);
  margin: 100px auto;
  width: 80%;
  opacity: 0.5;
  transition: opacity 0.3s ease;
`;

const showcaseData = [
  {
    phone: 1,
    title: "Full Stack Development",
    description: "Experienced in building complete web applications using React, Angular, Laravel, and .NET frameworks with a focus on clean code and best practices.",
    color: "#6366f1",
    align: "left"
  },
  {
    phone: 2,
    title: "Project Management",
    description: "Background in project management with experience leading teams through successful transitions and implementing new technologies across organizations.",
    color: "#a855f7",
    align: "right"
  }
];

const PhoneShowcase = () => {
  const [phonePositions, setPhonePositions] = useState([
    { isFixed: false, position: 'absolute', top: 550 },
    { isFixed: false, position: 'absolute', top: 2800 }
  ]);
  const [textVisibility, setTextVisibility] = useState([
    [false, false, false],
    [false, false, false, false]
  ]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);
  const phoneRefs = [useRef(null), useRef(null)];
  const sectionMarkerRefs = [
    { start: useRef(null), end: useRef(null) },
    { start: useRef(null), end: useRef(null) }
  ];
  const scrollTimeout = useRef(null);
  
  // Define section boundaries for each phone
  const phoneSections = useMemo(() => [
    { 
      topBoundary: 125,     // When first phone becomes fixed (sticky)
      bottomBoundary: 1300, // When first phone stops being fixed
      topOffset: 550,       // Initial position of first phone
      bottomOffset: 1750    // Final position of first phone
    },
    { 
      topBoundary: 2400,    // When second phone becomes fixed (sticky)
      bottomBoundary: 3350, // When second phone stops being fixed
      topOffset: 2800,      // Initial position of second phone
      bottomOffset: 3800    // Final position of second phone
    }
  ], []);
  
  // Define text block visibility thresholds
  const textThresholds = useMemo(() => [
    [
      { start: 0, end: 300 },
      { start: 300, end: 600 },
      { start: 600, end: 900 }
    ],
    [
      { start: 1500, end: 1800 },
      { start: 1800, end: 2100 },
      { start: 2100, end: 2400 },
    ]
  ], []);
  
  useEffect(() => {
    let isScrolling = false;
    
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      // Get necessary measurements
      const section = sectionRef.current;
      const sectionTop = section.offsetTop;
      const windowHeight = window.innerHeight;
      const viewportCenter = windowHeight / 2;
      const scrollPosition = window.scrollY;
      
      // Calculate how far we've scrolled into the section
      const scrollIntoSection = scrollPosition - sectionTop;
      
      // Calculate scroll progress (0 to 1) for background transition
      const sectionHeight = section.offsetHeight;
      const progress = Math.min(Math.max(scrollIntoSection / (sectionHeight * 0.7), 0), 1);
      setScrollProgress(progress);
      
      // Set a flag to prevent too many calculations during scroll
      if (isScrolling) return;
      
      isScrolling = true;
      
      // Use requestAnimationFrame for smoother animations
      requestAnimationFrame(() => {
        // Update phone positions based on scroll
        const newPhonePositions = [];
        
        // Calculate position for each phone
        phoneSections.forEach((section, index) => {
          const { topBoundary, bottomBoundary, topOffset, bottomOffset } = section;
          
          // Get the transition points in absolute scroll position
          const topTransitionPoint = sectionTop + topBoundary;
          const bottomTransitionPoint = sectionTop + bottomBoundary;
          
          // Constrain scrolling to stay within boundaries
          let effectiveScrollPosition = scrollPosition;
          
          // Adjust this value to fine-tune vertical centering when fixed
          // Negative values move phone up, positive values move it down
          const fixedPositionOffset = 0;
          
          // Before the top boundary - position absolute at starting position
          if (scrollPosition < topTransitionPoint) {
            newPhonePositions[index] = {
              isFixed: false,
              position: 'absolute',
              top: topOffset
            };
          }
          // Inside the section - stays fixed in viewport
          else if (scrollPosition >= topTransitionPoint && scrollPosition <= bottomTransitionPoint) {
            newPhonePositions[index] = {
              isFixed: true,
              position: 'fixed',
              top: fixedPositionOffset
            };
          }
          // After section - becomes absolute positioned
          else {
            newPhonePositions[index] = {
              isFixed: false,
              position: 'absolute',
              top: bottomOffset
            };
          }
        });
        
        setPhonePositions(newPhonePositions);
        
        // Update text block visibility
        let newTextVisibility = [...textVisibility];
        
        // Check each phone's text blocks
        for (let phoneIndex = 0; phoneIndex < textThresholds.length; phoneIndex++) {
          for (let textIndex = 0; textIndex < textThresholds[phoneIndex].length; textIndex++) {
            const { start } = textThresholds[phoneIndex][textIndex];
            
            if (scrollIntoSection >= start) {
              newTextVisibility[phoneIndex][textIndex] = true;
            }
          }
        }
        
        setTextVisibility(newTextVisibility);
        
        // Reset the scrolling flag
        isScrolling = false;
      });
    };

    // Add a scroll event listener with passive option for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Trigger initial scroll check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [phoneSections, textThresholds, textVisibility]);

  // Add a helper function to create smooth scroll animations
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <ShowcaseSection id="showcase" ref={sectionRef}>
      <BackgroundOverlay scrollProgress={scrollProgress} />
      <SpacerTop />
      <ContentContainer>
        {showcaseData.map((item, index) => (
          <React.Fragment key={index}>
            <PhoneSection
              id={`phone-section-${index}`}
              style={{
                scrollSnapAlign: 'start',
                scrollSnapStop: 'always',
                scrollMargin: '50px'
              }}
            >
              {/* Section markers to detect when to fix the phone and text */}
              <SectionMarker ref={sectionMarkerRefs[index].start} style={{ top: '10%' }} />
              <SectionMarker ref={sectionMarkerRefs[index].end} style={{ bottom: '10%' }} />
              
              {item.align === 'left' ? (
                <>
                  {/* Text groups that the phone scrolls past */}
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'flex-end',
                    marginLeft: 'auto',
                    width: '50%'
                  }}>
                    <TextGroup isVisible={textVisibility[index][0]}>
                      <Title>{item.title}</Title>
                      <Text>{item.description}</Text>
                    </TextGroup>
                    
                    <TextGroup isVisible={textVisibility[index][1]}>
                      <Title>Feature {index + 1}</Title>
                      <Text>This is an additional feature description for the {index + 1} phone. It highlights key capabilities and benefits.</Text>
                    </TextGroup>
                    
                    <TextGroup isVisible={textVisibility[index][2]}>
                      <Title>Another Feature</Title>
                      <Text>Here's another important feature that makes this phone stand out from the competition.</Text>
                    </TextGroup>
                    
                    {index === 1 && (
                      <TextGroup isVisible={textVisibility[index][3]}>
                        <Title>Extra Feature</Title>
                        <Text>This is an additional feature that provides even more value to the project management capabilities.</Text>
                      </TextGroup>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* Text groups that the phone scrolls past */}
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'flex-start',
                    marginRight: 'auto',
                    width: '50%'
                  }}>
                    <TextGroup isVisible={textVisibility[index][0]}>
                      <Title>{item.title}</Title>
                      <Text>{item.description}</Text>
                    </TextGroup>
                    
                    <TextGroup isVisible={textVisibility[index][1]}>
                      <Title>Feature {index + 1}</Title>
                      <Text>This is an additional feature description for the {index + 1} phone. It highlights key capabilities and benefits.</Text>
                    </TextGroup>
                    
                    <TextGroup isVisible={textVisibility[index][2]}>
                      <Title>Another Feature</Title>
                      <Text>Here's another important feature that makes this phone stand out from the competition.</Text>
                    </TextGroup>
                    
                    {index === 1 && (
                      <TextGroup isVisible={textVisibility[index][3]}>
                        <Title>Extra Feature</Title>
                        <Text>This is an additional feature that provides even more value to the project management capabilities.</Text>
                      </TextGroup>
                    )}
                  </div>
                </>
              )}
            </PhoneSection>
            
            {/* Add a divider between sections, but not after the last one */}
            {index < showcaseData.length - 1 && <SectionDivider />}
          </React.Fragment>
        ))}
      </ContentContainer>
      <SpacerBottom />
      
      {/* Phones that are fixed or absolute positioned based on scroll */}
      {showcaseData.map((item, index) => (
        <PhoneContainer 
          key={`phone-${index}`}
          ref={phoneRefs[index]} 
          align={item.align}
          isFixed={phonePositions[index].isFixed}
          position={phonePositions[index].position}
          top={phonePositions[index].top}
        >
          <Phone>
            <PhoneScreen
              style={{
                background: item.color
              }}
            />
          </Phone>
        </PhoneContainer>
      ))}
    </ShowcaseSection>
  );
};

export default PhoneShowcase;