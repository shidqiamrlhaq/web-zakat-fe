import React from "react";

import { Navbar, Sidebar } from "@/components/organisms";

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full">
      <div className="fixed left-0 top-0 z-10 h-screen overflow-y-auto md:w-[220px] lg:w-[280px]">
        <Sidebar />
      </div>
      <div className="flex w-full flex-col md:ml-[220px] lg:ml-[280px]">
        <Navbar />
        <main className="flex w-full flex-1 flex-col p-4">{children}</main>
      </div>
    </div>
  );
};
