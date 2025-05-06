"use client";

import Image from 'next/image';
import { usePathname } from "next/navigation";
import { Column, Flex, Heading, Text, RevealFx, Card } from "@/once-ui/components";
import { certifications } from "@/app/resources/content";

export default function Certifications() {
  const pathname = usePathname();

  // Sort certifications by date in descending order (newest first)
  const sortedCertifications = [...certifications.certifications].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Column fillWidth paddingBottom="xl">
      <Column fillWidth paddingBottom="xl">
        <div style={{ maxWidth: '768px', margin: '0 auto', padding: '0 16px' }}>
          <RevealFx translateY="16" paddingTop="16" paddingBottom="l" horizontal="start">
            <Heading as="h1" variant="display-strong-l">
              {certifications.title}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} horizontal="start" paddingBottom="m">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {certifications.description}
            </Text>
          </RevealFx>
        </div>
      </Column>

      <div style={{ maxWidth: '768px', margin: '0 auto', padding: '0 16px' }}>
        <Flex direction="column" gap="xl">
          {sortedCertifications.map((cert, index) => (
            <RevealFx key={cert.title} translateY="16" delay={0.1 * index}>
              <Card
                className="certificate-card"
                background="surface"
                radius="l"
                padding="l"
                border="neutral-alpha-medium"
                shadow="m"
              >
                <Flex direction="column" gap="l">
                  {cert.image && (
                    <Flex
                      style={{
                        minWidth: '240px',
                        maxWidth: '100%',
                        maxHeight: '160px',
                        overflow: 'hidden',
                        borderRadius: '8px',
                        border: '1px solid var(--color-neutral-alpha-medium)'
                      }}
                    >
                      <Image
                        alt={cert.title}
                        src={cert.image}
                        width={240}
                        height={160}
                        style={{ objectFit: "cover" }}
                      />
                    </Flex>
                  )}
                  <Flex direction="column" gap="m" flex="1">
                    <Heading as="h2" variant="heading-strong-l">
                      {cert.title}
                    </Heading>
                    <Flex gap="s" direction="column">
                      <Text variant="body-strong-l" onBackground="brand-strong">
                        {cert.issuer}
                      </Text>
                      {cert.showDate && (
                        <Text variant="body-default-m" onBackground="neutral-medium">
                          {cert.displayDate}
                        </Text>
                      )}
                    </Flex>
                    <Text variant="body-default-l">{cert.description}</Text>
                  </Flex>
                </Flex>
              </Card>
            </RevealFx>
          ))}
        </Flex>
      </div>
    </Column>
  );
}