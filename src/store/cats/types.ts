import { AsyncEntity } from "../types";

interface CatFactStatus {
  verified: boolean;
  sentCount: number;
}

export interface CatFact {
  status: CatFactStatus;
  type: string;
  deleted: boolean;
  _id: string;
  user: string;
  text: string;
  __v: number;
  source: string;
  updatedAt: string;
  createdAt: string;
  used: boolean;
}

export interface CatState {
  catFact: AsyncEntity<CatFact[], string>;
}
