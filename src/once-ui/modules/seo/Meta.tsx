import { Metadata as NextMetadata } from "next";

export interface MetaProps {
  title: string;
  description: string;
  baseURL: string;
  path?: string;
  type?: "website" | "article";
  image?: string;
  publishedTime?: string;
  keywords?: string[]; // Aggiunta delle keywords
  author?: {
    name: string;
    url?: string;
  };
}

export function generateMetadata({
  title,
  description,
  baseURL,
  path = "",
  type = "website",
  image,
  publishedTime,
  keywords, // Aggiunta del parametro keywords
  author,
}: MetaProps): NextMetadata {
  const normalizedBaseURL = baseURL.endsWith("/") ? baseURL.slice(0, -1) : baseURL;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  // Ensure baseURL has protocol for valid URL construction
  const validBaseURL = normalizedBaseURL.startsWith("http") 
    ? normalizedBaseURL 
    : `https://${normalizedBaseURL}`;

  const isFullUrl = (url: string) => /^https?:\/\//.test(url);

  const ogImage = image
    ? isFullUrl(image)
      ? image
      : `${validBaseURL}${image.startsWith("/") ? image : `/${image}`}`
    : `${validBaseURL}/og.png`; // Fallback to standard og.png

  const url = `${validBaseURL}${normalizedPath}`;

  return {
    title,
    description,
    ...(keywords && keywords.length > 0 ? { keywords: keywords.join(", ") } : {}),
    alternates: {
      canonical: url,
    },
    metadataBase: new URL(validBaseURL),
    openGraph: {
      title,
      description,
      type,
      siteName: "Iacopo Libero's Portfolio",
      ...(publishedTime && type === "article" ? { publishedTime } : {}),
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    ...(author ? { authors: [{ name: author.name, url: author.url }] } : {}),
  };
}

// Export con alias per mantenere compatibilità
export const Meta = {
  generate: generateMetadata
};