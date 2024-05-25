import { ChevronDown, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { ToggleTheme } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navItems } from "@/lib/constant";

export const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

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
          <nav className="grid w-full gap-2 font-medium">
            <Link href={"/"} className="mb-5 flex w-fit items-center gap-x-4">
              <Image
                src={"/logo-masjid.svg"}
                alt="Logo Masjid Alhidayah"
                width={200}
                height={200}
                className="h-20 w-20"
              />
              <p className="text-sm font-bold sm:text-base">
                Masjid Jamie Al-Hidayah
              </p>
            </Link>
            {navItems.map((item) => (
              <div key={item.name}>
                {item.collapsible ? (
                  <Collapsible
                    open={isOpen}
                    onOpenChange={setIsOpen}
                    className="mx-[-0.65rem]"
                  >
                    <CollapsibleTrigger className="flex w-full items-center rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-primary/80 sm:text-base">
                      <div className="flex w-full items-center justify-between">
                        <span className="flex items-center gap-x-3">
                          <item.icon className="h-5 w-5" />
                          {item.name}
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="ml-5 flex flex-col gap-y-2 text-lg font-medium">
                      {item.subItems?.map((subItem) => (
                        <Link
                          key={subItem.subName}
                          href={subItem.subHref}
                          className={`flex items-center rounded-xl p-1 text-sm text-muted-foreground hover:bg-muted hover:text-primary/80 ${router.pathname === subItem.subHref ? "bg-muted text-primary" : ""}`}
                        >
                          <subItem.subIcon className="h-5 w-5" />
                          {subItem.subName}
                        </Link>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href!}
                    className={`mx-[-0.65rem] flex items-center gap-x-3 rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-primary/80 sm:text-base ${router.pathname === item.href ? "bg-muted text-primary" : ""}`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>
          <div className="mt-auto">
            <Button
              size="sm"
              className="w-full hover:bg-destructive hover:text-white"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </SheetContent>
      </Sheet>
      <p className="text-center text-sm font-bold sm:text-lg lg:text-xl">
        Sistem Pengelolaan Zakat Fitrah
      </p>
      <ToggleTheme />
    </header>
  );
};
