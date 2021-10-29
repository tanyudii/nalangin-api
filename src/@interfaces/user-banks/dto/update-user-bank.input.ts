import { ICreateUserBankInput } from './create-user-bank.input';

export interface IUpdateUserBankInput extends ICreateUserBankInput {
  id: string;
}
