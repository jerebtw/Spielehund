import {
  ColorScheme,
  ColorSchemeProvider,
  Global,
  MantineProvider
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getCookie, setCookie } from "cookies-next";
import { GetServerSidePropsContext } from "next";
import { AppProps } from "next/app";
import { useState } from "react";
import PocketBaseProvider from "../component/Pocketbase";

const queryClient = new QueryClient();

export default function MyApp({
  Component,
  pageProps,
  colorScheme: _colorScheme,
}: AppProps & { colorScheme: ColorScheme }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(_colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    setCookie("mantine-color-scheme", nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <PocketBaseProvider>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}>
          <MantineProvider
            theme={{ colorScheme, defaultRadius: "md" }}
            withNormalizeCSS
            withGlobalStyles>
            <Global
              styles={() => ({
                "::-webkit-scrollbar": {
                  width: 8,
                  height: 8,
                },

                "::-webkit-scrollbar-track": {
                  background: "transparent",
                },

                "::-webkit-scrollbar-thumb": {
                  background: "#2c2e33a4",
                  borderRadius: 4,
                },

                "::-webkit-scrollbar-corner": {
                  backgroundColor: "transparent",
                },

                "html, body, #__next": {
                  height: "100%",
                },
              })}
            />
            <NotificationsProvider>
              <Component {...pageProps} />
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </PocketBaseProvider>
    </QueryClientProvider>
  );
}

MyApp.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie("mantine-color-scheme", ctx) || "light",
});
