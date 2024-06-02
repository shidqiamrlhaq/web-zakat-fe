import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { id } from "date-fns/locale";

import { TableActions } from "@/components/molecules";
import { TMasyarakat } from "@/types";

import { DialogEditForm } from "../DialogEditForm";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<TMasyarakat>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "type",
    header: "Golongan",
  },
  {
    accessorKey: "PoB",
    header: "Tempat Lahir",
    cell: ({ row }) => {
      return row.getValue("PoB") || "-";
    },
  },
  {
    accessorKey: "DoB",
    header: "Tanggal Lahir",
    cell: ({ row }) => {
      if (!row.getValue("DoB")) return "-";
      return formatDate(row.getValue("DoB") as Date, "PPP", {
        locale: id,
      });
    },
  },
  {
    accessorKey: "job",
    header: "Pekerjaan",
    cell: ({ row }) => {
      return row.getValue("job") || "-";
    },
  },
  {
    accessorKey: "phone",
    header: "No. Telepon",
    cell: ({ row }) => {
      return row.getValue("phone") || "-";
    },
  },
  {
    accessorKey: "address",
    header: "Alamat",
    cell: ({ row }) => {
      return row.getValue("address") || "-";
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const pengurus = row.original;

      return (
        <TableActions id={pengurus.id!} keyUrl="masyarakat">
          <DialogEditForm id={pengurus.id!} />
        </TableActions>
      );
    },
  },
];
