import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatToRupiah = (value: number) => {
  return value?.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
};
