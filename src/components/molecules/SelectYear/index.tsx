import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getYearsBefore } from "@/lib/utils";

type SelectYearProps = {
  selectedYear: string;
  handleYearChange: (value: string) => void;
};

export const SelectYear = ({
  selectedYear,
  handleYearChange,
}: SelectYearProps) => {
  return (
    <Select value={selectedYear} onValueChange={handleYearChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Pilih tahun" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Tahun</SelectLabel>
          {getYearsBefore().map((year) => (
            <SelectItem key={year} value={String(year)}>
              {year}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
