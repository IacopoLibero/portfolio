import { Column, Heading, Text, RevealFx } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { about, person, work } from "@/app/resources/content";
import { Meta, Schema } from "@/once-ui/modules";
import { Projects } from "@/components/work/Projects";

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `${baseURL}/og?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

export default function Work() {
  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`${baseURL}/og?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      
      <Column fillWidth paddingBottom="xl">
        <RevealFx translateY="16" paddingTop="16" paddingBottom="l" horizontal="start">
          <Heading as="h1" variant="display-strong-l">
            {work.title}
          </Heading>
        </RevealFx>
        <RevealFx translateY="8" delay={0.2} horizontal="start" paddingBottom="m">
          <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
            {work.description}
          </Text>
        </RevealFx>
      </Column>
      
      <Projects />
    </Column>
  );
}
