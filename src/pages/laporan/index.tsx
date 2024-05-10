import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, Save } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { FormInputField } from "@/components/molecules";
import { Form } from "@/components/ui/form";
import { MuzakkiFormSchema } from "@/lib/formSchema";

export default function LaporanPage() {
  const form = useForm<z.infer<typeof MuzakkiFormSchema>>({
    resolver: zodResolver(MuzakkiFormSchema),
  });

  function onSubmit(values: z.infer<typeof MuzakkiFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    toast.success("Berhasil Menambahkan Data Muzakki!");
  }

  return (
    <div>
      <h1>Laporan Keuangan</h1>
      <div>
        <Form {...form}>
          <form className="grid grid-cols-2 gap-4">
            <FormInputField
              form={form}
              formName={"name"}
              placeholder={"Name"}
              label={"Name"}
            />
            <FormInputField
              form={form}
              formName={"name"}
              placeholder={"Name"}
              label={"Name"}
            />
            <FormInputField
              form={form}
              formName={"name"}
              placeholder={"Name"}
              label={"Name"}
            />
            <FormInputField
              form={form}
              formName={"name"}
              placeholder={"Name"}
              label={"Name"}
            />
          </form>
        </Form>
      </div>
    </div>
  );
}
