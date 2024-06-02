import { SelectYear } from "@/components/molecules";
import { DataTable } from "@/components/organisms";
import { columns, FormDialog } from "@/components/private/muzakki";
import { Spinner } from "@/components/ui/spinner";
import { useFetchByYear } from "@/hooks";
import { formatToRupiah } from "@/lib/utils";

export default function ZakatMuzakkiPage() {
  const {
    data,
    isLoading,
    isRefetching,
    isError,
    error,
    selectedYear,
    handleYearChange,
  } = useFetchByYear("muzakki");

  return (
    <div className="flex w-full flex-col gap-y-2">
      <FormDialog />
      <SelectYear
        selectedYear={selectedYear.toString()}
        handleYearChange={handleYearChange}
      />
      {isLoading && <Spinner />}
      {isRefetching && <Spinner />}
      {isError && (
        <div className="w-full">
          <p>Tidak ada data</p>
        </div>
      )}
      {/* TODO: Buat Footer untuk total uang dan beras */}
      {data && (
        <div className="flex flex-col gap-y-2">
          <DataTable columns={columns} data={data.muzakki} />
          <div className="rounded-md border bg-muted/50 p-2 font-semibold">
            <p>
              Total Penerimaan Uang:{" "}
              {formatToRupiah(data.totalMoney._sum.amountMoney)}
            </p>
          </div>
          <div className="rounded-md border bg-muted/50 p-2 font-semibold">
            <p>Total Penerimaan Beras: {data.totalRice._sum.amountRice} Kg</p>
          </div>
        </div>
      )}
    </div>
  );
}
