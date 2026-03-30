import { Column, Heading } from "@/once-ui/components";
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
            <Heading as="h1" variant="display-strong-l" paddingTop="16" paddingBottom="l">
                {contactMe.title}
            </Heading>
            <ContactMeClient
                title={contactMe.title}
                description={contactMe.description}
                person={person}
            />
        </Column>
    );
}