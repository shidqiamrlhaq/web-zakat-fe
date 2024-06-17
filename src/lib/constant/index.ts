import {
  Dot,
  HandCoins,
  HeartHandshake,
  Home,
  NotebookText,
  Users,
  UsersRound,
} from "lucide-react";

import { jabatanPengurus, jobType } from "@/types";

export const navItems = [
  { name: "Beranda", href: "/", icon: Home, collapsible: false },
  {
    name: "Transaksi Zakat",
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
    name: "Data Muzakki & Mustahik",
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

export const jobs: jobType[] = [
  jobType.PNS,
  jobType.WIRASWASTA,
  jobType.APARAT,
  jobType.SWASTA,
  jobType.BURUH,
  jobType.PELAJAR,
  jobType.GURU,
  jobType.PENGANGGURAN,
  jobType.LAINNYA,
];

export const jabatan: jabatanPengurus[] = [
  jabatanPengurus.KETUA,
  jabatanPengurus.ANGGOTA,
  jabatanPengurus.BENDAHARA,
  jabatanPengurus.SEKRETARIS,
  jabatanPengurus.UPZ,
];
