import { Role } from './role';

export class User {
  username: string;
  password: string;
  role: Role;
  token?: string;
}
