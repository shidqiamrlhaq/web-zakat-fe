import { zodResolver } from "@hookform/resolvers/zod";
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
import { DataPengurusFormSchema } from "@/lib/formSchema";

export default function DataPengurusPage() {
  const form = useForm<z.infer<typeof DataPengurusFormSchema>>({
    resolver: zodResolver(DataPengurusFormSchema),
  });

  function onSubmit(values: z.infer<typeof DataPengurusFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    toast.success("Berhasil Menambahkan Data Pengurus!");
  }

  return (
    <div>
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
