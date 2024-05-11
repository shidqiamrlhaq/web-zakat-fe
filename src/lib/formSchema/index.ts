import { z } from "zod";

export const MuzakkiFormSchema = z.object({
  name: z.string({ required_error: "Nama harus diisi!" }),
  paymentDate: z.date({ required_error: "Tanggal bayar harus diisi!" }),
  amountMoney: z.coerce.number({ required_error: "Jumlah Uang harus diisi" }),
  amountRice: z.coerce.number({ required_error: "Jumlah Beras harus diisi" }),
  notes: z.string().optional(),
  pengurusName: z.string({ required_error: "Pengurus harus diisi!" }),
});

export const MustahikFormSchema = z.object({
  name: z.string({ required_error: "Nama harus diisi!" }),
  distributionDate: z.date({ required_error: "Tanggal terima harus diisi!" }),
  amountMoney: z.coerce.number({ required_error: "Jumlah Uang harus diisi" }),
  amountRice: z.coerce.number({ required_error: "Jumlah Beras harus diisi" }),
  notes: z.string().optional(),
  pengurusName: z.string({ required_error: "Pengurus harus diisi!" }),
});

export const DataPengurusFormSchema = z.object({
  name: z.string({ required_error: "Nama harus diisi!" }),
  DoB: z.date({ required_error: "Tanggal lahir harus diisi!" }),
  address: z.string().optional(),
});
