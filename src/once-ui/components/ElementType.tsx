import Link from "next/link";
import React, { ReactNode, forwardRef } from "react";
import { Flex } from "./Flex";

interface ElementTypeProps {
  href?: string;
  onClick?: () => void;
  onLinkClick?: () => void;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  target?: string;
  [key: string]: any;
}

const isExternalLink = (url: string) => /^https?:\/\//.test(url);

const ElementType = forwardRef<HTMLElement, ElementTypeProps>(
  ({ href, type, onClick, onLinkClick, children, className, style, target, ...props }, ref) => {
    if (href) {
      const isExternal = isExternalLink(href);

      // Gestisci il target anche per i link che sembrano interni ma devono aprirsi in una nuova scheda
      const linkTarget = target || (isExternal ? "_blank" : undefined);
      const rel = linkTarget === "_blank" ? "noreferrer" : undefined;

      if (isExternal || target === "_blank") {
        return (
          <a
            href={href}
            target={linkTarget}
            rel={rel}
            ref={ref as React.Ref<HTMLAnchorElement>}
            className={className}
            style={style}
            onClick={() => onLinkClick?.()}
            {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          >
            {children}
          </a>
        );
      }

      return (
        <Link
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={className}
          style={style}
          onClick={() => onLinkClick?.()}
          target={target}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </Link>
      );
    }

    if (onClick || type === "submit" || type === "button") {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          className={className}
          onClick={onClick}
          style={style}
          {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {children}
        </button>
      );
    }

    return (
      <Flex
        ref={ref as React.Ref<HTMLDivElement>}
        className={className}
        style={style}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      >
        {children}
      </Flex>
    );
  },
);

ElementType.displayName = "ElementType";
export { ElementType };
