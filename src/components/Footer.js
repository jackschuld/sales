import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-scroll';

const FooterContainer = styled.footer`
  background: #1a1a1a;
  color: white;
  padding: 60px 0 20px;
  
  @media (max-width: 768px) {
    padding: 40px 0 20px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    margin-bottom: 30px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 25px;
  }
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.2rem;
    margin-bottom: 20px;
    color: #fff;
    
    @media (max-width: 768px) {
      margin-bottom: 15px;
    }
  }
  
  p {
    color: #999;
    line-height: 1.6;
    margin-bottom: 15px;
    
    @media (max-width: 768px) {
      margin-bottom: 10px;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
  
  @media (max-width: 768px) {
    margin-top: 15px;
  }
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: background 0.3s ease;
  
  &:hover {
    background: #6366f1;
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #999;
`;

const NavLink = styled(Link)`
  color: #999;
  line-height: 1.6;
  margin-bottom: 15px;
  display: block;
  
  &:hover {
    color: #fff;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Container>
        <FooterContent>
          <FooterSection>
            <h3>About Me</h3>
            <p>
              Full Stack Developer with a background in marketing and project management. 
              I specialize in building robust web applications using React, Angular, Laravel, and .NET.
            </p>
          </FooterSection>
          <FooterSection>
            <h3>Quick Links</h3>
            <NavLink to="home" smooth={true} duration={500}>Home</NavLink>
            <NavLink to="showcase" smooth={true} duration={500}>Showcase</NavLink>
            <NavLink to="services" smooth={true} duration={500}>Services</NavLink>
            <NavLink to="contact" smooth={true} duration={500}>Contact</NavLink>
          </FooterSection>
          <FooterSection>
            <h3>Skills</h3>
            <p>Web Design</p>
            <p>Marketing</p>
            <p>SEO</p>
            <p>React.js & Angular</p>
            <p>Laravel & .NET</p>
            <p>API Integration</p>
            <p>Database Management</p>
          </FooterSection>
          <FooterSection>
            <h3>Connect With Me</h3>
            <SocialLinks>
              <SocialLink href="https://github.com/jackschuld" target="_blank" aria-label="GitHub">💻</SocialLink>
              <SocialLink href="https://linkedin.com/in/jackschuld" target="_blank" aria-label="LinkedIn">💼</SocialLink>
              <SocialLink href="https://jackschuld.com" target="_blank" aria-label="Portfolio">🌐</SocialLink>
              <SocialLink href="mailto:schuldjack@gmail.com" aria-label="Email">📧</SocialLink>
            </SocialLinks>
          </FooterSection>
        </FooterContent>
        <Copyright>
          <p>&copy; {new Date().getFullYear()} Jack Schuld. All rights reserved.</p>
        </Copyright>
      </Container>
    </FooterContainer>
  );
};

export default Footer;