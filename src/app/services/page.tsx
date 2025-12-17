import {
    Avatar,
    Button,
    Column,
    Flex,
    Heading,
    Icon,
    IconButton,
    SmartImage,
    Tag,
    Text,
    RevealFx
} from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { about, person, services, contactMe } from "@/app/resources/content";
import { Meta, Schema } from "@/once-ui/modules";

export async function generateMetadata() {
    return Meta.generate({
        title: services.label,
        description: services.description,
        baseURL: baseURL,
        image: `${baseURL}/og?title=${encodeURIComponent(services.label)}`,
        path: "/services",
    });
}

export default function Services() {
    return (
        <Column maxWidth="m">
            <Schema
                as="webPage"
                baseURL={baseURL}
                path="/services"
                title={services.label}
                description={services.description}
                image={`${baseURL}/og?title=${encodeURIComponent(services.label)}`}
                author={{
                    name: person.name,
                    url: `${baseURL}${about.path}`,
                    image: `${baseURL}${person.avatar}`,
                }}
            />

            <Column fillWidth paddingBottom="xl">
                <RevealFx translateY="16" paddingTop="16" paddingBottom="l" horizontal="start">
                    <Heading as="h1" variant="display-strong-l">
                        {services.title}
                    </Heading>
                </RevealFx>
                <RevealFx translateY="8" delay={0.5} horizontal="start" paddingBottom="m">
                    <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
                        {services.description}
                    </Text>
                </RevealFx>
            </Column>

            <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
                {services.items.map((service, index) => (
                    <RevealFx key={index} translateY="8" delay={index * 0.2} horizontal="start">
                        <Column fillWidth gap="m" padding="l" border="neutral-medium" radius="l" background="neutral-alpha-weak">
                            {service.images && service.images.length > 0 && (
                                <SmartImage
                                    radius="m"
                                    aspectRatio="16/9"
                                    alt={service.images[0].alt}
                                    src={service.images[0].src}
                                    sizes="100vw"
                                />
                            )}
                            <Heading as="h2" variant="heading-strong-xl">
                                {service.title}
                            </Heading>
                            <Text variant="body-default-l" onBackground="neutral-weak">
                                {service.description}
                            </Text>
                            <Button
                                href={`${contactMe.path}?service=${encodeURIComponent(service.title)}`}
                                variant="secondary"
                                arrowIcon
                            >
                                Get a quote
                            </Button>
                        </Column>
                    </RevealFx>
                ))}
            </Column>
        </Column>
    );
}
