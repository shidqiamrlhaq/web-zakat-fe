import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Save } from "lucide-react";
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
import { MasyarakatFormSchema } from "@/lib/formSchema";
import { TCreateMasyarakat, typeMasyarakat } from "@/types";

export const DialogEditForm = ({ id }: { id: number }) => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof MasyarakatFormSchema>>({
    resolver: zodResolver(MasyarakatFormSchema),
  });

  const editMasyarakat = async (values: TCreateMasyarakat) => {
    const { data: response } = await axiosInstance.patch(
      `/masyarakat/${id}`,
      values,
    );
    return response.data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: editMasyarakat,
    onSuccess: () => {
      toast.success("Berhasil Mengedit Data Masyarakat");
      queryClient.invalidateQueries({ queryKey: ["masyarakat"] });
    },
    onError: (err: any) => {
      toast.error("Gagal Mengedit Data Masyarakat", {
        description: err.response.data.message,
      });
    },
  });

  function onSubmit(values: z.infer<typeof MasyarakatFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const newMasyarakat = {
      ...values,
    };

    mutate(newMasyarakat);
  }

  return (
    <DialogContent className="sm:max-w-xl">
      <DialogHeader>
        <DialogTitle className="text-center">Data Masyarakat</DialogTitle>
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
            placeholder="Masukkan Nama Lengkap"
          />
          <FormSelectField
            form={form}
            formName="type"
            label="Golongan Masyarakat*"
            placeholder="Pilih Golongan Masyarakat"
            options={[typeMasyarakat.MUZAKKI, typeMasyarakat.MUSTAHIK]}
          />
          <FormInputField
            form={form}
            formName="PoB"
            label="Tempat Lahir"
            placeholder="Masukkan Tempat Lahir"
          />
          <FormCalendarField form={form} formName="DoB" label="Tanggal Lahir" />
          <FormInputField
            form={form}
            formName="job"
            label="Pekerjaan"
            placeholder="Masukkan Pekerjaan"
          />
          <FormInputField
            form={form}
            formName="phone"
            label="Nomor Telepon"
            placeholder="Masukkan Nomor Telepon"
          />
          <FormInputField
            form={form}
            formName="address"
            label="Alamat"
            placeholder="Masukkan Alamat"
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
