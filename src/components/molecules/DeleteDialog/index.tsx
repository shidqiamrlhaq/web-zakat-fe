import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/api";

type DeleteDialogProps = {
  id: number;
  keyUrl: string;
};

export const DeleteDialog = ({ id, keyUrl }: DeleteDialogProps) => {
  const queryClient = useQueryClient();

  const deletePengurus = async () => {
    return await axiosInstance.delete(`/${keyUrl}/${id}`);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: deletePengurus,
    onSuccess: () => {
      toast.success("Data Berhasil Dihapus");
      queryClient.invalidateQueries({ queryKey: [`${keyUrl}`] });
    },
    onError: (err: any) => {
      console.log(err);
      toast.error("Gagal menghapus data", {
        description: err.response.data.message,
      });
    },
  });

  const onDelete = () => {
    mutate();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="shrink-0 p-2" variant="destructive" title="Hapus">
          <Trash2 size={18} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            Aksi ini akan menghapus data dari sistem
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            disabled={isPending}
            className="bg-primary hover:bg-destructive disabled:bg-primary/40"
          >
            Lanjutkan
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
