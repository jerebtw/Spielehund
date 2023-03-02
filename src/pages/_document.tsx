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
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
