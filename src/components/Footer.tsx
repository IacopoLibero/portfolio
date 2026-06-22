import { Flex, IconButton, SmartLink, Text } from "@/once-ui/components";
import { person, social } from "@/app/resources/content";
import styles from "./Footer.module.scss";

const TrustpilotIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0L14.832 8.72H24L16.584 14.112L19.416 22.832L12 17.44L4.584 22.832L7.416 14.112L0 8.72H9.168L12 0Z" fill="#00B67A"/>
  </svg>
);

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Flex
      as="footer"
      fillWidth
      padding="8"
      horizontal="center"
      mobileDirection="column"
    >
      <Flex
        className={styles.footer}
        maxWidth="m"
        paddingY="8"
        paddingX="16"
        gap="16"
        horizontal="space-between"
        vertical="center"
      >
        <Text variant="body-default-s" onBackground="neutral-strong">
          <Text onBackground="neutral-weak">© {currentYear}  -</Text>
          <Text paddingX="4">{person.name}</Text>
        </Text>
        <SmartLink
          href="https://www.trustpilot.com/review/iacopolibero.dev"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "flex", alignItems: "center", gap: "6px", opacity: 0.7 }}
        >
          <TrustpilotIcon />
          <Text variant="body-default-s" onBackground="neutral-weak">Trustpilot</Text>
        </SmartLink>
        <Flex gap="16" vertical="center">
          {social.map(
            (item) =>
              item.link && (
                <IconButton
                  key={item.name}
                  href={item.link}
                  icon={item.icon}
                  tooltip={item.name}
                  size="s"
                  variant="ghost"
                />
              ),
          )}
        </Flex>
      </Flex>
      <Flex height="80" show="s"></Flex>
    </Flex>
  );
};
