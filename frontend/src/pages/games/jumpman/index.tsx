import {
  AspectRatio,
  Box,
  Card,
  Center,
  CloseButton,
  Container,
  Group,
  Kbd,
  ScrollArea,
  Stack,
  Title,
} from "@mantine/core";
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
