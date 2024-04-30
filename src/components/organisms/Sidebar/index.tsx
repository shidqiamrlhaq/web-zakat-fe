import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

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
          <nav className="grid items-start gap-4 px-2 font-medium lg:px-4">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.collapsible ? (
                  <Collapsible
                    open={isOpen}
                    onOpenChange={setIsOpen}
                  >
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
                          className={`ml-5 flex items-center rounded-lg p-1 text-sm lg:text-base text-muted-foreground transition-all hover:bg-muted hover:text-primary/80 ${router.pathname === subItem.subHref ? "bg-muted text-primary" : ""}`}
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
