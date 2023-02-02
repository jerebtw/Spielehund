import { Carousel } from "@mantine/carousel";
import {
  AspectRatio,
  Box,
  Button,
  Card,
  Center,
  CloseButton,
  Container,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconArrowBack, IconMoodSad } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";
import { GameData } from "..";
import Header, { IconProps } from "../../component/Header";
import Loading from "../../component/Loading";
import { PocketBaseContext } from "../../component/Pocketbase";

export default function GamePage() {
  const router = useRouter();
  const { pocketBase, loading } = useContext(PocketBaseContext);
  const { id } = router.query;

  const gameQuery = useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      const game = await pocketBase
        .collection("games")
        .getOne<GameData>(id as string, { expand: "genre" });
      console.log(game);
      return game;
    },
    refetchOnWindowFocus: false,
    enabled: !loading && !!id,
  });

  return (
    <>
      <Header showLogin />
      {!id || gameQuery.isError ? (
        <Center pt="20%">
          <Stack>
            <Title>Spiel nicht gefunden</Title>
            <Group position="center">
              <IconMoodSad size={80} />
            </Group>
            <Button
              color="red"
              leftIcon={<IconArrowBack {...IconProps} />}
              onClick={() => router.push("/")}>
              Zurück
            </Button>
          </Stack>
        </Center>
      ) : loading || gameQuery.isLoading ? (
        <Loading />
      ) : (
        <Container px="10%" py="2%">
          <Card withBorder>
            <Stack>
              <Group position="apart">
                <Box />
                <Title order={3}>{gameQuery.data.name}</Title>
                <CloseButton onClick={() => router.push("/")} />
              </Group>

              {gameQuery.data.description && (
                <>
                  <Title order={3}>Beschreibung:</Title>
                  <Text>{gameQuery.data.description}</Text>
                </>
              )}

              {gameQuery.data?.gameImages?.length !== 0 && (
                <>
                  <Title order={3}>Bilder:</Title>
                  <Carousel
                    sx={{ maxWidth: 800 }}
                    height="100%"
                    mx="auto"
                    withIndicators
                    loop>
                    {gameQuery?.data?.gameImages?.map((image) => (
                      <Carousel.Slide key={image}>
                        <AspectRatio ratio={16 / 9}>
                          <Image
                            src={pocketBase.getFileUrl(gameQuery.data, image, {
                              thumb: "0x300",
                            })}
                            style={{ objectFit: "cover" }}
                            alt={gameQuery.data.name}
                          />
                        </AspectRatio>
                      </Carousel.Slide>
                    ))}
                  </Carousel>
                </>
              )}

              <Button
                loading={loading}
                color="violet"
                onClick={() => router.push(gameQuery.data.url)}>
                Spielen
              </Button>
            </Stack>
          </Card>
        </Container>
      )}
    </>
  );
}
