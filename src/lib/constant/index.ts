import { Dot, HandCoins, Home, NotebookText, Users } from "lucide-react";

export const navItems = [
  { name: "Beranda", href: "/", icon: Home, collapsible: false },
  {
    name: "Zakat",
    icon: HandCoins,
    collapsible: true,
    subItems: [
      {
        subName: "Muzakki",
        subHref: "/muzakki",
        subIcon: Dot,
      },
      {
        subName: "Mustahik",
        subHref: "/mustahik",
        subIcon: Dot,
      },
    ],
  },
  { name: "Laporan", href: "/laporan", icon: NotebookText, collapsible: false },
  {
    name: "Data Pengurus",
    href: "/data-pengurus",
    icon: Users,
    collapsible: false,
  },
];

export const ZAKATTYPES = [
  "Zakat Fitrah",
  "Zakat Mal",
  "Zakat Penghasilan",
  "Zakat Pertanian",
  "Zakat Perniagaan",
  "Zakat Hasil Ternak",
];
