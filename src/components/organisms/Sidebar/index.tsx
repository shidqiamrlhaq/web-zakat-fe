import { jwtDecode } from "jwt-decode";
import { ChevronDown, NotebookText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { navItems } from "@/lib/constant";

export const Sidebar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState<string | undefined>("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (window !== undefined && !token) {
      router.push("/login");
    }

    if (token) {
      const decoded = jwtDecode<{ role: string }>(token);
      setRole(decoded.role);
    }
  }, [router]);

  return (
    <div className="fixed left-0 top-0 z-10 h-screen overflow-y-auto md:w-[220px] lg:w-[280px]">
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
          {role === "ADMIN" ? (
            <div className="flex-1">
              <nav className="grid items-start gap-4 px-2 font-medium lg:px-4">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.collapsible ? (
                      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                        <CollapsibleTrigger
                          className={
                            "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary/80 lg:text-lg"
                          }
                        >
                          <div className="flex w-full items-center justify-between gap-x-3">
                            <span className="flex items-center gap-x-3">
                              <item.icon className="h-5 w-5" />
                              {item.name}
                            </span>
                            <ChevronDown
                              className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                            />
                          </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="flex flex-col gap-y-2">
                          {item?.subItems?.map((subItem) => (
                            <Link
                              key={subItem.subName}
                              href={subItem.subHref}
                              className={`ml-5 flex items-center rounded-lg p-1 text-sm text-muted-foreground transition-all hover:bg-muted hover:text-primary/80 lg:text-base ${router.pathname === subItem.subHref ? "bg-muted text-primary" : ""}`}
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
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary/80 lg:text-lg ${router.pathname === item.href ? "bg-muted text-primary" : ""}`}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          ) : (
            <nav className="grid items-start gap-4 px-2 font-medium lg:px-4">
              <Link
                href={"/laporan"}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary/80 lg:text-lg ${router.pathname === "/laporan" ? "bg-muted text-primary" : ""}`}
              >
                <NotebookText className="h-5 w-5" />
                Laporan
              </Link>
            </nav>
          )}
          <div className="mb-6 mt-auto p-4">
            <Button
              size="sm"
              className="w-full hover:bg-destructive hover:text-white"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
};
