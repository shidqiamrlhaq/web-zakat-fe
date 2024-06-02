import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { id } from "date-fns/locale";

import { TableActions } from "@/components/molecules";
import { TInfaq } from "@/types";

import { DialogEditForm } from "../DialogEditForm";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<TInfaq>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "date",
    header: "Tanggal Penerimaan",
    cell: ({ row }) => {
      return formatDate(row.getValue("date") as Date, "PPP", {
        locale: id,
      });
    },
  },
  {
    accessorKey: "name",
    header: "Nama Munfiq",
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
    accessorKey: "notes",
    header: "Keterangan",
    cell: ({ row }) => {
      return row.getValue("notes") || "-";
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const pengurus = row.original;

      return (
        <TableActions id={pengurus.id!} keyUrl="infaq">
          <DialogEditForm id={pengurus.id!} />
        </TableActions>
      );
    },
  },
];
