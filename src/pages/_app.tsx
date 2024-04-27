import "@/styles/globals.css";

import type { AppProps } from "next/app";

import { AppShell } from "@/components/layout";
import { Provider } from "@/components/Provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <AppShell>
        <Component {...pageProps} />
      </AppShell>
    </Provider>
  );
}
