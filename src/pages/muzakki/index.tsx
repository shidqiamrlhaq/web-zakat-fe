import { useQuery } from "@tanstack/react-query";

import { DataTable } from "@/components/organisms";
import { columns, FormDialog } from "@/components/private/muzakki";
import { Spinner } from "@/components/ui/spinner";
import { axiosInstance } from "@/lib/api";

export default function ZakatMuzakkiPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["muzakki"],
    queryFn: async () => {
      const { data: response } = await axiosInstance.get("/muzakki");
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
