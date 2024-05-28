import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatToRupiah } from "@/lib/utils";

type LinkCardProps = {
  title: string;
  description?: string;
  totalMoney?: number;
  totalRice?: number;
  totalPeople?: number;
  icon: React.ReactNode;
};

export const LinkCard = ({
  title,
  description,
  totalPeople,
  totalMoney,
  totalRice,
  icon,
}: LinkCardProps) => {
  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle className="flex w-full items-center justify-between">
            {title}
            {icon}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {totalMoney && (
            <p className="text-2xl font-semibold lg:text-3xl">
              {formatToRupiah(totalMoney)}
            </p>
          )}
          {totalRice && (
            <p className="text-2xl font-semibold lg:text-3xl">{totalRice} Kg</p>
          )}
          {totalPeople && (
            <p className="text-2xl font-semibold lg:text-3xl">
              {totalPeople} Orang
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
