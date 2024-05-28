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

export const getYearsBefore = () => {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  const fromYear = 2020;

  for (let i = currentYear; i >= fromYear; i--) {
    years.push(i);
  }

  return years;
};
