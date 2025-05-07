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
    Card,
    Icon
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

    const [errors, setErrors] = useState({
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

    const validateField = (name: string, value: string) => {
        let error = "";

        switch (name) {
            case "firstName":
                if (!value) error = "First name is required";
                else if (value.length < 2) error = "First name must contain at least 2 characters";
                break;

            case "lastName":
                if (!value) error = "Last name is required";
                else if (value.length < 2) error = "Last name must contain at least 2 characters";
                break;

            case "email":
                if (!value) error = "Email is required";
                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid email format";
                break;

            case "phone":
                if (value && !/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(value)) {
                    error = "Invalid phone number format";
                }
                break;

            case "message":
                if (!value) error = "Message is required";
                else if (value.length < 10) error = "Message must contain at least 10 characters";
                break;

            default:
                break;
        }

        return error;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const validateForm = () => {
        const newErrors = {
            firstName: validateField("firstName", formData.firstName),
            lastName: validateField("lastName", formData.lastName),
            email: validateField("email", formData.email),
            phone: validateField("phone", formData.phone),
            message: validateField("message", formData.message)
        };

        setErrors(newErrors);

        return !Object.values(newErrors).some(error => error !== "");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isSubmitting) return;

        if (!validateForm()) {
            setErrorMessage("Please correct the errors in the form before submitting");
            setShowError(true);
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Error while sending the email");
            }

            setShowSuccess(true);
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                message: ""
            });
        } catch (error) {
            console.error('Form submission error:', error);
            setErrorMessage(error instanceof Error ? error.message : "An error occurred while sending the message");
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
                <form onSubmit={handleSubmit} noValidate>
                    <Flex direction="column" gap="l">
                        <Flex direction="row" gap="l">
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
                                    onBlur={handleBlur}
                                    required
                                />
                                {errors.firstName && (
                                    <Text style={{ color: 'var(--color-danger-strong)' }} variant="body-default-xs">
                                        {errors.firstName}
                                    </Text>
                                )}
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
                                    onBlur={handleBlur}
                                    required
                                />
                                {errors.lastName && (
                                    <Text style={{ color: 'var(--color-danger-strong)' }} variant="body-default-xs">
                                        {errors.lastName}
                                    </Text>
                                )}
                            </Flex>
                        </Flex>

                        <Flex direction="row" gap="l">
                            <Flex direction="column" gap="s" flex="1">
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
                                    onBlur={handleBlur}
                                    required
                                />
                                {errors.email && (
                                    <Text style={{ color: 'var(--color-danger-strong)' }} variant="body-default-xs">
                                        {errors.email}
                                    </Text>
                                )}
                            </Flex>

                            <Flex direction="column" gap="s" flex="1">
                                <Text as="label" htmlFor="phone" variant="body-strong-s">
                                    Phone
                                </Text>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    label="Phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                />
                                {errors.phone && (
                                    <Text style={{ color: 'var(--color-danger-strong)' }} variant="body-default-xs">
                                        {errors.phone}
                                    </Text>
                                )}
                            </Flex>
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
                                onBlur={handleBlur}
                                required
                            />
                            {errors.message && (
                                <Text style={{ color: 'var(--color-danger-strong)' }} variant="body-default-xs">
                                    {errors.message}
                                </Text>
                            )}
                        </Flex>

                        <Flex horizontal="start" >
                            <button
                                type="submit"
                                style={{
                                    background: 'var(--color-brand-background-strong)',
                                    color: 'var(--color-brand-on-background-strong)',
                                    border: 'none',
                                    borderRadius: 'var(--radius-m)',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    cursor: isSubmitting ? 'wait' : 'pointer',
                                    opacity: isSubmitting ? 0.7 : 1,
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                    transition: 'all 0.2s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.12)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                                }}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Sending..." : "Send Message"}
                                {!isSubmitting && (
                                    <span style={{ marginLeft: '8px', display: 'inline-block' }}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                )}
                            </button>
                        </Flex>
                    </Flex>
                </form>


                {/* Mobile success message - only visible on mobile */}
                {showSuccess && (
                    <div className="mobile-success-message" style={{
                        display: 'none', // Hidden by default, shown via media query
                        backgroundColor: 'var(--color-info-strong)',
                        borderRadius: '8px',
                        boxShadow: 'var(--shadow-l)',
                        padding: 'var(--spacing-l)',
                        marginTop: '30px'
                    }}>
                        <Heading as="h3" variant="heading-strong-s">Message Sent!</Heading>
                        <Text>Thank you for your message. I'll get back to you soon.</Text>
                    </div>
                )}

                <Flex direction="column" gap="l" paddingTop="xl">
                    <Text variant="body-strong-l">Alternative Contact Methods</Text>
                    <Flex direction="column" gap="m">
                        <Flex direction="row" gap="m" vertical="center">
                            <Flex background="surface" padding="s" radius="full">
                                <Icon name="email" size="m" />
                            </Flex>
                            <Text>
                                <a href={`mailto:${person.email}`}>{person.email}</a>
                            </Text>
                        </Flex>

                        <Flex direction="row" gap="m" vertical="center">
                            <Flex background="surface" padding="s" radius="full">
                                <Icon name="phone" size="m" />
                            </Flex>
                            <Text>
                                <a href={`tel:${person.phone}`}>{person.phone}</a>
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </div>

            {/* Desktop success message - only visible on larger screens */}
            {showSuccess && (
                <Flex
                    as="div"
                    className="desktop-success-message"
                    direction="column"
                    position="fixed"
                    padding="l"
                    style={{
                        backgroundColor: 'var(--color-info-strong)',
                        borderRadius: '8px',
                        boxShadow: 'var(--shadow-l)',
                        zIndex: 100,
                        cursor: 'pointer',
                        right: '16px',
                        bottom: '16px',
                        width: 'calc(100% - 32px)',
                        maxWidth: '420px',
                        transform: 'none',
                    }}
                    onClick={() => setShowSuccess(false)}
                >
                    <Heading as="h3" variant="heading-strong-s">Message Sent!</Heading>
                    <Text>Thank you for your message. I'll get back to you soon.</Text>
                </Flex>
            )}

            {showError && (
                <Flex
                    as="div"
                    direction="column"
                    position="fixed"
                    padding="l"
                    style={{
                        backgroundColor: 'var(--color-danger-strong)',
                        borderRadius: '8px',
                        boxShadow: 'var(--shadow-l)',
                        zIndex: 100,
                        cursor: 'pointer',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        bottom: '16px',
                        width: 'calc(100% - 32px)',
                        maxWidth: '420px',
                    }}
                    onClick={() => setShowError(false)}
                >
                    <Heading as="h3" variant="heading-strong-s">Error</Heading>
                    <Text>{errorMessage}</Text>
                </Flex>
            )}

            {/* Add the CSS for mobile/desktop switching */}
            <style jsx global>{`
                @media (max-width: 768px) {
                    .desktop-success-message {
                        display: none !important;
                    }
                    .mobile-success-message {
                        display: block !important;
                    }
                }
                
                @media (min-width: 769px) {
                    .mobile-success-message {
                        display: none !important;
                    }
                }
            `}</style>
        </Column>
    );
}