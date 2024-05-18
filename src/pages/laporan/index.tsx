import { useQuery } from "@tanstack/react-query";
import { Printer } from "lucide-react";
import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { axiosInstance } from "@/lib/api";
import { formatToRupiah } from "@/lib/utils";

export default function LaporanPage() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const { data, isLoading, isRefetching, isError, error } = useQuery({
    queryKey: ["laporan", selectedYear],
    queryFn: async () => {
      const { data: response } = await axiosInstance.get("/laporan", {
        params: {
          year: selectedYear,
        },
      });

      return response.data;
    },
  });

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current as any,
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

  const handleYearChange = (e: any) => {
    setSelectedYear(e);
  };

  if (isLoading) return <Spinner />;
  if (isRefetching) return <Spinner />;

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex w-full justify-between">
        <Select
          value={selectedYear.toString()}
          onValueChange={handleYearChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Pilih tahun" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tahun</SelectLabel>
              {getYearsBefore().map((year) => (
                <SelectItem key={year} value={String(year)}>
                  {year}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button onClick={handlePrint}>
          <Printer className="mr-2 h-5 w-5" />
          Cetak
        </Button>
      </div>
      <div className="flex flex-col gap-y-8" ref={componentRef as any}>
        <div className="mt-4 w-full text-center text-sm font-bold uppercase sm:text-base lg:text-xl">
          <h3>Laporan Zakat Fitrah</h3>
          <p>Masjid Jamie Al-Hidayah Narongtong</p>
          <p>Jatinangor, Sumedang</p>
          <p>Tahun {selectedYear}</p>
        </div>
        {isError && (
          <div className="w-full text-center text-red-500">
            {(error as any).message}
          </div>
        )}
        {data && (
          <Table className="w-full uppercase">
            <TableHeader className="border bg-muted/50 [&>tr]:last:border-b-0">
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
                <TableCell>{data.penerimaan.muzakki.uang.pembayar}</TableCell>
                <TableCell className="capitalize">
                  {formatToRupiah(data.penerimaan.muzakki.uang.total)}
                </TableCell>
                <TableCell className="capitalize"></TableCell>
              </TableRow>
              <TableRow className="">
                <TableCell className="text-center">2</TableCell>
                <TableCell>Beras</TableCell>
                <TableCell>{data.penerimaan.muzakki.beras.pembayar}</TableCell>
                <TableCell className="capitalize"></TableCell>
                <TableCell className="capitalize">
                  {data.penerimaan.muzakki.beras.total} Kg
                </TableCell>
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
                <TableCell>{data.penerimaan.munfiq.total}</TableCell>
                <TableCell className="capitalize">
                  {formatToRupiah(data.penerimaan.munfiq.uang.total)}
                </TableCell>
                <TableCell className="capitalize"></TableCell>
              </TableRow>
            </TableBody>
            {/* Total Penerimaan */}
            <TableBody className="border-t bg-muted/50 [&>tr]:last:border-b-0">
              <TableRow className="font-bold">
                <TableCell colSpan={2}>Total Penerimaan</TableCell>
                <TableCell>{data.penerimaan.total.pembayar}</TableCell>
                <TableCell className="capitalize">
                  {formatToRupiah(data.penerimaan.total.uang)}
                </TableCell>
                <TableCell className="capitalize">
                  {data.penerimaan.total.beras} Kg
                </TableCell>
              </TableRow>
            </TableBody>
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
                <TableCell>{data.penyaluran.mustahik.total}</TableCell>
                <TableCell className="capitalize">
                  {formatToRupiah(data.penyaluran.mustahik.uang.total)}
                </TableCell>
                <TableCell className="capitalize">
                  {data.penyaluran.mustahik.beras.total} Kg
                </TableCell>
              </TableRow>
              <TableRow className="">
                <TableCell className="text-center">2</TableCell>
                <TableCell>Amil</TableCell>
                <TableCell>{data.penyaluran.pengurus.total}</TableCell>
                <TableCell className="capitalize">
                  {formatToRupiah(data.penyaluran.pengurus.uang.total)}
                </TableCell>
                <TableCell className="capitalize">
                  {data.penyaluran.pengurus.beras.total} Kg
                </TableCell>
              </TableRow>
            </TableBody>
            {/* Total Penyaluran */}
            <TableBody className="border-t bg-muted/50 [&>tr]:last:border-b-0">
              <TableRow className="font-bold">
                <TableCell colSpan={2}>Total Penyaluran</TableCell>
                <TableCell>{data.penyaluran.total.penerima}</TableCell>
                <TableCell className="capitalize">
                  {formatToRupiah(data.penyaluran.total.uang)}
                </TableCell>
                <TableCell className="capitalize">
                  {data.penyaluran.total.beras} Kg
                </TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow className="font-bold">
                <TableCell colSpan={2}>Total Saldo</TableCell>
                <TableCell></TableCell>
                <TableCell className="capitalize">
                  {formatToRupiah(data.totalSaldoUang)}
                </TableCell>
                <TableCell className="capitalize">
                  {data.totalSaldoBeras} Kg
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </div>
    </div>
  );
}
