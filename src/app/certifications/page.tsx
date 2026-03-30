import { Column, Heading, Text, RevealFx } from "@/once-ui/components";
import { certifications, person, about } from "@/app/resources/content";
import { baseURL } from "@/app/resources";
import { Meta, Schema } from "@/once-ui/modules";
import CertificationsClient from "./certifications-client";

export async function generateMetadata() {
  return Meta.generate({
    title: certifications.title,
    description: certifications.description,
    baseURL: baseURL,
    keywords: certifications.keywords,
    image: certifications.image,
    path: certifications.path,
  });
}

export default function Certifications() {
  // Sort certifications by date in descending order (newest first)
  const sortedCertifications = [...certifications.certifications].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Determine number of columns based on items count, maximum 4
  const itemCount = sortedCertifications.length;
  const columnCount = Math.min(itemCount, 4);

  return (
    <Column fillWidth paddingBottom="xl">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={certifications.path}
        title={certifications.title}
        description={certifications.description}
        image={certifications.image}
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
              {certifications.heading}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.5} horizontal="start" paddingBottom="m">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {certifications.subheading}
            </Text>
          </RevealFx>
        </div>
      </Column>
      <CertificationsClient
        sortedCertifications={sortedCertifications}
        columnCount={columnCount}
      />
    </Column>
  );
}