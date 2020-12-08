import { Role } from './role';
import { Record } from './record';

export class User {
  username: string;
  password: string;
  role: Role;
  prevProb: string;
  currMed: string;
  token?: string;
  patients: Object[];
  records: Record[];
}

