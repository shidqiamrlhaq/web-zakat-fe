import { useQuery } from "@tanstack/react-query";
import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { axiosInstance } from "@/lib/api";
import { formatToRupiah } from "@/lib/utils";

export default function LaporanPage() {
  const { data: dataPengurus } = useQuery({
    queryKey: ["data-pengurus"],
    queryFn: async () => {
      const { data: response } = await axiosInstance.get("/data-pengurus");
      return response.data;
    },
  });
  const { data: dataMuzakki } = useQuery({
    queryKey: ["muzakki"],
    queryFn: async () => {
      const { data: response } = await axiosInstance.get("/muzakki");
      return response.data;
    },
  });
  const { data: dataMustahik } = useQuery({
    queryKey: ["mustahik"],
    queryFn: async () => {
      const { data: response } = await axiosInstance.get("/mustahik");
      return response.data;
    },
  });
  const { data: dataInfaq } = useQuery({
    queryKey: ["infaq"],
    queryFn: async () => {
      const { data: response } = await axiosInstance.get("/infaq");
      return response.data;
    },
  });

  const getYearsBefore = () => {
    const currentYear = new Date().getFullYear();
    const years: number[] = [];
    const fromYear = 2020;

    for (let i = currentYear; i >= fromYear; i--) {
      years.push(i);
    }

    return years;
  };

  const totalPengurus = dataPengurus?.length;

  const totalMoneyMuzakki = dataMuzakki?.totalMoney?._sum?.amountMoney;
  const muzakkiByMoney = dataMuzakki?.totalMoney?._count?.amountMoney;
  const totalRiceMuzakki = dataMuzakki?.totalRice?._sum?.amountRice;
  const muzakkiByRice = dataMuzakki?.totalRice?._count?.amountRice;
  const totalMuzakki = muzakkiByMoney + muzakkiByRice;
  const MONEYFORAMIL = totalMoneyMuzakki * 0.05; // pengurus dapat 5% dari total penerimaan zakat
  const formatRice = totalRiceMuzakki * 0.05; // pengurus dapat 5% dari total penerimaan zakat
  const RICEFORAMIL = Math.floor(formatRice * 100) / 100; // pengurus dapat 5% dari total penerimaan zakat

  const totalMoneyMustahik = dataMustahik?.totalMoney?._sum?.amountMoney;
  const mustahikByMoney = dataMustahik?.totalMoney?._count?.amountMoney;
  const totalRiceMustahik = dataMustahik?.totalRice?._sum?.amountRice;
  const mustahikByRice = dataMustahik?.totalRice?._count?.amountRice;
  const totalMustahik = mustahikByMoney + mustahikByRice;

  const totalMoneyInfaq = dataInfaq?.totalMoney?._sum?.amountMoney;
  const infaqByMoney = dataInfaq?.totalMoney?._count?.amountMoney;
  const totalRiceInfaq = dataInfaq?.totalRice?._sum?.amountRice;
  const infaqByRice = dataInfaq?.totalRice?._count?.amountRice;
  const totalMunfiq = infaqByMoney + infaqByRice;

  const totalPenerimaanMoney = totalMoneyMuzakki + totalMoneyInfaq;
  const totalPenerimaanRice = totalRiceMuzakki + totalRiceInfaq;
  const totalDonatur = totalMuzakki + totalMunfiq;
  const totalPenyaluran = totalMustahik + totalPengurus;
  const totalPenyaluranMoney = MONEYFORAMIL + totalMoneyMustahik;
  const totalPenyaluranRice = RICEFORAMIL + totalRiceMustahik;

  const saldoMoney = totalPenerimaanMoney - totalPenyaluranMoney;
  const saldoRice = totalPenerimaanRice - totalPenyaluranRice;

  return (
    <div className="flex w-full flex-col gap-y-2">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Pilih tahun" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Tahun</SelectLabel>
            <SelectItem value="all">Semua</SelectItem>
            {getYearsBefore().map((year) => (
              <SelectItem key={year} value={String(year)}>
                {year}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Table className="w-full uppercase">
        <TableCaption>Tabel Penerimaan Zakat</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10 text-center">No.</TableHead>
            <TableHead className="text-center" colSpan={2}>
              Keterangan
            </TableHead>
            <TableHead className="text-center" colSpan={3}>
              Jumlah
            </TableHead>
          </TableRow>
        </TableHeader>
        {/* Penerimaan Zakat */}
        <TableBody>
          <TableRow className="font-bold">
            <TableCell className="text-center">A</TableCell>
            <TableCell>Penerimaan Zakat</TableCell>
            <TableCell>Muzakki</TableCell>
            <TableCell>Uang</TableCell>
            <TableCell>Beras</TableCell>
          </TableRow>
          <TableRow className="">
            <TableCell className="text-center">1</TableCell>
            <TableCell>Uang</TableCell>
            <TableCell>{muzakkiByMoney}</TableCell>
            <TableCell className="capitalize">
              {formatToRupiah(totalMoneyMuzakki)}
            </TableCell>
            <TableCell className="capitalize"></TableCell>
          </TableRow>
          <TableRow className="">
            <TableCell className="text-center">2</TableCell>
            <TableCell>Beras</TableCell>
            <TableCell>{muzakkiByRice}</TableCell>
            <TableCell className="capitalize"></TableCell>
            <TableCell className="capitalize">{totalRiceMuzakki} Kg</TableCell>
          </TableRow>
        </TableBody>
        {/* Penerimaan Infaq */}
        <TableBody>
          <TableRow className="font-bold">
            <TableCell className="text-center">B</TableCell>
            <TableCell>Penerimaan Infaq</TableCell>
            <TableCell>Munfiq</TableCell>
            <TableCell>Uang</TableCell>
            <TableCell>Beras</TableCell>
          </TableRow>
          <TableRow className="">
            <TableCell className="text-center">1</TableCell>
            <TableCell>Uang</TableCell>
            <TableCell>{infaqByMoney}</TableCell>
            <TableCell className="capitalize">
              {formatToRupiah(totalMoneyInfaq)}
            </TableCell>
            <TableCell className="capitalize"></TableCell>
          </TableRow>
          <TableRow className="">
            <TableCell className="text-center">2</TableCell>
            <TableCell>Beras</TableCell>
            <TableCell>{infaqByRice}</TableCell>
            <TableCell className="capitalize"></TableCell>
            <TableCell className="capitalize">
              {totalRiceInfaq ? totalRiceInfaq : 0} Kg
            </TableCell>
          </TableRow>
        </TableBody>
        {/* Total Penerimaan */}
        <TableBody className="border-t bg-muted/50 [&>tr]:last:border-b-0">
          <TableRow className="font-bold">
            <TableCell colSpan={2}>Total Penerimaan</TableCell>
            <TableCell>{totalDonatur}</TableCell>
            <TableCell className="capitalize">
              {formatToRupiah(totalPenerimaanMoney)}
            </TableCell>
            <TableCell className="capitalize">{totalPenerimaanRice} Kg</TableCell>
          </TableRow>
        </TableBody>
        <div className="mb-5" />
        {/* Tabel Penyaluran */}
        <TableBody>
          <TableRow className="font-bold">
            <TableCell className="text-center">C</TableCell>
            <TableCell>Penyaluran</TableCell>
            <TableCell>Mustahik</TableCell>
            <TableCell>Uang</TableCell>
            <TableCell>Beras</TableCell>
          </TableRow>
          <TableRow className="">
            <TableCell className="text-center">1</TableCell>
            <TableCell>Fakir Miskin & Fisabilillah</TableCell>
            <TableCell>{totalMustahik}</TableCell>
            <TableCell className="capitalize">
              {formatToRupiah(totalMoneyMustahik)}
            </TableCell>
            <TableCell className="capitalize">{mustahikByRice} Kg</TableCell>
          </TableRow>
          <TableRow className="">
            <TableCell className="text-center">2</TableCell>
            <TableCell>Amil</TableCell>
            <TableCell>{totalPengurus}</TableCell>
            <TableCell className="capitalize">
              {formatToRupiah(MONEYFORAMIL)}
            </TableCell>
            <TableCell className="capitalize">
              {RICEFORAMIL ? RICEFORAMIL : 0} Kg
            </TableCell>
          </TableRow>
        </TableBody>
        {/* Total Penyaluran */}
        <TableBody className="border-t bg-muted/50 [&>tr]:last:border-b-0">
          <TableRow className="font-bold">
            <TableCell colSpan={2}>Total Penyaluran</TableCell>
            <TableCell>{totalPenyaluran}</TableCell>
            <TableCell className="capitalize">
              {formatToRupiah(totalPenyaluranMoney)}
            </TableCell>
            <TableCell className="capitalize">
              {totalPenyaluranRice} Kg
            </TableCell>
          </TableRow>
        </TableBody>
        <div className="mb-5" />
        <TableBody className="border-t bg-muted/50 [&>tr]:last:border-b-0">
          <TableRow className="font-bold">
            <TableCell colSpan={2}>Total Saldo</TableCell>
            <TableCell></TableCell>
            <TableCell className="capitalize">
              {formatToRupiah(saldoMoney)}
            </TableCell>
            <TableCell className="capitalize">{saldoRice} Kg</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
