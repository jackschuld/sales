import React, { useState, useEffect, useRef, useMemo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ShowcaseSection = styled.section`
  min-height: 300vh;
  background: transparent;
  padding: 0;
  position: relative;
  overflow: hidden;
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
  position: fixed;
  top: 50%;
  left: ${props => props.align === 'left' ? '5%' : 'auto'};
  right: ${props => props.align === 'right' ? '5%' : 'auto'};
  transform: translateY(-50%);
  height: 500px;
  width: 100%;
  max-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  opacity: ${props => props.isVisible ? 1 : 0};
  pointer-events: ${props => props.isVisible ? 'auto' : 'none'};
  transition: opacity 0.8s ease;
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
`;

const TextGroup = styled(motion.div)`
  margin: 100px 0;
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
  const [isVisible, setIsVisible] = useState([false, false]);
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
  const lastScrollY = useRef(0);
  const scrollDirection = useRef('down');
  
  // Define scroll thresholds for each phone (in pixels from the top of the section)
  // Using useMemo to prevent the array from being recreated on every render
  const phoneThresholdsDown = useMemo(() => [
    { start: -150, end: 500 },    // First phone appears immediately, disappears at 500px
    { start: 1500, end: 2500 }   // Second phone appears at 1500px, disappears at 2500px
  ], []);
  
  // Different thresholds for scrolling up
  const phoneThresholdsUp = useMemo(() => [
    { start: -100, end: 600 },    // First phone appears immediately, disappears at 400px
    { start: 1700, end: 2300 }   // Second phone appears at 1700px, disappears at 2300px
  ], []);
  
  // Define text block visibility thresholds
  const textThresholds = useMemo(() => [
    [
      { start: 0, end: 300 },     // First text block of first phone
      { start: 300, end: 600 },   // Second text block of first phone
      { start: 600, end: 900 }    // Third text block of first phone
    ],
    [
      { start: 1500, end: 1800 }, // First text block of second phone
      { start: 1800, end: 2100 }, // Second text block of second phone
      { start: 2100, end: 2400 }, // Third text block of second phone
    ]
  ], []);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      // Clear any existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      // Set a new timeout to debounce the scroll event
      scrollTimeout.current = setTimeout(() => {
        const section = sectionRef.current;
        const sectionTop = section.offsetTop;
        const scrollPosition = window.scrollY;
        
        // Determine scroll direction
        scrollDirection.current = scrollPosition > lastScrollY.current ? 'down' : 'up';
        lastScrollY.current = scrollPosition;
        
        // Calculate how far we've scrolled into the section
        const scrollIntoSection = scrollPosition - sectionTop;
        
        // Calculate scroll progress (0 to 1) for background transition
        const sectionHeight = section.offsetHeight;
        const progress = Math.min(Math.max(scrollIntoSection / (sectionHeight * 0.7), 0), 1);
        setScrollProgress(progress);
        
        // Determine which phone should be visible based on scroll position
        let newVisibility = [false, false];
        
        // Choose the appropriate thresholds based on scroll direction
        const thresholds = scrollDirection.current === 'down' ? phoneThresholdsDown : phoneThresholdsUp;
        
        // Check each phone's threshold
        for (let i = 0; i < thresholds.length; i++) {
          const { start, end } = thresholds[i];
          
          // If we're within this phone's threshold range, make it visible
          if (scrollIntoSection >= start && scrollIntoSection <= end) {
            newVisibility[i] = true;
            break;
          }
        }
        
        // Update phone visibility
        setIsVisible(newVisibility);
        
        // Update text block visibility - boxes stay visible once they appear
        let newTextVisibility = [...textVisibility];
        
        // Check each phone's text blocks
        for (let phoneIndex = 0; phoneIndex < textThresholds.length; phoneIndex++) {
          for (let textIndex = 0; textIndex < textThresholds[phoneIndex].length; textIndex++) {
            const { start } = textThresholds[phoneIndex][textIndex];
            
            // If we've scrolled past the start point, make the text block visible and keep it visible
            if (scrollIntoSection >= start) {
              newTextVisibility[phoneIndex][textIndex] = true;
            }
          }
        }
        
        // Update text visibility
        setTextVisibility(newTextVisibility);
        
      }, 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Trigger initial scroll check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [phoneThresholdsDown, phoneThresholdsUp, textThresholds, textVisibility]);

  // Determine if we're in dark mode based on scroll progress
  const isDarkMode = scrollProgress > 0.5;

  return (
    <ShowcaseSection id="showcase" ref={sectionRef}>
      <BackgroundOverlay scrollProgress={scrollProgress} />
      <SpacerTop />
      <ContentContainer>
        {showcaseData.map((item, index) => (
          <React.Fragment key={index}>
            <PhoneSection>
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
      
      {/* Fixed phones that fade in/out based on scroll position */}
      {showcaseData.map((item, index) => (
        <PhoneContainer 
          key={`phone-${index}`}
          ref={phoneRefs[index]} 
          align={item.align}
          isVisible={isVisible[index]}
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