import { BadgeDollarSign, ShoppingBag, Users } from "lucide-react";

import { LinkCard, SelectYear } from "@/components/molecules";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchByYear } from "@/hooks";

export default function HomePage() {
  const {
    data,
    isLoading,
    isRefetching,
    isError,
    error,
    selectedYear,
    handleYearChange,
  } = useFetchByYear("laporan");

  const cardItems = [
    {
      title: "Data Muzakki & Mustahik",
      description: "Total",
      icon: <Users size={26} />,
      totalPeople: data?.totalMasyarakat,
    },
    {
      title: "Data Pengurus",
      description: "Total",
      icon: <Users size={26} />,
      totalPeople: data?.totalPengurus,
    },
    {
      title: "Jumlah Muzakki",
      description: `Tahun ${selectedYear.toString()}`,
      icon: <Users size={26} />,
      totalPeople: data?.penerimaan.muzakki.total,
    },
    {
      title: "Jumlah Mustahik",
      description: `Tahun ${selectedYear.toString()}`,
      icon: <Users size={26} />,
      totalPeople: data?.penyaluran.mustahik.total,
    },
    {
      title: "Jumlah Munfiq",
      description: `Tahun ${selectedYear.toString()}`,
      icon: <Users size={26} />,
      totalPeople: data?.penerimaan.munfiq.total,
    },
    {
      title: "Total Uang",
      description: `Tahun ${selectedYear.toString()}`,
      icon: <BadgeDollarSign size={26} />,
      totalMoney: data?.totalSaldoUang,
    },
    {
      title: "Total Beras",
      description: `Tahun ${selectedYear.toString()}`,
      icon: <ShoppingBag size={26} />,
      totalRice: data?.totalSaldoBeras,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <SelectYear
        selectedYear={selectedYear.toString()}
        handleYearChange={handleYearChange}
      />
      {isError && (
        <div className="w-full text-center text-red-500">
          {(error as any).message}
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {isLoading || isRefetching
          ? Array.from({ length: 7 }).map((_, index) => (
              <Skeleton key={index} className="h-32 w-full" />
            ))
          : cardItems.map((item) => (
              <LinkCard
                key={item.title}
                title={item.title}
                description={item.description}
                icon={item.icon}
                totalPeople={item.totalPeople}
                totalMoney={item.totalMoney}
                totalRice={item.totalRice}
              />
            ))}
      </div>
    </div>
  );
}
