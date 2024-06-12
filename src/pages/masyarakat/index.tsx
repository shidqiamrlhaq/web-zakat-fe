import { useQuery } from "@tanstack/react-query";
import React from "react";

import { DataTable } from "@/components/organisms";
import { columns, FormDialog } from "@/components/private/masyarakat";
import { Spinner } from "@/components/ui/spinner";
import { axiosInstance } from "@/lib/api";

export default function MasyarakatPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["masyarakat"],
    queryFn: async () => {
      const { data: response } = await axiosInstance.get("/masyarakat");
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
      {data && <DataTable columns={columns} data={data} sort />}
    </div>
  );
}
