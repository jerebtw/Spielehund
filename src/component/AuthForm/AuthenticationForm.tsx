import { upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Anchor,
  Stack,
  Title,
  Center,
} from "@mantine/core";
import { useRouter } from "next/router";
import { IconProps } from "../Header";
import { IconLogin, IconUserPlus } from "@tabler/icons-react";
import { useContext, useState } from "react";
import { PocketBaseContext } from "../Pocketbase";
import { showNotification } from "@mantine/notifications";

interface AuthenticationForm {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
}

export function AuthenticationForm({ type }: { type: "login" | "register" }) {
  const router = useRouter();
  const { login, register, auth } = useContext(PocketBaseContext);
  const [loading, setLoading] = useState(false);

  const form = useForm<AuthenticationForm>({
    initialValues: {
      email: "",
      username: "",
      password: "",
      passwordConfirm: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 8
          ? "Password should include at least 8 characters"
          : null,
      passwordConfirm: (val, values) => {
        if (type === "register" && val !== values.password) {
          return "Passwords do not match";
        }

        return null;
      },
    },
  });

  async function formSubmit(values: AuthenticationForm) {
    setLoading(true);
    if (type === "register") {
      try {
        await register({
          username: values.username,
          email: values.email.toLowerCase(),
          password: values.password,
          passwordConfirm: values.passwordConfirm,
        });
        showNotification({
          title: "Erfolg",
          message: "Du wurdest registriert! Bitte prüfe deine E-Mails.",
          color: "green",
        });
        router.push("/login");
      } catch (error) {
        console.error(error);
        showNotification({
          title: "Fehler",
          message: `Fehler beim Registrieren: ${error.message}`,
          color: "red",
        });
      }
    } else {
      try {
        await login({
          email: values.email.toLowerCase(),
          password: values.password,
        });
        showNotification({
          title: "Erfolg",
          message: "Du wurdest angemeldet!",
          color: "green",
        });
        router.push("/");
      } catch (error) {
        console.error(error);
        showNotification({
          title: "Fehler",
          message: `Fehler beim Anmelden: ${error.message}`,
          color: "red",
        });
      }
    }
    setLoading(false);
  }

  if (auth) {
    router.push("/");
  }

  return (
    <Paper radius="md" p="xl" withBorder>
      <Stack spacing={2}>
        <Center>
          <Title order={3}>Willkommen bei Spielehund!</Title>
        </Center>
        <Center>
          <Text size="sm" weight={500}>
            {type === "register"
              ? "Registriere dich, um loszulegen!"
              : "Melde dich an, um loszulegen!"}
          </Text>
        </Center>

        <form onSubmit={form.onSubmit(formSubmit)}>
          <Stack>
            {type === "register" && (
              <TextInput
                required
                label="Name"
                placeholder="Dein Name"
                {...form.getInputProps("username")}
              />
            )}

            <TextInput
              required
              label="E-Mail"
              placeholder="test@spielehund.de"
              {...form.getInputProps("email")}
            />

            <PasswordInput
              required
              label="Passwort"
              placeholder="Dein Passwort"
              {...form.getInputProps("password")}
            />

            {type === "register" && (
              <PasswordInput
                required
                label="Passwort bestätigen"
                placeholder="Dein Passwort nochmal"
                {...form.getInputProps("passwordConfirm")}
              />
            )}
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() =>
                router.push(type === "register" ? "/login" : "/register")
              }
              size="xs">
              {type === "register"
                ? "Hast du schon einen Account? Einloggen"
                : "Du hast noch keinen Account? Registrieren"}
            </Anchor>
            <Button
              loading={loading}
              type="submit"
              leftIcon={
                type === "register" ? (
                  <IconUserPlus {...IconProps} />
                ) : (
                  <IconLogin {...IconProps} />
                )
              }>
              {type === "register" ? "Registrieren" : "Anmelden"}
            </Button>
          </Group>
        </form>
      </Stack>
    </Paper>
  );
}
