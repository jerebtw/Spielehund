import {
  ActionIcon,
  Burger,
  Button,
  Container,
  createStyles,
  Group,
  Header,
  HoverCard,
  Menu,
  Paper,
  Stack,
  Text,
  Title,
  Transition,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import {
  IconLogin,
  IconMoon,
  IconPlayCard,
  IconSun,
  IconUser,
  IconUserPlus,
} from "@tabler/icons-react";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useContext } from "react";
import { PocketBaseContext } from "./Pocketbase";

export const IconProps = {
  size: 16,
};

const HEADER_HEIGHT = 60;
const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    zIndex: 1,
  },

  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",
    padding: 4,

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

export default function CustomHeader({ showLogin }: { showLogin?: boolean }) {
  const { classes } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const { auth } = useContext(PocketBaseContext);

  return (
    <>
      <Head>
        <title>Spielehund</title>
      </Head>
      <Header height={HEADER_HEIGHT} className={classes.root}>
        <Container className={classes.header}>
          <Group>
            <IconPlayCard size={32} />
            <Title order={3}>Spielehund</Title>
          </Group>

          <Group spacing={5} className={classes.links}>
            {!auth ? showLogin && <LoginButtons /> : <UserButton />}
            <ColorButton />
          </Group>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />
          <Transition
            transition="pop-top-right"
            duration={200}
            mounted={opened}>
            {(styles) => (
              <Paper className={classes.dropdown} withBorder style={styles}>
                <Stack spacing={4}>
                  <ColorButton button />
                  {!auth ? (
                    showLogin && (
                      <Group spacing={4} grow>
                        <LoginButtons />
                      </Group>
                    )
                  ) : (
                    <UserButton />
                  )}
                </Stack>
              </Paper>
            )}
          </Transition>
        </Container>
      </Header>
    </>
  );
}

function ColorButton({ button }: { button?: boolean }) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const icon =
    colorScheme === "dark" ? (
      <IconSun {...IconProps} />
    ) : (
      <IconMoon {...IconProps} />
    );

  return button ? (
    <Button
      leftIcon={icon}
      variant="default"
      onClick={() => toggleColorScheme()}>
      {colorScheme === "dark" ? "Light mode" : "Dark mode"}
    </Button>
  ) : (
    <ActionIcon size="lg" variant="default" onClick={() => toggleColorScheme()}>
      {icon}
    </ActionIcon>
  );
}

function UserButton() {
  const { auth, logout } = useContext(PocketBaseContext);
  const router = useRouter();

  return (
    <Menu shadow="md" withArrow>
      <Menu.Target>
        <Button variant="default" leftIcon={<IconUser {...IconProps} />}>
          {auth?.username}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Text px={8} py={4} size="sm">{`E-Mail: ${auth?.email}`}</Text>
        <Text px={8} py={4} size="sm">{`XP: ${auth?.xp || "0"}`}</Text>
        <Menu.Item
          icon={<IconLogin {...IconProps} />}
          onClick={() => {
            logout();
            showNotification({
              title: "Abgemeldet",
              message: "Du wurdest erfolgreich abgemeldet",
              color: "green",
            });
            router.push("/");
          }}
          color="red">
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

function LoginButtons() {
  const router = useRouter();
  return (
    <>
      <Button
        variant="default"
        leftIcon={<IconLogin {...IconProps} />}
        onClick={() => router.push("/login")}>
        Login
      </Button>
      <Button
        variant="default"
        leftIcon={<IconUserPlus {...IconProps} />}
        onClick={() => router.push("/register")}>
        Register
      </Button>
    </>
  );
}
