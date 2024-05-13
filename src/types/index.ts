export type TPengurus = {
  id?: number;
  name: string;
  DoB: Date;
  address?: string;
};

export type TMustahik = {
  id?: number;
  name: string;
  distributionDate: Date;
  amountRice: number;
  amountMoney: number;
  notes?: string;

  pengurusName: TPengurus["name"]; // foreign key
};

export type TMuzakki = {
  id?: number;
  name: string;
  paymentDate: Date;
  amountRice: number;
  amountMoney: number;
  notes?: string;

  pengurusName: TPengurus["name"]; // foreign key
};

export type TInfaq = {
  id?: number;
  name: string;
  date: Date;
  amountRice: number;
  amountMoney: number;
  notes?: string;

  pengurusName: TPengurus["name"]; // foreign key
};

export type TCreateInfaq = Omit<TInfaq, "id">;

export type TCreateMustahik = Omit<TMustahik, "id">;

export type TCreateMuzakki = Omit<TMuzakki, "id">;

export type TUpdatePengurus = Partial<TPengurus>;

export type TCreatePengurus = Omit<TPengurus, "id">;
