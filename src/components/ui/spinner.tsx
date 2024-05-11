import React from "react";

export const Spinner = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-8 border-t-primary" />
    </div>
  );
};
