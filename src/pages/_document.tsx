import Document, { Html, Head, Main, NextScript } from "next/document";
import { MagicScriptTag } from "../page-components/_document/magic-script";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Asap:400,700%7CWork+Sans:400,500,600,700%7CArchivo:400,500,600%7CRoboto+Mono:400&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#127db3" />
          <link
            rel="apple-touch-icon"
            sizes="48x48"
            href="/icons/icon-48x48.png?v=e32c87870d4630382a9dae8cae941af6"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/icons/icon-72x72.png?v=e32c87870d4630382a9dae8cae941af6"
          />
          <link
            rel="apple-touch-icon"
            sizes="96x96"
            href="/icons/icon-96x96.png?v=e32c87870d4630382a9dae8cae941af6"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/icons/icon-144x144.png?v=e32c87870d4630382a9dae8cae941af6"
          />
          <link
            rel="apple-touch-icon"
            sizes="192x192"
            href="/icons/icon-192x192.png?v=e32c87870d4630382a9dae8cae941af6"
          />
          <link
            rel="apple-touch-icon"
            sizes="256x256"
            href="/icons/icon-256x256.png?v=e32c87870d4630382a9dae8cae941af6"
          />
          <link
            rel="apple-touch-icon"
            sizes="384x384"
            href="/icons/icon-384x384.png?v=e32c87870d4630382a9dae8cae941af6"
          />
          <link
            rel="apple-touch-icon"
            sizes="512x512"
            href="/icons/icon-512x512.png?v=e32c87870d4630382a9dae8cae941af6"
          />
        </Head>
        <body>
          <MagicScriptTag />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
