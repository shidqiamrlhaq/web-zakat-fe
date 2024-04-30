import { format, formatDate } from "date-fns";
import { id } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type FormCalendarFieldProps = {
  form: z.infer<any>;
  formName: string;
  label: string;
  fromYear?: number;
  toYear?: number;
};

export const FormCalendarField = ({
  form,
  label,
  formName,
  fromYear = 1900,
  toYear = new Date().getFullYear(),
}: FormCalendarFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={formName}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="mb-2">{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value ? (
                    formatDate(field.value, "PPP", {
                      locale: id,
                    })
                  ) : (
                    <span>Pilih tanggal</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                captionLayout="dropdown"
                toYear={toYear}
                fromYear={fromYear}
                classNames={{
                  day_hidden: "invisible",
                  dropdown:
                    "px-2 py-1.5 rounded-md bg-popover text-popover-foreground text-sm  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
                  caption_dropdowns: "flex gap-3",
                  vhidden: "hidden",
                  caption_label: "hidden",
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
