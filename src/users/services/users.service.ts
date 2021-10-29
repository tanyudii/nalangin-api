import { Injectable, NotFoundException } from '@nestjs/common';

import {
  comparePassword,
  hashPassword,
} from '../../@common/helpers/bcrypt.helper';
import { ICreateUserInput } from '../../@interfaces/users/dto/create-user.input';
import { IUpdateUserInput } from '../../@interfaces/users/dto/update-user.input';
import { IUser } from '../../@interfaces/users/entities/user.entity';
import { IUsersService } from '../../@interfaces/users/services/users.service';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UsersService implements IUsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<IUser[]> {
    return this.userRepository.find();
  }

  async findAllByIDs(ids: string[]): Promise<IUser[]> {
    return this.userRepository.findByIds(ids);
  }

  async findOne(id: string): Promise<IUser> {
    const user = await this.userRepository.findOne({ id });
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<IUser> {
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async findOneByPhoneNumber(phoneNumber: string): Promise<IUser> {
    const user = await this.userRepository.findOne({ phoneNumber });
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async findOneByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<IUser> {
    const user = await this.userRepository.findOne({ email });
    if (!user || !(await comparePassword(user.password, password))) {
      throw new NotFoundException();
    }

    return user;
  }

  async findOneByPhoneAndPassword(
    phoneNumber: string,
    password: string,
  ): Promise<IUser> {
    const user = await this.userRepository.findOne({ phoneNumber });
    if (!user || !(await comparePassword(user.password, password))) {
      throw new NotFoundException();
    }

    return user;
  }

  async create(createUserInput: ICreateUserInput): Promise<IUser> {
    const { name, phoneNumber, email, password, avatar } = createUserInput;

    return this.userRepository.save({
      name,
      phoneNumber,
      email,
      password: await hashPassword(password),
      avatar,
    });
  }

  async update(id: string, updateUserInput: IUpdateUserInput): Promise<IUser> {
    const user = await this.userRepository.findOne({ id });
    if (!user) {
      throw new NotFoundException();
    }

    const { name, email, phoneNumber, avatar } = updateUserInput;
    return this.userRepository.save({
      ...user,
      name,
      email,
      phoneNumber,
      avatar,
    });
  }

  async updatePassword(id: string, password: string): Promise<IUser> {
    const user = await this.userRepository.findOne({ id });
    if (!user) {
      throw new NotFoundException();
    }

    return this.userRepository.save({
      ...user,
      password: await hashPassword(password),
    });
  }

  async remove(id: string): Promise<IUser> {
    const user = await this.userRepository.findOne({ id });

    if (!user) {
      throw new NotFoundException();
    }

    return this.userRepository.softRemove(user);
  }
}
