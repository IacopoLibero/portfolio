import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import React, { ReactNode } from "react";
import dynamic from "next/dynamic";

import { 
  Heading,
  HeadingLink,
  SmartImage,
  SmartLink,
  Text,
  InlineCode,
} from "@/once-ui/components";
import { CodeBlock } from "@/once-ui/modules/code/CodeBlock";
import { TextProps } from "@/once-ui/interfaces";
import { SmartImageProps } from "@/once-ui/components/SmartImage";

type CustomLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

function CustomLink({ href, children, ...props }: CustomLinkProps) {
  if (href.startsWith("/")) {
    return (
      <SmartLink href={href} {...props}>
        {children}
      </SmartLink>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

function createImage({ alt, src, ...props }: SmartImageProps & { src: string }) {
  if (!src) {
    console.error("SmartImage requires a valid 'src' property.");
    return null;
  }

  return (
    <SmartImage
      marginTop="8"
      marginBottom="16"
      enlarge
      radius="m"
      aspectRatio="16 / 9"
      border="neutral-alpha-medium"
      sizes="(max-width: 960px) 100vw, 960px"
      alt={alt}
      src={src}
      {...props}
    />
  );
}

function extractText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return extractText(node.props.children);
  }
  return "";
}

function slugify(str: React.ReactNode): string {
  return extractText(str)
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

function createHeading(as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") {
  const CustomHeading = ({ children, ...props }: TextProps<typeof as>) => {
    const slug = slugify(children);
    return (
      <HeadingLink
        style={{ marginTop: "var(--static-space-24)", marginBottom: "var(--static-space-12)" }}
        as={as}
        id={slug}
        {...props}
      >
        {children}
      </HeadingLink>
    );
  };

  CustomHeading.displayName = `${as}`;

  return CustomHeading;
}

function createParagraph({ children }: TextProps) {
  return (
    <Text
      style={{ lineHeight: "175%" }}
      variant="body-default-m"
      onBackground="neutral-medium"
      marginTop="8"
      marginBottom="12"
    >
      {children}
    </Text>
  );
}

function createInlineCode({ children }: { children: ReactNode }) {
  return <InlineCode>{children}</InlineCode>;
}

/** Props del <code> annidato che MDX genera dentro un <pre>. */
type CodeChildProps = { className?: string; children?: ReactNode };

function createCodeBlock(props: React.ComponentPropsWithoutRef<"pre">) {
  // For pre tags that contain code blocks
  const child = props.children;
  if (React.isValidElement<CodeChildProps>(child) && child.props.className) {
    const { className, children } = child.props;

    // Extract language from className (format: language-xxx)
    const language = className.replace('language-', '');
    const label = language.charAt(0).toUpperCase() + language.slice(1);
    
    return (
      <CodeBlock
        marginTop="8"
        marginBottom="16"
        codeInstances={[
          {
            // CodeBlock vuole una stringa: children qui e' il ReactNode del <code>.
            code: extractText(children),
            language,
            label
          }
        ]}
        copyButton={true}
      />
    );
  }
  
  // Fallback for other pre tags or empty code blocks
  return <pre {...props} />;
}

// I componenti di once-ui accettano props piu' strette (TextProps) di quelle
// degli elementi HTML che sostituiscono, quindi le due firme non combaciano
// strutturalmente. Un solo cast sull'oggetto, invece di un `any` per voce.
const components = {
  p: createParagraph,
  h1: createHeading("h1"),
  h2: createHeading("h2"),
  h3: createHeading("h3"),
  h4: createHeading("h4"),
  h5: createHeading("h5"),
  h6: createHeading("h6"),
  img: createImage,
  a: CustomLink,
  code: createInlineCode,
  pre: createCodeBlock,
  Heading,
  Text,
  CodeBlock,
  InlineCode,
  Accordion: dynamic(() => import("@/once-ui/components").then(mod => mod.Accordion)),
  AccordionGroup: dynamic(() => import("@/once-ui/components").then(mod => mod.AccordionGroup)),
  Table: dynamic(() => import("@/once-ui/components").then(mod => mod.Table)),
  Feedback: dynamic(() => import("@/once-ui/components").then(mod => mod.Feedback)),
  Button: dynamic(() => import("@/once-ui/components").then(mod => mod.Button)),
  Card: dynamic(() => import("@/once-ui/components").then(mod => mod.Card)),
  Grid: dynamic(() => import("@/once-ui/components").then(mod => mod.Grid)),
  Row: dynamic(() => import("@/once-ui/components").then(mod => mod.Row)),
  Column: dynamic(() => import("@/once-ui/components").then(mod => mod.Column)),
  Icon: dynamic(() => import("@/once-ui/components").then(mod => mod.Icon)),
  SmartImage: dynamic(() => import("@/once-ui/components").then(mod => mod.SmartImage)),
  SmartLink: dynamic(() => import("@/once-ui/components").then(mod => mod.SmartLink)),
} as MDXRemoteProps["components"];

type CustomMDXProps = MDXRemoteProps & {
  components?: typeof components;
};

export function CustomMDX(props: CustomMDXProps) {
  return (
    <MDXRemote {...props} components={{ ...components, ...(props.components || {}) }} />
  );
}