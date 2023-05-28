import Head from "next/head";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <Head>
          <title>Quoted</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="./favicon.png" />
          <meta
            name="description"
            content="Create quotes and share thee knowledge with the world!"
          />
        </Head>
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
}
