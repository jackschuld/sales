import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ServicesSection = styled.section`
  min-height: 100vh;
  background: white;
  padding: 100px 0;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Title = styled.h2`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 60px;
  color: #333;
`;

const ServicesContainer = styled.div`
  display: flex;
  gap: 30px;
  padding: 20px 0;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  
  &::-webkit-scrollbar {
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
`;

const ServiceCard = styled(motion.div)`
  min-width: 300px;
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  scroll-snap-align: start;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ServiceIcon = styled.div`
  width: 60px;
  height: 60px;
  background: ${props => props.color};
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: white;
  font-size: 24px;
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #333;
`;

const ServiceDescription = styled.p`
  color: #666;
  line-height: 1.6;
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
    description: "Seamless integration of third-party APIs including Spotify, YouTube, Google Maps, and more.",
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
  return (
    <ServicesSection id="services">
      <Container>
        <Title>My Services</Title>
        <ServicesContainer>
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <ServiceIcon color={service.color}>{service.icon}</ServiceIcon>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
            </ServiceCard>
          ))}
        </ServicesContainer>
      </Container>
    </ServicesSection>
  );
};

export default Services; 