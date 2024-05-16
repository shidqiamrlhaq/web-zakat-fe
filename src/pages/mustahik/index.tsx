import { useQuery } from "@tanstack/react-query";

import { DataTable } from "@/components/organisms";
import { columns, FormDialog } from "@/components/private/mustahik";
import { Spinner } from "@/components/ui/spinner";
import { axiosInstance } from "@/lib/api";

export default function ZakatMuzakkiPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["mustahik"],
    queryFn: async () => {
      const { data: response } = await axiosInstance.get("/mustahik");
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
      {data && <DataTable columns={columns} data={data.mustahik} />}
    </div>
  );
}
