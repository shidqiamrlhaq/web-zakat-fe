import { SelectYear } from "@/components/molecules";
import { DataTable } from "@/components/organisms";
import { columns, FormDialog } from "@/components/private/mustahik";
import { Spinner } from "@/components/ui/spinner";
import { useFetchByYear } from "@/hooks";

export default function ZakatMustahikPage() {
  const {
    data,
    isLoading,
    isRefetching,
    isError,
    error,
    selectedYear,
    handleYearChange,
  } = useFetchByYear("/mustahik");

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
      {data && <DataTable columns={columns} data={data.mustahik} />}
    </div>
  );
}
