import { Carousel } from "@mantine/carousel";
import {
  Button,
  Center,
  CloseButton,
  Container,
  Group,
  Image,
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
          <Stack>
            <Group position="right">
              <CloseButton onClick={() => router.push("/")} />
            </Group>

            <Center>
              <Title>{gameQuery.data.name}</Title>
            </Center>

            {gameQuery.data.description && (
              <>
                <Title order={3}>Beschreibung:</Title>
                <Text>{gameQuery.data.description}</Text>
              </>
            )}

            <Title order={3}>Bilder:</Title>
            <Carousel
              sx={{ maxWidth: 800 }}
              height="100%"
              mx="auto"
              withControls={false}
              withIndicators
              loop>
              {gameQuery?.data?.gameImages?.map((image) => (
                <Carousel.Slide key={image}>
                  <Image
                    src={pocketBase.getFileUrl(gameQuery.data, image, {
                      thumb: "0x300",
                    })}
                    style={{ objectFit: "cover" }}
                    alt={gameQuery.data.name}
                  />
                </Carousel.Slide>
              ))}
            </Carousel>

            <Button color="violet">Spielen</Button>
          </Stack>
        </Container>
      )}
    </>
  );
}
