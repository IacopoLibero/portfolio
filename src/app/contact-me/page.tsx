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
                if (!value) error = "Il nome è obbligatorio";
                else if (value.length < 2) error = "Il nome deve contenere almeno 2 caratteri";
                break;

            case "lastName":
                if (!value) error = "Il cognome è obbligatorio";
                else if (value.length < 2) error = "Il cognome deve contenere almeno 2 caratteri";
                break;

            case "email":
                if (!value) error = "L'email è obbligatoria";
                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Formato email non valido";
                break;

            case "phone":
                if (value && !/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(value)) {
                    error = "Formato numero di telefono non valido";
                }
                break;

            case "message":
                if (!value) error = "Il messaggio è obbligatorio";
                else if (value.length < 10) error = "Il messaggio deve contenere almeno 10 caratteri";
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
            setErrorMessage("Correggi gli errori nel form prima di inviare");
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
                throw new Error(data.error || "Errore durante l'invio dell'email");
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
            console.error('Errore invio form:', error);
            setErrorMessage(error instanceof Error ? error.message : "Si è verificato un errore durante l'invio del messaggio");
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
                <div style={{
                    background: 'var(--color-surface)',
                    borderRadius: 'var(--radius-l)',
                    padding: 'var(--spacing-l)',
                    border: '1px solid var(--color-neutral-alpha-medium)',
                    boxShadow: 'var(--shadow-m)'
                }}>
                    <RevealFx translateY="8" paddingBottom="m">
                        <Heading as="h2" variant="heading-strong-xl" paddingBottom="8">
                            {contactMe.formHeading}
                        </Heading>
                        <Text variant="body-default-l" paddingBottom="xl">
                            {contactMe.formSubheading}
                        </Text>
                    </RevealFx>

                    <form onSubmit={handleSubmit} noValidate>
                        <Flex direction="column" gap="l">
                            <Flex direction="column" gap="l">
                                <Flex direction="column" gap="s" flex="1">
                                    <Text as="label" htmlFor="firstName" variant="body-strong-s">
                                        Nome *
                                    </Text>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        label="Nome"
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
                                        Cognome *
                                    </Text>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        label="Cognome"
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
                                    onBlur={handleBlur}
                                    required
                                />
                                {errors.email && (
                                    <Text style={{ color: 'var(--color-danger-strong)' }} variant="body-default-xs">
                                        {errors.email}
                                    </Text>
                                )}
                            </Flex>

                            <Flex direction="column" gap="s">
                                <Text as="label" htmlFor="phone" variant="body-strong-s">
                                    Telefono
                                </Text>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    label="Telefono"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                />
                                <Text variant="body-default-xs" onBackground="neutral-medium">Opzionale</Text>
                                {errors.phone && (
                                    <Text style={{ color: 'var(--color-danger-strong)' }} variant="body-default-xs">
                                        {errors.phone}
                                    </Text>
                                )}
                            </Flex>

                            <Flex direction="column" gap="s">
                                <Text as="label" htmlFor="message" variant="body-strong-s">
                                    Messaggio *
                                </Text>
                                <Textarea
                                    id="message"
                                    name="message"
                                    label="Messaggio"
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

                            <Flex horizontal="start" paddingTop="m">
                                <button
                                    type="submit"
                                    style={{
                                        background: 'var(--color-brand-background-strong)',
                                        color: 'var(--color-brand-on-background-strong)',
                                        padding: '10px 20px',
                                        border: 'none',
                                        borderRadius: 'var(--radius-m)',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        cursor: isSubmitting ? 'wait' : 'pointer',
                                        opacity: isSubmitting ? 0.7 : 1
                                    }}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Invio in corso..." : "Invia Messaggio"}
                                </button>
                            </Flex>
                        </Flex>
                    </form>
                </div>

                <Flex direction="column" gap="l" paddingTop="xl">
                    <Text variant="body-strong-l">Metodi di contatto alternativi</Text>
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
                    as="div"
                    direction="column"
                    position="fixed"
                    bottom="16"
                    right="16"
                    padding="l"
                    style={{
                        backgroundColor: 'var(--color-info-strong)',
                        borderRadius: '8px',
                        boxShadow: 'var(--shadow-l)',
                        zIndex: 100,
                        cursor: 'pointer'
                    }}
                    onClick={() => setShowSuccess(false)}
                >
                    <Heading as="h3" variant="heading-strong-s">Messaggio Inviato!</Heading>
                    <Text>Grazie per il tuo messaggio. Ti risponderò al più presto.</Text>
                </Flex>
            )}

            {showError && (
                <Flex
                    as="div"
                    direction="column"
                    position="fixed"
                    bottom="16"
                    right="16"
                    padding="l"
                    style={{
                        backgroundColor: 'var(--color-danger-strong)',
                        borderRadius: '8px',
                        boxShadow: 'var(--shadow-l)',
                        zIndex: 100,
                        cursor: 'pointer'
                    }}
                    onClick={() => setShowError(false)}
                >
                    <Heading as="h3" variant="heading-strong-s">Errore</Heading>
                    <Text>{errorMessage}</Text>
                </Flex>
            )}
        </Column>
    );
}