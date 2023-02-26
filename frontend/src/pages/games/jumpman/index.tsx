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
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useState } from "react";
import Keyboard from "../../../component/Keyboard";

export default function JumpManGame() {
  const router = useRouter();

  const [currentWord, setCurrentWord] = useState("TEST");
  const [selectedVal, setSelectedVal] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const walkImages = new Array(10).fill(0).map((_, index) => ({
    id: index + 1,
    src: `/JumpmanImages/Jumpman Walk${index + 1}.png`,
  }));

  const resultWort = currentWord.split("").map((letter) => {
    if (selectedVal.includes(letter)) {
      return letter;
    }

    return "_";
  });

  const currentImageSrc = () => {
    if (
      resultWort.filter((letter) => letter !== "_").length ===
      currentWord.length
    ) {
      return "/JumpmanImages/Jumpman Won.png";
    }

    if (currentImage === walkImages.length) {
      return "/JumpmanImages/Jumpman Jump.gif";
    }

    return walkImages.at(currentImage).src;
  };

  return (
    <Container py="5%">
      <Card withBorder style={{ overflow: "scroll" }}>
        <Stack>
          <Group position="apart">
            <HoverCard width={280} shadow="md" withArrow>
              <HoverCard.Target>
                <ActionIcon color="gray" radius="xl" variant="outline">
                  <IconInfoCircle size={18} />
                </ActionIcon>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Text size="sm">
                  In Jumpman wird ein zufälliges Wort gewählt, welches der
                  Spieler erraten soll. Dazu kannst du einfach einen Buchstaben
                  auswählen. Falls dieser im Wort vorkommt wird dir angezeigt an
                  welchen Stellen, falls nicht ist das Mänchen einen Schritt
                  näher am Tod. Schaffst du es das Wort heraus zu bekommen bevor
                  das Mänchen vom Dach springt?
                </Text>
              </HoverCard.Dropdown>
            </HoverCard>
            <Title order={3}>JumpMan</Title>
            <CloseButton onClick={() => router.push("/")} />
          </Group>

          <Center py="2%">
            <Paper
              pt="5%"
              style={{
                width: "80%",
                height: "100%",
                backgroundColor: "transparent",
              }}
              withBorder>
              <img
                src={currentImageSrc()}
                style={{ paddingLeft: 16, paddingRight: 16, width: "100%" }}
                alt="Jump"
              />
            </Paper>
          </Center>

          <Button
            onClick={() => {
              if (currentImage === walkImages.length) {
                setCurrentImage(0);
              } else {
                setCurrentImage((c) => c + 1);
              }
            }}>
            Next
          </Button>

          <Center>
            <Group spacing={4}>
              {resultWort.map((letter, index) => {
                const isCorrect = letter !== "_";

                return (
                  <Button
                    key={`selected-${letter}-${index}`}
                    variant="filled"
                    color={isCorrect ? "green" : "gray"}>
                    {isCorrect && letter}
                  </Button>
                );
              })}
            </Group>
          </Center>

          <Keyboard
            setValue={setSelectedVal}
            value={selectedVal}
            onChange={(letter) => {}}
            currentWord={currentWord}
          />
        </Stack>
      </Card>
    </Container>
  );
}
