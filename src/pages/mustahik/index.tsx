import { zodResolver } from "@hookform/resolvers/zod";
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
import { ZAKATTYPES } from "@/lib/constant";
import { MustahikFormSchema } from "@/lib/formSchema";

export default function ZakatMuzakkiPage() {
  const form = useForm<z.infer<typeof MustahikFormSchema>>({
    resolver: zodResolver(MustahikFormSchema),
  });

  function onSubmit(values: z.infer<typeof MustahikFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    toast.success("Berhasil Menambahkan Data Mustahik!");
  }

  return (
    <div>
      <Dialog>
        <div className="flex w-full items-center justify-between border-b p-4">
          <h2 className="font-semibold lg:text-2xl">Data Mustahik</h2>
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
              Tambah Data Mustahik
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
                placeholder="Masukkan Nama Mustahik"
              />
              <FormCalendarField
                form={form}
                formName="dateReceived"
                label="Tanggal Terima*"
              />
              <FormSelectField
                form={form}
                formName="zakatType"
                label="Jenis Zakat*"
                placeholder="Masukkan Jenis Zakat"
                options={ZAKATTYPES}
              />
              <FormInputField
                form={form}
                formName="amount"
                label="Jumlah (Rp/Kg/Liter)*"
                placeholder="Masukkan Jumlah Zakat"
              />
              <FormInputField
                form={form}
                formName="address"
                label="Alamat"
                placeholder="Masukkan Alamat"
              />
              <DialogFooter>
                <Button type="submit" className="mt-2 w-full">
                  <Save size={18} className="mr-2" /> Simpan
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
