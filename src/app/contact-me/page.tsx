"use client";

import { useState } from "react";
import { 
  Column, 
  Flex, 
  Heading, 
  Text, 
  RevealFx, 
  Input, 
  Textarea, 
  Button, 
  Card
} from "@/once-ui/components";
import { contactMe, person } from "@/app/resources/content";

export default function ContactMe() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      setErrorMessage("Please fill all required fields.");
      setShowError(true);
      setIsSubmitting(false);
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      setShowError(true);
      setIsSubmitting(false);
      return;
    }

    try {
      // In a real application, you would send this data to an API
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message and reset form
      setShowSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: ""
      });
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Column fillWidth paddingBottom="xl">
      <Column fillWidth paddingBottom="l">
        <div style={{ maxWidth: '768px', margin: '0 auto', padding: '0 16px' }}>
          <RevealFx translateY="16" paddingTop="16" paddingBottom="l" horizontal="start">
            <Heading as="h1" variant="display-strong-l">
              {contactMe.title}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} horizontal="start" paddingBottom="m">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {contactMe.description}
            </Text>
          </RevealFx>
        </div>
      </Column>

      <div style={{ maxWidth: '768px', margin: '0 auto', padding: '0 16px' }}>
        <Card background="surface" radius="l" padding="l" border="neutral-alpha-medium" shadow="m">
          <RevealFx translateY="8" paddingBottom="m">
            <Heading as="h2" variant="heading-strong-xl" paddingBottom="8">
              {contactMe.formHeading}
            </Heading>
            <Text variant="body-default-l" paddingBottom="xl">
              {contactMe.formSubheading}
            </Text>
          </RevealFx>
          
          <form onSubmit={handleSubmit}>
            <Flex direction="column" gap="l">
              <Flex direction="column" gap="l">
                <Flex direction="column" gap="s" flex="1">
                  <Text as="label" htmlFor="firstName" variant="body-strong-s">
                    First Name *
                  </Text>
                  <Input
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    required
                  />
                </Flex>
                
                <Flex direction="column" gap="s" flex="1">
                  <Text as="label" htmlFor="lastName" variant="body-strong-s">
                    Last Name *
                  </Text>
                  <Input
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    required
                  />
                </Flex>
              </Flex>
              
              <Flex direction="column" gap="s">
                <Text as="label" htmlFor="email" variant="body-strong-s">
                  Email *
                </Text>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                />
              </Flex>
              
              <Flex direction="column" gap="s">
                <Text as="label" htmlFor="phone" variant="body-strong-s">
                  Phone Number
                </Text>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  label="Phone Number" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (123) 456-7890"
                />
                <Text variant="body-default-xs" onBackground="neutral-medium">Optional</Text>
              </Flex>
              
              <Flex direction="column" gap="s">
                <Text as="label" htmlFor="message" variant="body-strong-s">
                  Message *
                </Text>
                <Textarea
                  id="message"
                  name="message"
                  label="Message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell me about your project or inquiry..."
                  required
                />
              </Flex>
              
              <Flex horizontal="start" paddingTop="m">
                <Button
                  type="submit"
                  variant="primary"
                  size="l"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </Flex>
            </Flex>
          </form>
        </Card>
        
        <Flex direction="column" gap="l" paddingTop="xl">
          <Text variant="body-strong-l">Alternative Contact Methods</Text>
          <Flex direction="column" gap="m">
            <Flex direction="row" gap="m" vertical="center">
              <Flex background="surface" padding="s" radius="full">
                <span style={{ fontSize: '1.25rem' }}>📧</span>
              </Flex>
              <Text>
                <a href={`mailto:${person.email}`}>{person.email}</a>
              </Text>
            </Flex>
            
            <Flex direction="row" gap="m" vertical="center">
              <Flex background="surface" padding="s" radius="full">
                <span style={{ fontSize: '1.25rem' }}>📞</span>
              </Flex>
              <Text>
                <a href={`tel:${person.phone}`}>{person.phone}</a>
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </div>
      
      {showSuccess && (
        <Flex 
          direction="column" 
          position="fixed" 
          bottom="16" 
          right="16" 
          padding="l"
          style={{
            backgroundColor: 'var(--color-info-strong)',
            borderRadius: '8px',
            boxShadow: 'var(--shadow-l)'
          }}
          onClick={() => setShowSuccess(false)}
        >
          <Heading as="h3" variant="heading-strong-s">Message Sent!</Heading>
          <Text>Thank you for your message. I'll get back to you soon.</Text>
        </Flex>
      )}
      
      {showError && (
        <Flex 
          direction="column" 
          position="fixed" 
          bottom="16" 
          right="16" 
          padding="l"
          style={{
            backgroundColor: 'var(--color-danger-strong)',
            borderRadius: '8px',
            boxShadow: 'var(--shadow-l)'
          }}
          onClick={() => setShowError(false)}
        >
          <Heading as="h3" variant="heading-strong-s">Error</Heading>
          <Text>{errorMessage}</Text>
        </Flex>
      )}
    </Column>
  );
}