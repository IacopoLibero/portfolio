"use client";

import React from "react";
import { Flex, Heading, Text, RevealFx, Column } from "@/once-ui/components";

export const PacmanGame: React.FC = () => {
    return (
        <RevealFx translateY="16" delay={0.4} fillWidth>
            <Column fillWidth paddingX="l" gap="m" horizontal="center">
                <Text variant="body-default-m" onBackground="neutral-weak">
                    Use arrow keys to move and <b>P</b> to pause.
                </Text>
                <Flex
                    fillWidth
                    style={{
                        aspectRatio: "550/700",
                        maxWidth: "900px",
                        border: "4px solid var(--neutral-alpha-medium)",
                        borderRadius: "var(--radius-l)",
                        overflow: "hidden",
                        backgroundColor: "#000",
                    }}
                >
                    <iframe
                        src="/games/pacman/index.html"
                        scrolling="no"
                        style={{
                            width: "100%",
                            height: "100%",
                            border: "none",
                            overflow: "hidden",
                        }}
                        title="Pacman Game"
                    />
                </Flex>
            </Column>
        </RevealFx>
    );
};
