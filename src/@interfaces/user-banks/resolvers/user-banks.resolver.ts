import { IUser } from '../../../@common/interfaces/user.interface';
import { ICreateUserBankInput } from '../dto/create-user-bank.input';
import { IUpdateUserBankInput } from '../dto/update-user-bank.input';
import { IUserBank } from '../entities/user-bank.entity';

export interface IUserBanksResolver {
  findAll(currentUser: IUser): Promise<IUserBank[]>;
  findOne(currentUser: IUser, id: string): Promise<IUserBank>;
  createUserBank(
    currentUser: IUser,
    createUserBankInput: ICreateUserBankInput,
  ): Promise<IUserBank>;
  updateUserBank(
    currentUser: IUser,
    updateUserBankInput: IUpdateUserBankInput,
  ): Promise<IUserBank>;
  removeUserBank(currentUser: IUser, id: string): Promise<IUserBank>;
}
