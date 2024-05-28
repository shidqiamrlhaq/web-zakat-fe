import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { FormInputField } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { axiosInstance } from "@/lib/api";
import { LoginFormSchema } from "@/lib/formSchema";
import { TLogin } from "@/types";

export default function LoginPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
  });

  const handleLogin = async (values: TLogin) => {
    const { data: response } = await axiosInstance.post("/login", values);

    return response.data;
  };

  const { mutate, isPending, error } = useMutation({
    mutationFn: handleLogin,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      toast.success("Login Berhasil");
      router.push("/");
    },
    onError: (err: any) => {
      toast.error("Login Gagal", {
        description: err.response.data.message,
      });
    },
  });

  function onSubmit(values: z.infer<typeof LoginFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const login = {
      ...values,
    };

    mutate(login);
  }

  return (
    <div>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center font-bold capitalize">
          <CardTitle className="text-2xl">
            Sistem Pengelolaan Zakat Fitrah
          </CardTitle>
          <CardTitle className="text-2xl">
            Masjid Al-Hidayah Narongtong
          </CardTitle>
          <CardTitle className="text-2xl">Jatinangor, Sumedang</CardTitle>
          <CardDescription className="font-normal">
            Masukkan username dan password anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
              <FormInputField
                form={form}
                formName="username"
                label="Username"
                placeholder="username"
              />
              <FormInputField
                form={form}
                formName="password"
                label="Password"
                placeholder="********"
                type="password"
              />
              {error && (
                <p className="text-sm text-red-500">
                  {error.response.data.message}
                </p>
              )}
              <Button className="w-full" disabled={isPending}>
                Masuk
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
