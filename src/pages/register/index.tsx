import { CloseButton, Container, Group, Stack } from "@mantine/core";
import { useRouter } from "next/router";
import { AuthenticationForm } from "../../component/AuthForm/AuthenticationForm";
import Header from "../../component/Header";

export default function RegisterPage() {
  const router = useRouter();

  return (
    <>
      <Header />
      <Container p={8} px="12%">
        <Stack>
          <Group position="right">
            <CloseButton onClick={() => router.push("/")} />
          </Group>

          <AuthenticationForm type="register" />
        </Stack>
      </Container>
    </>
  );
}
