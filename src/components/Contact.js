import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem 4rem;
  min-height: 100vh;
  background: radial-gradient(circle at center, rgba(0, 0, 20, 0.8) 0%, rgba(0, 0, 0, 0.95) 100%);
  position: relative;
  overflow: hidden;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 2rem 0.5rem 3rem;
  }
`;

const Title = styled(motion.h2)`
  font-size: 3.5rem;
  color: #fff;
  margin-bottom: 3rem;
  text-align: center;
  position: relative;
  letter-spacing: 2px;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 3px;
    background: linear-gradient(90deg, transparent, #4169E1, transparent);
  }
`;

const ContactForm = styled(motion.form)`
  background: rgba(10, 10, 40, 0.5);
  border-radius: 25px;
  padding: 3rem;
  max-width: 800px;
  width: 90%;
  border: 1px solid rgba(65, 105, 225, 0.3);
  backdrop-filter: blur(10px);
  transform-style: preserve-3d;
  perspective: 1000px;
  transition: all 0.3s ease;
  box-sizing: border-box;
  
  &:hover {
    border-color: rgba(65, 105, 225, 0.8);
    box-shadow: 0 15px 30px rgba(65, 105, 225, 0.2);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    width: 95%;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
  position: relative;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 1rem;
  color: #B0B0FF;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border-radius: 10px;
  background: rgba(20, 20, 50, 0.5);
  border: 1px solid rgba(65, 105, 225, 0.3);
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: rgba(65, 105, 225, 0.8);
    box-shadow: 0 0 10px rgba(65, 105, 225, 0.3);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 15px;
  border-radius: 10px;
  background: rgba(20, 20, 50, 0.5);
  border: 1px solid rgba(65, 105, 225, 0.3);
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: rgba(65, 105, 225, 0.8);
    box-shadow: 0 0 10px rgba(65, 105, 225, 0.3);
  }
  
  option {
    background: #0A0A28;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  border-radius: 10px;
  background: rgba(20, 20, 50, 0.5);
  border: 1px solid rgba(65, 105, 225, 0.3);
  color: #fff;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: rgba(65, 105, 225, 0.8);
    box-shadow: 0 0 10px rgba(65, 105, 225, 0.3);
  }
`;

const SubmitButton = styled.button`
  display: inline-block;
  padding: 12px 30px;
  background: rgba(65, 105, 225, 0.3);
  color: #fff;
  border: none;
  border-radius: 30px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(65, 105, 225, 0.5);
  position: relative;
  overflow: hidden;
  margin-top: 10px;
  
  &:hover:not(:disabled) {
    background: rgba(65, 105, 225, 0.5);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(65, 105, 225, 0.3);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: 0.5s;
  }
  
  &:hover::before:not(:disabled) {
    left: 100%;
  }
`;

const LoadingText = styled.span`
  display: none;
`;

const DefaultText = styled.span``;

const StatusMessage = styled.div`
  margin-top: 20px;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  transition: all 0.3s ease;
  
  &.success {
    background: rgba(0, 128, 0, 0.2);
    border: 1px solid rgba(0, 128, 0, 0.5);
    color: #90EE90;
  }
  
  &.error {
    background: rgba(220, 20, 60, 0.2);
    border: 1px solid rgba(220, 20, 60, 0.5);
    color: #FFA07A;
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiry_type: 'General',
    company: '',
    message: ''
  });
  
  const [status, setStatus] = useState({
    message: '',
    type: '' // 'success' or 'error'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    // Initialize EmailJS
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.async = true;
    document.body.appendChild(script);
    
    script.onload = () => {
      window.emailjs.init("ySHgOCav0GR7JaPsb");
    };
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ message: '', type: '' });
    
    // Send email using EmailJS
    window.emailjs.send('service_kx1wd3a', 'template_53z1ra5', {
      from_name: formData.name,
      from_email: formData.email,
      inquiry_type: formData.inquiry_type,
      company: formData.company,
      message: formData.message
    })
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      setStatus({
        message: 'Message sent successfully!',
        type: 'success'
      });
      // Reset form
      setFormData({
        name: '',
        email: '',
        inquiry_type: 'General',
        company: '',
        message: ''
      });
    })
    .catch((error) => {
      console.error('FAILED...', error);
      setStatus({
        message: 'Failed to send message. Please try again.',
        type: 'error'
      });
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };
  
  return (
    <ContactContainer id="contact">
      <Title
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Get In Touch
      </Title>
      <ContactForm
        id="contact-form"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <FormRow>
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </FormGroup>
        </FormRow>
        
        <FormRow>
          <FormGroup>
            <Label htmlFor="inquiry_type">Inquiry Type</Label>
            <Select 
              id="inquiry_type" 
              name="inquiry_type"
              value={formData.inquiry_type}
              onChange={handleChange}
            >
              <option value="General">General Inquiry</option>
              <option value="Job">Job Opportunity</option>
              <option value="Project">Project Collaboration</option>
              <option value="Other">Other</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="company">Company/Organization (Optional)</Label>
            <Input 
              type="text" 
              id="company" 
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
          </FormGroup>
        </FormRow>
        
        <FormGroup>
          <Label htmlFor="message">Message</Label>
          <TextArea 
            id="message" 
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></TextArea>
        </FormGroup>
        
        <SubmitButton 
          type="submit" 
          disabled={isSubmitting}
          className="submit-btn"
        >
          <DefaultText className="default-text">Send Message</DefaultText>
          <LoadingText className="loading-text">Sending...</LoadingText>
        </SubmitButton>
        
        {status.message && (
          <StatusMessage className={status.type}>
            {status.message}
          </StatusMessage>
        )}
      </ContactForm>
    </ContactContainer>
  );
};

export default Contact;
