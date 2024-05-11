import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { id } from "date-fns/locale";

import { TableActions } from "@/components/molecules";
import { TPengurus } from "@/types";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<TPengurus>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "DoB",
    header: "Tanggal Lahir",
    cell: ({ row }) => {
      return formatDate(row.getValue("DoB") as Date, "PPP", { locale: id });
    },
  },
  {
    accessorKey: "address",
    header: "Alamat",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const pengurus = row.original;

      return <TableActions id={pengurus.id!} keyUrl="data-pengurus" />;
    },
  },
];
