import Image from 'next/image';
import { Column, Flex, Heading, Text, RevealFx, Card, Button } from "@/once-ui/components";
import { certifications, person, about } from "@/app/resources/content";
import { baseURL } from "@/app/resources";
import { Meta, Schema } from "@/once-ui/modules";

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
  const sortedCertifications = [...certifications.certifications].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );


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

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {sortedCertifications.map((cert, index) => (
            <RevealFx key={cert.title} translateY="16" delay={0.4 * index}>
              <Card
                className="certificate-card"
                background="surface"
                radius="l"
                padding="l"
                border="neutral-alpha-medium"
                shadow="m"
                style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <Flex direction="column" gap="l" style={{ height: '100%' }}>
                  {cert.image && (
                    <div style={{
                      width: '100%',
                      maxWidth: '280px',
                      maxHeight: '220px',
                      position: 'relative',
                      paddingBottom: '50%',
                      overflow: 'hidden',
                      borderRadius: '8px',
                      border: '1px solid var(--color-neutral-alpha-medium)',
                      margin: '0 auto',
                    }}>
                      <Image
                        alt={cert.title}
                        src={cert.image}
                        fill={true}
                        priority={index === 0}
                        style={{ objectFit: 'contain', position: 'absolute', top: 0, left: 0 }}
                      />
                    </div>
                  )}
                  <Flex direction="column" gap="m" flex="1" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <Heading as="h2" variant="heading-strong-l">
                        {cert.title}
                      </Heading>
                      <Flex gap="s" direction="column" marginTop="m">
                        <Text variant="body-strong-l" onBackground="brand-strong">
                          {cert.issuer}
                        </Text>
                        {cert.showDate && (
                          <Text variant="body-default-m" onBackground="neutral-medium">
                            {cert.displayDate}
                          </Text>
                        )}
                      </Flex>
                      <Text variant="body-default-l" marginTop="m">{cert.description}</Text>
                    </div>
                    {cert.credlyBadgeId && (
                      <Flex style={{ marginTop: 'auto' }} paddingTop="l" horizontal="start">
                        <Button
                          href={`https://www.credly.com/badges/${cert.credlyBadgeId}/public_url`}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="outline"
                          label="View on Credly"
                          suffixIcon="arrowUpRightFromSquare"
                        />
                      </Flex>
                    )}
                  </Flex>
                </Flex>
              </Card>
            </RevealFx>
          ))}
        </div>
      </div>

    </Column>
  );
}
