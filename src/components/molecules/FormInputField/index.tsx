import React, { HTMLInputTypeAttribute } from "react";
import { z } from "zod";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type FormInputFieldProps = {
  form: z.infer<any>;
  formName: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  isTextArea?: boolean;
  label?: string;
};

export const FormInputField = ({
  form,
  formName,
  type = "text",
  placeholder,
  label,
}: FormInputFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={formName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              type={type}
              onWheelCapture={(e) => e.currentTarget.blur()}
              min={0}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
