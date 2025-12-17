"use client";

import {
    Column,
    Flex,
    Heading,
    Text,
    RevealFx,
    Input,
    Textarea,
    Icon
} from "@/once-ui/components";
import { useState, useEffect } from "react";

import { useSearchParams } from "next/navigation";

interface ContactMeClientProps {
    title: string;
    description: string;
    person: {
        name: string;
        email: string;
        phone: string;
        avatar: string;
    };
}

export default function ContactMeClient({ title, description, person }: ContactMeClientProps) {
    const searchParams = useSearchParams();
    const service = searchParams.get("service");

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: service ? `Hi,
I'm interested in your ${service} service.

Could you please provide a quote?
Here are some details about my project:
- ...

My estimated budget is:
- ...

Thanks!` : "",
        acceptPrivacy: false
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
        acceptPrivacy: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Effetto per nascondere i messaggi dopo 5 secondi
    useEffect(() => {
        let successTimer: NodeJS.Timeout;
        let errorTimer: NodeJS.Timeout;

        if (showSuccess) {
            successTimer = setTimeout(() => {
                setShowSuccess(false);
            }, 5000); // 5 secondi
        }

        if (showError) {
            errorTimer = setTimeout(() => {
                setShowError(false);
            }, 5000); // 5 secondi
        }

        // Cleanup per evitare memory leak
        return () => {
            if (successTimer) clearTimeout(successTimer);
            if (errorTimer) clearTimeout(errorTimer);
        };
    }, [showSuccess, showError]);

    const validateField = (name: string, value: string | boolean) => {
        let error = "";

        // Trim degli spazi per i campi stringa
        const trimmedValue = typeof value === 'string' ? value.trim() : value;

        switch (name) {
            case "firstName":
                if (!trimmedValue) error = "First name is required";
                else if (typeof trimmedValue === 'string' && trimmedValue.length < 1) error = "First name must contain at least 1 character";
                break;

            case "lastName":
                if (!trimmedValue) error = "Last name is required";
                else if (typeof trimmedValue === 'string' && trimmedValue.length < 1) error = "Last name must contain at least 1 character";
                break;

            case "email":
                if (!trimmedValue) error = "Email is required";
                else if (typeof trimmedValue === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) error = "Invalid email format";
                break;

            case "phone":
                if (trimmedValue && typeof trimmedValue === 'string' && !/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(trimmedValue)) {
                    error = "Invalid phone number format";
                }
                break;

            case "message":
                if (!trimmedValue) error = "Message is required";
                break;

            case "acceptPrivacy":
                if (!value) error = "You must accept the privacy policy";
                break;

            default:
                break;
        }

        return error;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        const error = validateField(name, type === 'checkbox' ? (checked ?? false) : value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

        const error = validateField(name, type === 'checkbox' ? (checked ?? false) : value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const validateForm = () => {
        const newErrors = {
            firstName: validateField("firstName", formData.firstName),
            lastName: validateField("lastName", formData.lastName),
            email: validateField("email", formData.email),
            phone: validateField("phone", formData.phone),
            message: validateField("message", formData.message),
            acceptPrivacy: validateField("acceptPrivacy", formData.acceptPrivacy)
        };

        setErrors(newErrors);

        return !Object.values(newErrors).some(error => error !== "");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isSubmitting) return;

        if (!validateForm()) {
            setErrorMessage("Please fill all the required fields correctly.");
            setShowError(true);
            return;
        }

        setIsSubmitting(true);

        try {
            // Trim dei dati prima dell'invio
            const trimmedFormData = {
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim(),
                message: formData.message.trim(),
                acceptPrivacy: formData.acceptPrivacy
            };

            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(trimmedFormData),
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
                message: "",
                acceptPrivacy: false
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
        <>
            <div style={{ maxWidth: '768px', margin: '0 auto', padding: '0 16px' }}>
                <RevealFx translateY="16" paddingTop="16" paddingBottom="l" horizontal="start">
                    <Heading as="h1" variant="display-strong-l">
                        {title}
                    </Heading>
                </RevealFx>
                <RevealFx translateY="8" delay={0.5} horizontal="start" paddingBottom="xl">
                    <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
                        {description}
                    </Text>
                </RevealFx>

                <RevealFx translateY="12" delay={1.0} horizontal="start">
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
                                    lines="auto"
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

                            {/* Privacy policy checkbox */}
                            <Flex direction="column" gap="s">
                                <Flex direction="row" gap="s" vertical="center">
                                    <input
                                        type="checkbox"
                                        id="acceptPrivacy"
                                        name="acceptPrivacy"
                                        checked={formData.acceptPrivacy}
                                        onChange={handleInputChange}
                                        style={{
                                            width: '16px',
                                            height: '16px',
                                            cursor: 'pointer',
                                            accentColor: 'var(--color-brand-background-strong)'
                                        }}
                                        required
                                    />
                                    <Text as="label" htmlFor="acceptPrivacy" variant="body-default-s" style={{ cursor: 'pointer' }}>
                                        I accept the{' '}
                                        <a
                                            href="/documents/privacy_policy.pdf"
                                            download="privacy_policy.pdf"
                                            style={{
                                                color: 'var(--color-brand-background-strong)',
                                                textDecoration: 'underline',
                                                cursor: 'pointer'
                                            }}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.color = 'var(--color-brand-background-weak)';
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.color = 'var(--color-brand-background-strong)';
                                            }}
                                        >
                                            Privacy Policy
                                        </a>
                                        {' '}*
                                    </Text>
                                </Flex>
                                {errors.acceptPrivacy && (
                                    <Text style={{ color: 'var(--color-danger-strong)' }} variant="body-default-xs">
                                        {errors.acceptPrivacy}
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

                            {/* Messaggi inline per visualizzazione mobile */}
                            <div className="mobile-messages">
                                {showSuccess && (
                                    <Flex
                                        direction="column"
                                        padding="m"
                                        style={{
                                            backgroundColor: 'var(--color-info-strong)',
                                            borderRadius: '8px',
                                            boxShadow: 'var(--shadow-s)',
                                            marginTop: '24px',
                                            marginBottom: '8px',
                                            width: '100%',
                                        }}
                                    >
                                        <Heading as="h3" variant="heading-strong-s">Message Sent!</Heading>
                                        <Text>Thank you for your message. I&apos;ll get back to you soon.</Text>
                                    </Flex>
                                )}

                                {showError && (
                                    <Flex
                                        direction="column"
                                        padding="m"
                                        style={{
                                            backgroundColor: 'var(--color-danger-strong)',
                                            borderRadius: '8px',
                                            boxShadow: 'var(--shadow-s)',
                                            marginTop: '24px',
                                            marginBottom: '8px',
                                            width: '100%',
                                        }}
                                    >
                                        <Heading as="h3" variant="heading-strong-s">Error</Heading>
                                        <Text>{errorMessage}</Text>
                                    </Flex>
                                )}
                            </div>
                        </Flex>
                    </form>
                </RevealFx>
                <RevealFx translateY="12" delay={1.0} horizontal="start">
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
                </RevealFx>

            </div>

            {/* Messaggi toast per visualizzazione desktop */}
            <div className="desktop-messages">
                {showSuccess && (
                    <Flex
                        as="div"
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
                        <Text>Thank you for your message. I&apos;ll get back to you soon.</Text>
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
                            right: '16px',
                            bottom: '16px',
                            width: 'calc(100% - 32px)',
                            maxWidth: '420px',
                            transform: 'none',
                        }}
                        onClick={() => setShowError(false)}
                    >
                        <Heading as="h3" variant="heading-strong-s">Error</Heading>
                        <Text>{errorMessage}</Text>
                    </Flex>
                )}
            </div>

            {/* Stili CSS per gestire la visualizzazione dei messaggi su diverse dimensioni dello schermo */}
            <style jsx global>{`
                @media (max-width: 768px) {
                    .desktop-messages {
                        display: none !important;
                    }
                    .mobile-messages {
                        display: block !important;
                    }
                }
                
                @media (min-width: 769px) {
                    .mobile-messages {
                        display: none !important;
                    }
                    .desktop-messages {
                        display: block !important;
                    }
                }
            `}</style>
        </>
    );
}