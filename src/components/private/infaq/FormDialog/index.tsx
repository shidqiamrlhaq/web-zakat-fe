import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PlusIcon, Save } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  FormCalendarField,
  FormInputField,
  FormSelectField,
} from "@/components/molecules";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { axiosInstance } from "@/lib/api";
import { InfaqFormSchema } from "@/lib/formSchema";
import { TCreateInfaq } from "@/types";

export const FormDialog = () => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof InfaqFormSchema>>({
    resolver: zodResolver(InfaqFormSchema),
  });

  const addInfaq = async (values: TCreateInfaq) => {
    const { data: response } = await axiosInstance.post("/infaq", values);
    return response.data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: addInfaq,
    onSuccess: () => {
      toast.success("Berhasil Menambahkan Data Infaq");
      queryClient.invalidateQueries({ queryKey: ["infaq"] });
    },
    onError: (err: any) => {
      toast.error("Gagal Menambahkan Data Infaq", {
        description: err.response.data.message,
      });
    },
  });

  function onSubmit(values: z.infer<typeof InfaqFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const newInfaq = {
      ...values,
    };

    mutate(newInfaq);
  }

  const {
    data: dataPengurus,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["data-pengurus"],
    queryFn: async () => {
      const { data: response } = await axiosInstance.get("/data-pengurus");
      return response.data;
    },
    // initialData: () => queryClient.getQueryData(["data-pengurus"]),
  });

  return (
    <Dialog>
      <div className="flex w-full items-center justify-between border-b p-4">
        <h2 className="font-semibold lg:text-2xl">Tambah Penerimaan Infaq</h2>
        <DialogTrigger asChild>
          <Button size={"sm"}>
            <PlusIcon size={18} />
            <span className="ml-2">Tambah</span>
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-center">
            Tambah Penerimaan Infaq
          </DialogTitle>
          <DialogDescription>* Harus Diisi</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-h-96 w-full space-y-2 overflow-auto px-2"
          >
            <FormCalendarField
              form={form}
              formName="date"
              label="Tanggal Penerimaan*"
            />
            <FormInputField
              form={form}
              formName="name"
              label="Nama Munfiq*"
              placeholder="Masukkan Nama Munfiq"
            />
            <FormSelectField
              form={form}
              formName="pengurusName"
              label="Nama Pengurus*"
              placeholder="Pilih Nama Pengurus"
              options={
                !dataPengurus
                  ? []
                  : dataPengurus.map((item: { name: string }) => item.name)
              }
            />
            <FormInputField
              form={form}
              formName="amountMoney"
              label="Jumlah Uang (Rp)*"
              placeholder="Masukkan Jumlah Uang"
              type="number"
            />
            <FormInputField
              form={form}
              formName="notes"
              label="Keterangan"
              placeholder="Masukkan Keterangan"
            />
            <DialogFooter>
              <Button
                type="submit"
                className="mt-2 w-full"
                disabled={isPending}
              >
                <Save size={18} className="mr-2" /> Simpan
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
