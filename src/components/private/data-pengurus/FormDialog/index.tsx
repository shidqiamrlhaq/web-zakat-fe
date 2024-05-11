import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlusIcon, Save } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { FormCalendarField, FormInputField } from "@/components/molecules";
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
import { DataPengurusFormSchema } from "@/lib/formSchema";
import { TCreatePengurus } from "@/types";

export const FormDialog = () => {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof DataPengurusFormSchema>>({
    resolver: zodResolver(DataPengurusFormSchema),
  });

  const addPengurus = async (values: TCreatePengurus) => {
    const { data: response } = await axiosInstance.post(
      "/data-pengurus",
      values,
    );
    return response.data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: addPengurus,
    onSuccess: () => {
      toast.success("Berhasil Menambahkan Data Pengurus");
      queryClient.invalidateQueries({ queryKey: ["data-pengurus"] });
    },
    onError: (err: any) => {
      toast.error("Gagal Menambahkan Data Pengurus", {
        description: err.response.data.message,
      });
    },
  });

  function onSubmit(values: z.infer<typeof DataPengurusFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const newPengurus = {
      ...values,
    };

    mutate(newPengurus);
  }

  return (
    <Dialog>
      <div className="flex w-full items-center justify-between border-b p-4">
        <h2 className="font-semibold lg:text-2xl">Data Pengurus</h2>
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
            Tambah Data Pengurus
          </DialogTitle>
          <DialogDescription>* Harus Diisi</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-h-96 w-full space-y-2 overflow-auto px-2"
          >
            <FormInputField
              form={form}
              formName="name"
              label="Nama*"
              placeholder="Masukkan Nama Pengurus"
            />
            <FormCalendarField
              form={form}
              formName="DoB"
              label="Tanggal Lahir*"
            />
            <FormInputField
              form={form}
              formName="address"
              label="Alamat"
              placeholder="Masukkan Alamat"
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
