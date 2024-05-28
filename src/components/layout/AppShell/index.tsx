import { useRouter } from "next/router";
import React from "react";

import { ToggleTheme } from "@/components/molecules";
import { Navbar, Sidebar } from "@/components/organisms";

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const disableSideNav = ["/login", "/register"];

  return (
    <div className="flex w-full">
      {!disableSideNav.includes(router.pathname) ? (
        <>
          <Sidebar />
          <div className="flex w-full flex-col md:ml-[220px] lg:ml-[280px]">
            <Navbar />
            <main className="flex w-full flex-1 flex-col p-4">{children}</main>
          </div>
        </>
      ) : (
        <div className="flex w-full flex-col">
          <div className="fixed right-2 top-2 z-10 w-fit">
            <ToggleTheme />
          </div>
          <main
            className="flex min-h-screen w-full flex-1 flex-col items-center justify-center p-4"
            style={{
              backgroundImage: "url('/bg.svg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {children}
          </main>
        </div>
      )}
    </div>
  );
};
