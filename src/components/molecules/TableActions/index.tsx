import React from "react";

import { DeleteDialog } from "../DeleteDialog";

export interface TableActionsProps {
  id: number;
  keyUrl: string;
}

export const TableActions = ({ id, keyUrl }: TableActionsProps) => {
  return (
    <div className="flex w-fit justify-between space-x-2">
      <DeleteDialog id={id} keyUrl={keyUrl} />

      {/* use this when need edit data dialog
      <Dialog>
        <DialogTrigger asChild>
          <Button className="shrink-0 p-2" variant="outline">
            <SquarePen size={18} />
          </Button>
        </DialogTrigger>
        {children}
      </Dialog> */}
    </div>
  );
};
