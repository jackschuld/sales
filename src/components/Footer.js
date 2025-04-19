import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: #1a1a1a;
  color: white;
  padding: 60px 0 20px;
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
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.2rem;
    margin-bottom: 20px;
    color: #fff;
  }
  
  p {
    color: #999;
    line-height: 1.6;
    margin-bottom: 15px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
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
            <p>Home</p>
            <p>Showcase</p>
            <p>Services</p>
            <p>Contact</p>
          </FooterSection>
          <FooterSection>
            <h3>Skills</h3>
            <p>React.js & Angular</p>
            <p>Laravel & .NET</p>
            <p>API Integration</p>
            <p>Database Management</p>
          </FooterSection>
          <FooterSection>
            <h3>Connect With Me</h3>
            <p>Follow me on social media for updates and insights.</p>
            <SocialLinks>
              <SocialLink href="https://github.com/" target="_blank" aria-label="GitHub">💻</SocialLink>
              <SocialLink href="https://linkedin.com/" target="_blank" aria-label="LinkedIn">💼</SocialLink>
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