import {
  Dot,
  HandCoins,
  HeartHandshake,
  Home,
  NotebookText,
  Users,
  UsersRound,
} from "lucide-react";

export const navItems = [
  { name: "Beranda", href: "/", icon: Home, collapsible: false },
  {
    name: "Zakat",
    icon: HandCoins,
    collapsible: true,
    subItems: [
      {
        subName: "Pembayar (Muzakki)",
        subHref: "/muzakki",
        subIcon: Dot,
      },
      {
        subName: "Penerima (Mustahik)",
        subHref: "/mustahik",
        subIcon: Dot,
      },
    ],
  },
  { name: "Infaq", href: "/infaq", icon: HeartHandshake, collapsible: false },
  {
    name: "Data Masyarakat",
    href: "/masyarakat",
    icon: Users,
    collapsible: false,
  },
  {
    name: "Data Pengurus",
    href: "/data-pengurus",
    icon: UsersRound,
    collapsible: false,
  },
  { name: "Laporan", href: "/laporan", icon: NotebookText, collapsible: false },
];

export const ZAKATTYPES = [
  "Zakat Fitrah",
  "Zakat Mal",
  "Zakat Penghasilan",
  "Zakat Pertanian",
  "Zakat Perniagaan",
  "Zakat Hasil Ternak",
];
