import { createGetInitialProps } from "@mantine/next";
import NextDocument, { Head, Html, Main, NextScript } from "next/document";

const getInitialProps = createGetInitialProps();
export default class Document extends NextDocument {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#1a1b1e" />
          <meta name="description" content="Spielehund" />

          <link
            rel="icon"
            href="/favicon.svg"
            type="image/svg"
            media="(prefers-color-scheme: light)"
          />
          <link
            rel="icon"
            href="/favicon white.svg"
            type="image/svg"
            media="(prefers-color-scheme: dark)"
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
