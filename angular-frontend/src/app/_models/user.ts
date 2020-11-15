import { Role } from './role';

export class User {
  username: string;
  password: string;
  role: Role;
  age: number;
  prevProb: string;
  currMed: string;
  token?: string;
}

