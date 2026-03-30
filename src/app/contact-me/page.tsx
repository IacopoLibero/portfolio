import { Column, Heading, Text, RevealFx } from "@/once-ui/components";
import { contactMe, person, about } from "@/app/resources/content";
import { baseURL } from "@/app/resources";
import { Meta, Schema } from "@/once-ui/modules";
import ContactMeClient from "./contact-me-client";

export async function generateMetadata() {
    return Meta.generate({
        title: contactMe.title,
        description: contactMe.description,
        baseURL: baseURL,
        image: contactMe.image,
        path: contactMe.path,
        keywords: contactMe.keywords,
    });
}

export default function ContactMe() {
    return (
        <Column fillWidth>
            <Schema
                as="webPage"
                baseURL={baseURL}
                path={contactMe.path}
                title={contactMe.title}
                description={contactMe.description}
                image={contactMe.image}
                author={{
                    name: person.name,
                    url: `${baseURL}${about.path}`,
                    image: `${baseURL}${person.avatar}`,
                }}
            />
            <Column fillWidth paddingBottom="xl">
                <div style={{ maxWidth: '768px', margin: '0 auto', padding: '0 16px' }}>
                    <RevealFx translateY="16" paddingTop="16" paddingBottom="l" horizontal="start">
                        <Heading as="h1" variant="display-strong-l">
                            {contactMe.heading}
                        </Heading>
                    </RevealFx>
                    <RevealFx translateY="8" delay={0.5} horizontal="start" paddingBottom="xl">
                        <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
                            {contactMe.subheading}
                        </Text>
                    </RevealFx>
                </div>
            </Column>
            <ContactMeClient
                person={person}
            />
        </Column>
    );
}