export type TPengurus = {
  id?: number;
  name: string;
  DoB: Date;
  address: string;
};

export type TMustahik = {
  id?: number;
  name: string;
  distributionDate: Date;
  amountRice: number;
  amountMoney: number;
  notes: string;

  pengurusName: TPengurus["name"]; // foreign key
};

export type TMuzakki = {
  id?: number;
  name: string;
  paymentDate: Date;
  amountRice: number;
  amountMoney: number;
  notes: string;

  pengurusName: TPengurus["name"]; // foreign key
};

export type TInfaq = {
  id?: number;
  name: string;
  date: Date;
  amountMoney: number;
  notes: string;

  pengurusName: TPengurus["name"]; // foreign key
};

export type TMasyarakat = {
  id?: number;
  name: string;
  DoB: Date;
  PoB: string;
  job: string;
  type: typeMasyarakat;

  phone: string;
  address: string;
};

export enum typeMasyarakat {
  MUZAKKI = "MUZAKKI",
  MUSTAHIK = "MUSTAHIK",
}

export type TLogin = {
  username: string;
  password: string;
};

export enum jobType {
  PNS = "PNS",
  WIRASWASTA = "WIRASWASTA",
  APARAT = "TNI/POLRI",
  SWASTA = "PEGAWAI SWASTA",
  BURUH = "BURUH",
  PELAJAR = "PELAJAR/MAHASISWA",
  GURU = "GURU",
  PENGANGGURAN = "TIDAK BEKERJA",
  LAINNYA = "LAINNYA",
}

export enum jabatanPengurus {
  KETUA = "KETUA DKM",
  ANGGOTA = "ANGGOTA",
  BENDAHARA = "BENDAHARA",
  SEKRETARIS = "SEKRETARIS",
  UPZ = "KETUA UPZ",
}

export type TCreateMasyarakat = Omit<TMasyarakat, "id">;

export type TCreateInfaq = Omit<TInfaq, "id">;

export type TCreateMustahik = Omit<TMustahik, "id">;

export type TCreateMuzakki = Omit<TMuzakki, "id">;

export type TUpdatePengurus = Partial<TPengurus>;

export type TCreatePengurus = Omit<TPengurus, "id">;
