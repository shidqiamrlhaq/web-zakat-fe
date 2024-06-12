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
import { MuzakkiFormSchema } from "@/lib/formSchema";
import { TCreateMuzakki, typeMasyarakat } from "@/types";

export const FormDialog = () => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof MuzakkiFormSchema>>({
    resolver: zodResolver(MuzakkiFormSchema),
  });

  const addMuzakki = async (values: TCreateMuzakki) => {
    const { data: response } = await axiosInstance.post("/muzakki", values);
    return response.data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: addMuzakki,
    onSuccess: () => {
      toast.success("Berhasil Menambahkan Data Pembayaran Zakat");
      queryClient.invalidateQueries({ queryKey: ["muzakki"] });
    },
    onError: (err: any) => {
      toast.error("Gagal Menambahkan Data Pembayaran Zakat", {
        description: err.response.data.message,
      });
    },
  });

  function onSubmit(values: z.infer<typeof MuzakkiFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const newMuzakki = {
      ...values,
    };

    mutate(newMuzakki);
  }

  const { data: dataMasyarakat } = useQuery({
    queryKey: ["masyarakat"],
    queryFn: async () => {
      const { data: response } = await axiosInstance.get("/masyarakat");
      return response.data;
    },
    // initialData: () => queryClient.getQueryData(["data-pengurus"]),
  });

  const { data: dataPengurus } = useQuery({
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
        <h2 className="font-semibold lg:text-2xl">Penerimaan Zakat Fitrah</h2>
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
            Tambah Penerimaan Zakat Fitrah
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
              formName="paymentDate"
              label="Tanggal Penerimaan*"
            />
            <FormSelectField
              form={form}
              formName="name"
              label="Nama Muzakki*"
              placeholder="Pilih Nama Muzakki"
              options={
                !dataMasyarakat
                  ? []
                  : dataMasyarakat
                      .filter(
                        (item: { type: string }) =>
                          item.type === typeMasyarakat.MUZAKKI,
                      )
                      .map((item: { name: string }) => item.name)
              }
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
              formName="amountRice"
              label="Jumlah Beras (Kg)*"
              placeholder="Masukkan Jumlah Beras"
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
