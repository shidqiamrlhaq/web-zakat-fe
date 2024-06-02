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
import { TCreateMuzakki } from "@/types";

export const DialogEditForm = ({ id }: { id: number }) => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof MuzakkiFormSchema>>({
    resolver: zodResolver(MuzakkiFormSchema),
  });

  const editMuzakki = async (values: TCreateMuzakki) => {
    const { data: response } = await axiosInstance.patch(
      `/muzakki/${id}`,
      values,
    );
    return response.data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: editMuzakki,
    onSuccess: () => {
      toast.success("Berhasil Mengedit Data Pembayaran Zakat");
      queryClient.invalidateQueries({ queryKey: ["muzakki"] });
    },
    onError: (err: any) => {
      toast.error("Gagal Mengedit Data Pembayaran Zakat", {
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
    <DialogContent className="sm:max-w-xl">
      <DialogHeader>
        <DialogTitle className="text-center">
          Edit Penerimaan Zakat Fitrah
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
          <FormInputField
            form={form}
            formName="name"
            label="Nama Muzakki*"
            placeholder="Masukkan Nama Muzakki"
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
            <Button type="submit" className="mt-2 w-full" disabled={isPending}>
              <Save size={18} className="mr-2" /> Simpan
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};
