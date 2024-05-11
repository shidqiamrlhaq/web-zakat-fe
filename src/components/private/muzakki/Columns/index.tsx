import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { id } from "date-fns/locale";

import { TableActions } from "@/components/molecules";
import { TMuzakki } from "@/types";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<TMuzakki>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "paymentDate",
    header: "Tanggal Pembayaran",
    cell: ({ row }) => {
      return formatDate(row.getValue("paymentDate") as Date, "PPP", {
        locale: id,
      });
    },
  },
  {
    accessorKey: "muzakkiName",
    header: "Nama Muzakki",
  },
  {
    accessorKey: "pengurusName",
    header: "Nama Pengurus",
  },
  {
    accessorKey: "amountMoney",
    header: "Jumlah Uang (Rp)",
  },
  {
    accessorKey: "amountRice",
    header: "Jumlah Beras (Kg)",
  },
  {
    accessorKey: "notes",
    header: "Keterangan",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const pengurus = row.original;

      return <TableActions id={pengurus.id!} keyUrl="muzakki" />;
    },
  },
];