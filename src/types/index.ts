export type TPengurus = {
  id?: number;
  name: string;
  DoB: Date;
  address?: string;
};

export type TUpdatePengurus = Partial<TPengurus>;

export type TCreatePengurus = Omit<TPengurus, "id">;
