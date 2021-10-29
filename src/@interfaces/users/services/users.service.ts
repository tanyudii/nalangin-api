import { CreateUserInput } from '../../dto/create-user.input';
import { UpdateUserInput } from '../../dto/update-user.input';
import { User } from '../../entities/user.entity';

export interface IUsersService {
  findAll(): Promise<User[]>;
  findAllByIDs(ids: string[]): Promise<User[]>;
  findOne(id: string): Promise<User>;
  findOneByEmail(email: string): Promise<User>;
  findOneByPhoneNumber(phone: string): Promise<User>;
  findOneByEmailAndPassword(email: string, password: string): Promise<User>;
  findOneByPhoneAndPassword(phone: string, password: string): Promise<User>;
  create(createUserInput: CreateUserInput): Promise<User>;
  update(id: string, updateUserInput: UpdateUserInput): Promise<User>;
  updatePassword(id: string, password: string): Promise<User>;
  remove(id: string): Promise<User>;
}
