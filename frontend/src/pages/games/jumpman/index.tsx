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
import { useContext, useState } from "react";
import { Record } from "pocketbase";
import Keyboard from "../../../component/Keyboard";
import { useQuery } from "@tanstack/react-query";
import { PocketBaseContext } from "../../../component/Pocketbase";
import Loading from "../../../component/Loading";

interface Word extends Record {
  content: string;
}

export default function JumpManGame() {
  const router = useRouter();
  const { pocketBase, loading } = useContext(PocketBaseContext);

  const [currentWord, setCurrentWord] = useState("");
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
    if (checkWin()) {
      return "/JumpmanImages/Jumpman Won.png";
    }

    if (currentImage === walkImages.length) {
      return "/JumpmanImages/Jumpman Jump.gif";
    }

    return walkImages.at(currentImage).src;
  };

  const wordListQuery = useQuery({
    queryKey: ["wordList"],
    queryFn: async () => {
      const data = await pocketBase
        .collection("jumpmanWordlist")
        .getFullList<Word>({ sort: "content" });

      reset(data.map((item) => item.content));

      return data;
    },
    refetchOnWindowFocus: false,
    enabled: !loading,
  });

  function checkWin() {
    return (
      resultWort.filter((letter) => letter !== "_").length ===
      currentWord.length
    );
  }

  function checkLose() {
    return currentImage === walkImages.length;
  }

  function reset(wordList: string[]) {
    setCurrentWord(wordList[Math.floor(Math.random() * wordList.length)]);
    setSelectedVal("");
    setCurrentImage(0);
  }

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

          {wordListQuery.isLoading ? (
            <Loading />
          ) : (
            <>
              <Center py="2%">
                <Paper
                  pt="5%"
                  style={{
                    width: "80%",
                    height: "100%",
                    backgroundColor: "transparent",
                  }}
                  withBorder
                >
                  <img
                    src={currentImageSrc()}
                    style={{ paddingLeft: 16, paddingRight: 16, width: "100%" }}
                    alt="Jump"
                  />
                </Paper>
              </Center>

              <Center>
                <Group spacing={4}>
                  {(checkLose() ? currentWord.split("") : resultWort).map(
                    (letter, index) => {
                      const isCorrect = letter !== "_";
                      const lose = checkLose();

                      return (
                        <Button
                          key={`selected-${letter}-${index}`}
                          variant={lose || isCorrect ? "filled" : "default"}
                          color={lose ? "red" : "green"}
                        >
                          {(lose || isCorrect) && letter}
                        </Button>
                      );
                    }
                  )}
                </Group>
              </Center>

              <Keyboard
                setValue={setSelectedVal}
                value={selectedVal}
                onChange={(letter) => {
                  if (currentWord.includes(letter)) {
                    return;
                  }

                  setCurrentImage((c) => c + 1);
                }}
                finished={checkLose() || checkWin()}
                currentWord={currentWord}
                resetFunc={() =>
                  reset(wordListQuery.data?.map((item) => item.content) || [])
                }
              />
            </>
          )}
        </Stack>
      </Card>
    </Container>
  );
}
