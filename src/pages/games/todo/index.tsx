import {
  Stack,
  Container,
  Card,
  Group,
  Title,
  Image,
  Text,
  Button,
} from "@mantine/core";
import { useRouter } from "next/router";
import Header from "../../../component/Header";

export default function TodoPage() {
  const router = useRouter();

  return (
    <>
      <Header />
      <Container py="5%">
        <Card withBorder style={{ overflow: "scroll" }}>
          <Stack>
            <Group position="center">
              <Title>Work in Progress</Title>
              <Image
                px={15}
                py={15}
                height="60%"
                width="100%"
                src="/WiP.jpg"
                alt="With custom placeholder"
                withPlaceholder
                placeholder={
                  <Text align="center">
                    Dieses Bild konnte leider nicht geladen werden
                  </Text>
                }
              />
              <Button onClick={() => router.push("/")} color="violet">
                Zurück zur Startseite
              </Button>
            </Group>
          </Stack>
        </Card>
      </Container>
    </>
  );
}
