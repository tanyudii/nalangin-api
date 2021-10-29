import { ICreateUserInput } from '../dto/create-user.input';
import { IUpdateUserInput } from '../dto/update-user.input';
import { IUser } from '../entities/user.entity';

export interface IUserResolver {
  findAll(): Promise<IUser[]>;
  findOne(id: string): Promise<IUser>;
  createUser(createUserInput: ICreateUserInput): Promise<IUser>;
  updateUser(updateUserInput: IUpdateUserInput): Promise<IUser>;
  removeUser(id: string): Promise<IUser>;
}
