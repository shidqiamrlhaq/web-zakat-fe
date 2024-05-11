import { useQuery } from "@tanstack/react-query";
import React from "react";

import { Spinner } from "@/components/ui/spinner";
import { TableCell, TableRow } from "@/components/ui/table";
import { axiosInstance } from "@/lib/api";

import { columns } from "./_components/Columns";
import { DataTable } from "./_components/DataTable";
import { FormDialog } from "./_components/FormDialog";

export default function DataPengurusPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["data-pengurus"],
    queryFn: async () => {
      const { data: response } = await axiosInstance.get("/data-pengurus");
      return response.data;
    },
  });

  return (
    <div className="flex w-full flex-col gap-y-2">
      <FormDialog />
      {isLoading && <Spinner />}
      {isError && (
        <div className="w-full">
          <p>Tidak ada data</p>
        </div>
      )}
      {data && <DataTable columns={columns} data={data} />}
    </div>
  );
}
