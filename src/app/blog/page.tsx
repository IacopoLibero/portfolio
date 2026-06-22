import { Column, Heading, RevealFx, Text } from "@/once-ui/components";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { baseURL } from "@/app/resources";
import { blog, person, newsletter, about } from "@/app/resources/content";
import { Meta, Schema } from "@/once-ui/modules";

export async function generateMetadata() {
  return Meta.generate({
    title: blog.title,
    description: blog.description,
    baseURL: baseURL,
    image: blog.image,
    path: blog.path,
    keywords: blog.keywords,
  });
}

export default function Blog() {
  return (
    <Column maxWidth="s">
      <Schema
        as="blog"
        baseURL={baseURL}
        title={blog.title}
        description={blog.description}
        path={blog.path}
        image={blog.image}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column fillWidth paddingBottom="l">
        <RevealFx translateY="16" paddingTop="16" paddingBottom="l" horizontal="start">
          <Heading as="h1" variant="display-strong-l">
            {blog.heading}
          </Heading>
        </RevealFx>
        <RevealFx translateY="8" delay={0.5} horizontal="start" paddingBottom="m">
          <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
            {blog.subheading}
          </Text>
        </RevealFx>
      </Column>
      <RevealFx translateY="8" delay={0.8} horizontal="start">
        <Column fillWidth flex={1}>
          <Posts range={[1,1]} thumbnail direction="column"/>
          <Posts range={[2,3]} thumbnail/>
          <Posts range={[4]} columns="2"/>
        </Column>
      </RevealFx>
      {newsletter.display && <Mailchimp newsletter={newsletter} />}
    </Column>
  );
}
