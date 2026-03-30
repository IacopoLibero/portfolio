import { Column, Heading } from "@/once-ui/components";
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
      
      <Heading as="h1" variant="display-strong-l" paddingTop="16" paddingBottom="l">
        {certifications.title}
      </Heading>
      <CertificationsClient
        title={certifications.title}
        description={certifications.description}
        sortedCertifications={sortedCertifications}
        columnCount={columnCount}
      />
    </Column>
  );
}