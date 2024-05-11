import { z } from "zod";

export const MuzakkiFormSchema = z.object({
  name: z.string({ required_error: "Nama harus diisi!" }),
  paidDate: z.date({ required_error: "Tanggal bayar harus diisi!" }),
  amountMoney: z.number().optional(),
  amountRice: z.number().optional(),
  address: z.string().optional(),
});

export const MustahikFormSchema = z.object({
  name: z.string({ required_error: "Nama harus diisi!" }),
  dateReceived: z.date({ required_error: "Tanggal terima harus diisi!" }),
  amountMoney: z.number().optional(),
  amountRice: z.number().optional(),
  address: z.string().optional(),
});

export const DataPengurusFormSchema = z.object({
  name: z.string({ required_error: "Nama harus diisi!" }),
  DoB: z.date({ required_error: "Tanggal lahir harus diisi!" }),
  address: z.string().optional(),
});
