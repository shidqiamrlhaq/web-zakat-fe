import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { AppShell } from "@/components/layout";
import { Provider } from "@/components/Provider";
import { Toaster } from "@/components/ui/sonner";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const needToken = [
      "/",
      "/muzakki",
      "/mustahik",
      "/data-pengurus",
      "/infaq",
      "/laporan",
      "/masyarakat",
    ];

    const token = localStorage.getItem("token");

    if (needToken.includes(router.pathname) && !token) {
      router.replace("/login");
    }
  }, [router]);

  return (
    <Provider>
      <AppShell>
        <Component {...pageProps} />
        <Toaster />
      </AppShell>
    </Provider>
  );
}
