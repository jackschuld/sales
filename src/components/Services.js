import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ServicesSection = styled.section`
  min-height: 100vh;
  height: auto;
  padding: 80px 0;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    padding: 40px 0;
    min-height: auto;
  }
`;

const CenteredWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 768px) {
    height: auto;
  }
`;

const Container = styled.div`
  width: 100%;
  // max-width: 1200px;
`;

const Title = styled(motion.h2)`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 60px;
  color: white;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 30px;
  }
`;

const ServiceCard = styled(motion.div)`
  min-width: 300px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 1;
  transform-origin: center center;

  &:hover {
    transform: translateY(-20px) scale(1.05) rotate(1deg);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2),
                0 0 0 1px rgba(255, 255, 255, 0.1);
    z-index: 2;
  }

  &:not(:hover) {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 0;
    right: 0;
    height: 20px;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), transparent);
    border-radius: 0 0 20px 20px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    min-width: 240px;
    padding: 20px;
  }
`;

const ServicesContainer = styled.div`
  display: flex;
  gap: 30px;
  padding: 100px;
  overflow-x: auto;
  position: relative;
  perspective: 1000px;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  ${ServiceCard}:hover ~ ${ServiceCard} {
    transform: scale(0.95) translateX(10px);
    opacity: 0.8;
  }

  ${ServiceCard} {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover ${ServiceCard}:not(:hover) {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  @media (max-width: 768px) {
    padding: 30px 20px;
    gap: 20px;
  }
`;

const ServiceIcon = styled.div`
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: white;
  font-size: 24px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 20px;
    margin-bottom: 15px;
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: #fff;
  font-weight: 600;
  letter-spacing: -0.5px;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
`;

const ServiceDescription = styled.p`
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const services = [
  {
    title: "Web Development",
    description: "Custom web applications built with React, Angular, Laravel, and .NET frameworks.",
    icon: "🌐",
    color: "#6366f1"
  },
  {
    title: "Mobile Apps",
    description: "Cross-platform mobile applications using Ionic and Angular for seamless user experiences.",
    icon: "📱",
    color: "#a855f7"
  },
  {
    title: "API Integration",
    description: "Seamless integration of third-party APIs including Shopify, YouTube, Google, and more.",
    icon: "🔌",
    color: "#3b82f6"
  },
  {
    title: "Data Management",
    description: "Robust data management solutions with MySQL, PostgreSQL, and data visualization tools.",
    icon: "📊",
    color: "#10b981"
  },
  {
    title: "Project Management",
    description: "Experienced in leading teams through successful transitions and implementations.",
    icon: "📋",
    color: "#f59e0b"
  },
  {
    title: "DevOps",
    description: "Setting up CI/CD pipelines, server management, and deployment automation.",
    icon: "⚙️",
    color: "#ec4899"
  }
];

const Services = () => {
  const containerRef = React.useRef(null);
  const [isHovering, setIsHovering] = React.useState(false);
  const scrollIntervalRef = React.useRef(null);
  const autoScrollIntervalRef = React.useRef(null);
  const resetTimeoutRef = React.useRef(null);
  const sectionRef = React.useRef(null);

  // Function to handle automatic scrolling
  const startAutoScroll = () => {
    if (containerRef.current && !isHovering) {
      autoScrollIntervalRef.current = setInterval(() => {
        const container = containerRef.current;
        if (!container) return;

        // If we reach the end, wait before resetting
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
          // Clear the auto-scroll interval
          if (autoScrollIntervalRef.current) {
            clearInterval(autoScrollIntervalRef.current);
            autoScrollIntervalRef.current = null;
          }

          // Wait for 2 seconds before resetting
          resetTimeoutRef.current = setTimeout(() => {
            // Smoothly scroll back to start
            container.scrollTo({
              left: 0,
              behavior: 'smooth'
            });

            // After resetting, start scrolling again
            setTimeout(() => {
              startAutoScroll();
            }, 1000); // Wait for the reset animation to complete
          }, 2000); // Wait 2 seconds at the end
        } else {
          container.scrollLeft += 1; // Slow continuous scroll
        }
      }, 20);
    }
  };

  // Function to handle edge scrolling
  const handleEdgeScroll = (direction, speed) => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scrollAmount = direction === 'left' ? -speed : speed;

    // Clear any existing interval
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
    }

    // Set up new continuous scroll
    scrollIntervalRef.current = setInterval(() => {
      container.scrollLeft += scrollAmount;
    }, 16); // ~60fps for smooth scrolling
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current || !isHovering) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const containerWidth = rect.width;
    const edgeZone = containerWidth * 0.2; // 20% edge zones

    // Clear auto-scroll when manually scrolling
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }

    if (mouseX < edgeZone) {
      // Left edge zone
      const speed = Math.max(5, 15 * (1 - mouseX / edgeZone));
      handleEdgeScroll('left', speed);
    } else if (mouseX > containerWidth - edgeZone) {
      // Right edge zone
      const speed = Math.max(5, 15 * ((mouseX - (containerWidth - edgeZone)) / edgeZone));
      handleEdgeScroll('right', speed);
    } else {
      // Clear scroll interval when not in edge zones
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
        scrollIntervalRef.current = null;
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    // Clear manual scroll interval
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
    // Restart auto-scroll
    startAutoScroll();
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    // Clear auto-scroll
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = null;
    }
  };

  // Start auto-scroll on component mount
  React.useEffect(() => {
    startAutoScroll();

    // Cleanup intervals and timeouts on unmount
    return () => {
      if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
      if (autoScrollIntervalRef.current) clearInterval(autoScrollIntervalRef.current);
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    };
  }, [isHovering]);

  return (
    <ServicesSection id="services" ref={sectionRef}>
      <CenteredWrapper>
        <Container>
          <Title
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            My Services
          </Title>
          <ServicesContainer
            ref={containerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          >
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  duration: 0.5,
                  delay: index * 0.1
                }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                viewport={{ once: false, amount: 0.3 }}
                animate={{
                  y: isHovering ? Math.sin(Date.now() / 1000 + index) * 10 : 0,
                }}
              >
                <ServiceIcon>{service.icon}</ServiceIcon>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.description}</ServiceDescription>
              </ServiceCard>
            ))}
          </ServicesContainer>
        </Container>
      </CenteredWrapper>
    </ServicesSection>
  );
};

export default Services;