import "@/styles/globals.css";

import type { AppProps } from "next/app";

import { AppShell } from "@/components/layout";
import { Provider } from "@/components/Provider";
import { Toaster } from "@/components/ui/sonner";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <AppShell>
        <Component {...pageProps} />
        <Toaster />
      </AppShell>
    </Provider>
  );
}
