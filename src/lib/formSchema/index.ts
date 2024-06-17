import { z } from "zod";

import { typeMasyarakat } from "@/types";

export const MuzakkiFormSchema = z.object({
  name: z.string({ required_error: "Nama harus diisi!" }),
  paymentDate: z.date({ required_error: "Tanggal bayar harus diisi!" }),
  amountMoney: z.coerce.number({ required_error: "Jumlah Uang harus diisi" }),
  amountRice: z.coerce.number({ required_error: "Jumlah Beras harus diisi" }),
  notes: z.string({ required_error: "Keterangan harus diisi!" }),
  pengurusName: z.string({ required_error: "Pengurus harus diisi!" }),
});

export const MustahikFormSchema = z.object({
  name: z.string({ required_error: "Nama harus diisi!" }),
  distributionDate: z.date({ required_error: "Tanggal terima harus diisi!" }),
  amountMoney: z.coerce.number({ required_error: "Jumlah Uang harus diisi" }),
  amountRice: z.coerce.number({ required_error: "Jumlah Beras harus diisi" }),
  notes: z.string({ required_error: "Keterangan harus diisi!" }),
  pengurusName: z.string({ required_error: "Pengurus harus diisi!" }),
});

export const InfaqFormSchema = z.object({
  name: z.string({ required_error: "Nama harus diisi!" }),
  date: z.date({ required_error: "Tanggal harus diisi!" }),
  amountMoney: z.coerce.number({ required_error: "Jumlah Uang harus diisi" }),
  notes: z.string({ required_error: "Keterangan harus diisi!" }),
  pengurusName: z.string({ required_error: "Pengurus harus diisi!" }),
});

export const MasyarakatFormSchema = z.object({
  name: z.string({ required_error: "Nama harus diisi!" }),
  type: z.enum([typeMasyarakat.MUSTAHIK, typeMasyarakat.MUZAKKI], {
    required_error: "Golongan masyarakat harus diisi!",
  }),
  PoB: z.string({ required_error: "Tempat lahir harus diisi!" }),
  DoB: z.date({ required_error: "Tanggal lahir harus diisi!" }),
  job: z.string({ required_error: "Pekerjaan harus diisi!" }),
  phone: z.string({ required_error: "Nomor Telepon harus diisi!" }),
  address: z.string({ required_error: "Alamat harus diisi!" }),
});

export const DataPengurusFormSchema = z.object({
  name: z.string({ required_error: "Nama harus diisi!" }),
  DoB: z.date({ required_error: "Tanggal lahir harus diisi!" }),
  position: z.string({ required_error: "Jabatan harus diisi!" }),
  address: z.string({ required_error: "Alamat harus diisi!" }),
});

export const LoginFormSchema = z.object({
  username: z.string({ required_error: "Username harus diisi!" }),
  password: z.string({ required_error: "Password harus diisi!" }),
});
