import Image from 'next/image';
import { Column, Flex, Heading, Text, RevealFx, Card, Button } from "@/once-ui/components";
import { certifications, person } from "@/app/resources/content";
import { baseURL } from "@/app/resources";
import { Meta, Schema } from "@/once-ui/modules";
import CertificationsClient from "./certifications-client";

export async function generateMetadata() {
  return Meta.generate({
    title: certifications.title,
    description: certifications.description,
    baseURL: baseURL,
    image: `${baseURL}/og?title=${encodeURIComponent(certifications.title)}`,
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
        image={`${baseURL}/og?title=${encodeURIComponent(certifications.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${certifications.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      
      <CertificationsClient 
        title={certifications.title}
        description={certifications.description}
        sortedCertifications={sortedCertifications}
        columnCount={columnCount}
      />
    </Column>
  );
}