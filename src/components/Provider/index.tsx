import React from "react";

import TanstackQueryProvider from "./TanstackQuery";
import { ThemeProvider } from "./Theme";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TanstackQueryProvider>{children}</TanstackQueryProvider>
    </ThemeProvider>
  );
};
