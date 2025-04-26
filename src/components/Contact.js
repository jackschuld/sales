import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from 'emailjs-com';

const ContactSection = styled.section`
  min-height: 100vh;
  height: auto;
  padding: 80px 0;
  position: relative;
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    padding: 40px 0 60px;
    min-height: auto;
    margin-bottom: 0;
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
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 0 20px;
  }
`;

const ContactInfo = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const Title = styled(motion.h2)`
  font-size: 3rem;
  margin-bottom: 30px;
  color: white;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 20px;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 40px;
  color: rgba(255, 255, 255, 0.9);
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 30px;
  }
`;

const ContactDetails = styled(motion.div)`
  margin-top: 40px;
  
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ContactIcon = styled.div`
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const ContactText = styled.div`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
`;

const Form = styled(motion.form)`
  background: rgba(255, 255, 255, 0.1);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  position: relative;
  
  @media (max-width: 768px) {
    padding: 25px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: white;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  background: rgba(255, 255, 255, 0.1);
  color: white;

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
  }
`;

const SubmitButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 15px 30px;
  border-radius: 8px;
  font-size: 1.1rem;
  // cursor: pointer;
  width: 100%;
  backdrop-filter: blur(5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const StatusMessageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  z-index: 1000;
`;

const StatusMessage = styled(motion.div)`
  padding: 15px 25px;
  border-radius: 10px;
  font-size: 1rem;
  color: white;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  min-width: 260px;
  max-width: 90%;
  pointer-events: auto;
  background: ${props => props.isError 
    ? 'rgba(220, 38, 38, 0.9)' 
    : 'rgba(16, 185, 129, 0.9)'};
  border: 1px solid ${props => props.isError 
    ? 'rgba(220, 38, 38, 0.3)' 
    : 'rgba(16, 185, 129, 0.3)'};
`;

const StatusContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 5px;
`;

const StatusIcon = styled.div`
  font-size: 1.2rem;
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  margin-right: 8px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: '', isError: false, visible: false });

  // Auto-hide status message
  useEffect(() => {
    if (statusMessage.text) {
      const timer = setTimeout(() => {
        setStatusMessage(prev => ({ ...prev, visible: false }));
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [statusMessage.text]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage({ text: '', isError: false, visible: false });

    emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      formData,
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY
    )
    .then((result) => {
      console.log('Email sent successfully:', result.text);
      setStatusMessage({ text: 'Message sent successfully!', isError: false, visible: true });
      setFormData({ name: '', email: '', subject: '', message: '' });
    })
    .catch((error) => {
      console.error('Email error:', error);
      setStatusMessage({ text: 'Something went wrong. Please try again.', isError: true, visible: true });
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <ContactSection id="contact">
      <CenteredWrapper>
        <Container>
          <ContactInfo>
            <Title
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              Let's Connect
            </Title>
            <Description
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
              Feel free to reach out if you'd like to collaborate or just chat about technology.
            </Description>
            <ContactDetails
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <ContactItem>
                <ContactIcon>📧</ContactIcon>
                <ContactText>schuldjack@gmail.com</ContactText>
              </ContactItem>
              <ContactItem>
                <ContactIcon>📱</ContactIcon>
                <ContactText>847.609.3388</ContactText>
              </ContactItem>
              <ContactItem>
                <ContactIcon>📍</ContactIcon>
                <ContactText>Reno, NV</ContactText>
              </ContactItem>
              <ContactItem>
                <ContactIcon>🌐</ContactIcon>
                <ContactText>jackschuld.com</ContactText>
              </ContactItem>
            </ContactDetails>
          </ContactInfo>
          <Form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <FormGroup>
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Subject</Label>
              <Input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Message</Label>
              <TextArea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <SubmitButton
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner /> Sending...
                </>
              ) : (
                'Send Message'
              )}
            </SubmitButton>
            
            <AnimatePresence>
              {statusMessage.visible && statusMessage.text && (
                <StatusMessageWrapper>
                  <StatusMessage
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4 }}
                    isError={statusMessage.isError}
                  >
                    <StatusContent>
                      <StatusIcon>
                        {statusMessage.isError ? '❌' : '✅'}
                      </StatusIcon>
                      {statusMessage.text}
                    </StatusContent>
                  </StatusMessage>
                </StatusMessageWrapper>
              )}
            </AnimatePresence>
          </Form>
        </Container>
      </CenteredWrapper>
    </ContactSection>
  );
};

export default Contact;