import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { axiosInstance } from "@/lib/api";

export const useFetchByYear = (endpoint: string) => {
  const [selectedYear, setSelectedYear] = useState<string | number>(
    new Date().getFullYear(),
  );

  const { data, isLoading, isRefetching, isError, error } = useQuery({
    queryKey: [endpoint, selectedYear],
    queryFn: async () => {
      const { data: response } = await axiosInstance.get(`/${endpoint}`, {
        params: {
          year: selectedYear,
        },
      });

      return response.data;
    },
  });

  const handleYearChange = (e: string | number) => {
    setSelectedYear(e);
  };

  return {
    data,
    isLoading,
    isRefetching,
    isError,
    error,
    selectedYear,
    handleYearChange,
  };
};
