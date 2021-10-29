import { ICreateUserInput } from './create-user.input';

export interface IUpdateUserInput extends Omit<ICreateUserInput, 'password'> {
  id: string;
}
