import { ICreateUserBankInput } from '../dto/create-user-bank.input';
import { IUpdateUserBankInput } from '../dto/update-user-bank.input';
import { IUserBank } from '../entities/user-bank.entity';

export interface IUserBanksService {
  findAll(userId: string): Promise<IUserBank[]>;
  findOne(userId: string, id: string): Promise<IUserBank>;
  create(
    userId: string,
    createUserBankInput: ICreateUserBankInput,
  ): Promise<IUserBank>;
  update(
    userId: string,
    id: string,
    updateUserBankInput: IUpdateUserBankInput,
  ): Promise<IUserBank>;
  remove(userId: string, id: string): Promise<IUserBank>;
}
