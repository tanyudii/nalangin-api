import { ICreateUserInput } from '../dto/create-user.input';
import { IUpdateUserInput } from '../dto/update-user.input';
import { IUser } from '../entities/user.entity';

export interface IUsersService {
  findAll(): Promise<IUser[]>;
  findAllByIDs(ids: string[]): Promise<IUser[]>;
  findOne(id: string): Promise<IUser>;
  findOneByEmail(email: string): Promise<IUser>;
  findOneByPhoneNumber(phone: string): Promise<IUser>;
  findOneByEmailAndPassword(email: string, password: string): Promise<IUser>;
  findOneByPhoneAndPassword(phone: string, password: string): Promise<IUser>;
  create(createUserInput: ICreateUserInput): Promise<IUser>;
  update(id: string, updateUserInput: IUpdateUserInput): Promise<IUser>;
  updatePassword(id: string, password: string): Promise<IUser>;
  remove(id: string): Promise<IUser>;
}
