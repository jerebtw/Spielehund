import { Button, Card, Image, Stack, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { useContext } from "react";
import { GameData } from "../../pages";
import { PocketBaseContext } from "../Pocketbase";

export default function GameItem(props: { game: GameData }) {
  const router = useRouter();
  const { pocketBase } = useContext(PocketBaseContext);

  return (
    <Card withBorder>
      <Card.Section>
        <Image
          onClick={() => router.push(`/game?id=${props.game.id}`)}
          src={pocketBase.getFileUrl(props.game, props.game.titleImage, {
            thumb: " 0x300",
          })}
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Stack spacing={8} mt={8}>
        <Title order={4}>{props.game?.name}</Title>

        <Button fullWidth onClick={() => router.push("/lol")}>
          Spielen
        </Button>
      </Stack>
    </Card>
  );
}
