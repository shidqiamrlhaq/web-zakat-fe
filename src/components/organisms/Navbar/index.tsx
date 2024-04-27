import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { ToggleTheme } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navItems } from "@/lib/constant";

export const Navbar = () => {
  const router = useRouter();

  return (
    <header className="flex h-14 items-center justify-between gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid w-full gap-2 text-lg font-medium">
            <Link href={"/"} className="mb-5 w-fit">
              <Image
                src={"/logo-masjid.svg"}
                alt="Logo Masjid Alhidayah"
                width={200}
                height={200}
                className="h-20 w-20"
              />
            </Link>
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-primary/80 sm:text-base ${router.pathname === item.href ? "bg-muted text-primary" : ""}`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="mt-auto">
            <Button
              size="sm"
              className="w-full hover:bg-destructive hover:text-white"
            >
              Logout
            </Button>
          </div>
        </SheetContent>
      </Sheet>
      <h1 className="text-center text-sm font-semibold sm:text-lg lg:text-xl">
        Sistem Pengelolaan Zakat Fitrah
      </h1>
      <ToggleTheme />
    </header>
  );
};
