import User from '@src/models/user.model';

export interface IUserRegister extends User {
  confirmPassword: string;
}
