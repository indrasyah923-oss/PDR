export type currentuserData={
    name:string,
    photo:string
}

// src/modules/pdr/features/question/types.ts

export interface Voter {
  nama: string;
  foto: string;
  catatan: string;
  tanggal: string;
}

export interface ChoosenAnswer {
  label: string;
  voters: Voter[];
}