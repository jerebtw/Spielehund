import {
  Badge,
  Box,
  Button,
  Card,
  Group,
  Image,
  ScrollArea,
  Stack,
  Title,
} from "@mantine/core";
import { useRouter } from "next/router";
import { useContext } from "react";
import { GameData } from "../../pages";
import { PocketBaseContext } from "../Pocketbase";

export default function GameItem(props: { game: GameData }) {
  const router = useRouter();
  const { pocketBase } = useContext(PocketBaseContext);
  const genres: { id: string; name: string }[] =
    props.game.expand?.genre?.map((item: { id: string; name: string }) => ({
      id: item.id,
      name: item.name,
    })) || [];

  return (
    <Card withBorder>
      <Card.Section>
        <Image
          onClick={() => router.push(`/game?id=${props.game.id}`)}
          src={pocketBase.getFileUrl(props.game, props.game.titleImage, {
            thumb: " 0x300",
          })}
          height={160}
          alt="Spielbild"
        />
      </Card.Section>

      <Stack spacing={8} mt={8}>
        <Title order={4} truncate >{props.game?.name}</Title>

        {genres.length !== 0 ? (
          <ScrollArea>
            <Group spacing={4} noWrap>
              {genres.map((genre) => (
                <Badge key={props.game.id + genre.id} color="violet">
                  {genre.name}
                </Badge>
              ))}
            </Group>
          </ScrollArea>
        ) : (
          <Box h={20} />
        )}

        <Button color="violet" onClick={() => router.push("/lol")} fullWidth>
          Spielen
        </Button>
      </Stack>
    </Card>
  );
}
