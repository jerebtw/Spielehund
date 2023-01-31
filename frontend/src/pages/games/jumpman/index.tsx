import {
  ActionIcon,
  AspectRatio,
  Box,
  Button,
  Card,
  Center,
  CloseButton,
  Container,
  Group,
  HoverCard,
  Kbd,
  ScrollArea,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconAdjustments, IconInfoCircle } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Keyboard from "../../../component/Keyboard";

export default function JumpManGame() {
  const router = useRouter();
  const [selectedVal, setSelectedVal] = useState("    ");

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.imageSmoothingEnabled = true;

    context.fillStyle = "#000000";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    context.fillStyle = "green";
    context.fillRect(0, 400, 500, 100);
  }, []);

  return (
    <Container py="5%">
      <Card withBorder style={{ overflow: "scroll" }}>
        <Stack>

          <Group position="apart">
          <HoverCard width={280} shadow="md">
        <HoverCard.Target>
            <ActionIcon color="gray" radius="xl" variant="outline">
              <IconInfoCircle size={18} />
            </ActionIcon>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Text size="sm">
            In Jumpman wird ein zufälliges Wort gewählt, welches der Spieler erraten soll. 
            Dazu kannst du einfach einen Buchstaben auswählen. 
            Falls dieser im Wort vorkommt wird dir angezeigt an welchen Stellen, falls nicht ist das Mänchen einen Schritt näher am Tod. 
            Schaffst du es das Wort heraus zu bekommen bevor das Mänchen vom Dach springt?
          </Text>
        </HoverCard.Dropdown>
      </HoverCard>
            <Title order={3}>JumpMan</Title>
            <CloseButton onClick={() => router.push("/")} />
          </Group>

          {/* <Group spacing={4} position="center" noWrap>
            {selectedVal.split("").map((letter, index) => (
              <Kbd
                key={`selected-${letter}-${index}`}
                style={getKbdStyle(false)}>
                {letter}
              </Kbd>
            ))}
          </Group> */}

          <Center py="2%">
            <AspectRatio
              style={{
                width: "80%",
                height: "100%",
                backgroundColor: "red",
              }}
              ratio={16 / 9}>
              <canvas ref={canvasRef} style={{ imageRendering: "pixelated" }} />
            </AspectRatio>
          </Center>

          <Keyboard setValue={setSelectedVal} />
        </Stack>
      </Card>
    </Container>
  );
}
