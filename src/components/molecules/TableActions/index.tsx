import { SquarePen } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { DeleteDialog } from "../DeleteDialog";

export interface TableActionsProps {
  id: number;
  keyUrl: string;
  children?: React.ReactNode;
}

export const TableActions = ({ id, keyUrl, children }: TableActionsProps) => {
  return (
    <div className="flex w-fit justify-between space-x-2">
      <DeleteDialog id={id} keyUrl={keyUrl} />

      <Dialog>
        <DialogTrigger asChild>
          <Button className="shrink-0 p-2" variant="outline" title="Edit">
            <SquarePen size={18} />
          </Button>
        </DialogTrigger>
        {children}
      </Dialog>
    </div>
  );
};
