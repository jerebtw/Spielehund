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
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconArrowBack, IconMoodSad } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext, useMemo } from "react";
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
    queryFn: async () =>
      await pocketBase
        .collection("games")
        .getOne<GameData>(id as string, { expand: "genre" }),
    refetchOnWindowFocus: false,
    enabled: !loading && !!id,
  });

  const images = useMemo(() => {
    const filesUrls: string[] = [];
    for (const image of gameQuery.data?.gameImages || []) {
      filesUrls.push(pocketBase.getFileUrl(gameQuery.data, image));
    }
    return filesUrls;
  }, [gameQuery.data, pocketBase]);

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
              leftIcon={<IconArrowBack {...IconProps} />}
              onClick={() => router.push("/")}
              color="red">
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

              {images.length !== 0 && (
                <>
                  <Title order={3}>Bilder:</Title>
                  <Carousel
                    sx={{ maxWidth: 800 }}
                    height="100%"
                    withIndicators
                    loop>
                    {images.map((image) => (
                      <Carousel.Slide key={image}>
                        <AspectRatio ratio={16 / 9}>
                          <Image src={image} alt={gameQuery.data.name} />
                        </AspectRatio>
                      </Carousel.Slide>
                    ))}
                  </Carousel>
                </>
              )}

              <Button
                loading={loading}
                onClick={() => router.push(gameQuery.data.url)}
                color="violet">
                Spielen
              </Button>
            </Stack>
          </Card>
        </Container>
      )}
    </>
  );
}
