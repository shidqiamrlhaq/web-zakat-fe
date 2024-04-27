import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { Button } from "@/components/ui/button";
import { navItems } from "@/lib/constant";

export const Sidebar = () => {
  const router = useRouter();

  return (
    <aside className="hidden h-full border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <Link href={"/"} className="flex items-center justify-center p-6">
          <Image
            src={"/logo-masjid.svg"}
            alt="Logo Masjid Alhidayah"
            width={200}
            height={200}
            className="h-40 w-40"
          />
        </Link>
        <div className="flex-1">
          <nav className="grid items-start gap-4 px-2 text-sm font-medium lg:px-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary/80 lg:text-lg ${router.pathname === item.href ? "bg-muted text-primary" : ""}`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mb-6 mt-auto p-4">
          <Button
            size="sm"
            className="w-full hover:bg-destructive hover:text-white"
          >
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
};
