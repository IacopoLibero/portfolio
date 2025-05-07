"use client";

import Image from 'next/image';
import { usePathname } from "next/navigation";
import { Column, Flex, Heading, Text, RevealFx, Card, Button } from "@/once-ui/components";
import { certifications } from "@/app/resources/content";

export default function Certifications() {
  const pathname = usePathname();

  // Sort certifications by date in descending order (newest first)
  const sortedCertifications = [...certifications.certifications].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Determine number of columns based on items count, maximum 4
  const itemCount = sortedCertifications.length;
  const columnCount = Math.min(itemCount, 4);

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
              Professional certifications and achievements
            </Text>
          </RevealFx>
        </div>
      </Column>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
        <div className="certification-grid" style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
          gap: '24px'
        }}>
          {sortedCertifications.map((cert, index) => (
            <RevealFx key={cert.title} translateY="16" delay={0.1 * index}>
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
                      maxWidth: '180px',
                      maxHeight: '180px',
                      position: 'relative',
                      paddingBottom: '50%', // Smaller aspect ratio
                      overflow: 'hidden',
                      borderRadius: '8px',
                      border: '1px solid var(--color-neutral-alpha-medium)',
                      margin: '0 auto'
                    }}>
                      <Image
                        alt={cert.title}
                        src={cert.image}
                        fill={true}
                        style={{ 
                          objectFit: "contain",
                          position: "absolute",
                          top: 0,
                          left: 0
                        }}
                      />
                    </div>
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
                    
                    {cert.credlyBadgeId && (
                      <Flex marginTop="8" horizontal="start">
                        <Button 
                          href={`https://www.credly.com/badges/${cert.credlyBadgeId}/public_url`}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="secondary"
                          label="View on Credly"
                          suffixIcon="externalLink"
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

      <style jsx>{`
        @media (max-width: 992px) {
          .certification-grid {
            grid-template-columns: repeat(${Math.min(columnCount, 2)}, 1fr) !important;
          }
        }
        @media (max-width: 576px) {
          .certification-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </Column>
  );
}