import { Column } from "@/once-ui/components";
import { contactMe, person } from "@/app/resources/content";
import { baseURL } from "@/app/resources";
import { Meta, Schema } from "@/once-ui/modules";
import ContactMeClient from "./contact-me-client";

export async function generateMetadata() {
    return Meta.generate({
        title: contactMe.title,
        description: contactMe.description,
        baseURL: baseURL,
        image: `${baseURL}/og?title=${encodeURIComponent(contactMe.title)}`,
        path: contactMe.path,
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
                image={`${baseURL}/og?title=${encodeURIComponent(contactMe.title)}`}
                author={{
                    name: person.name,
                    url: `${baseURL}${contactMe.path}`,
                    image: `${baseURL}${person.avatar}`,
                }}
            />
            <ContactMeClient 
                title={contactMe.title}
                description={contactMe.description}
                person={person}
            />
        </Column>
    );
}