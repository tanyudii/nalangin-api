import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from '../../dto/create-user.input';
import { UpdateUserInput } from '../../dto/update-user.input';
import { User } from '../../entities/user.entity';
import {
  comparePassword,
  hashPassword,
} from '../../../common/helpers/bcrypt.helper';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ id });
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    const { name, email, password, phoneNumber, avatar } = createUserInput;

    const passwordHashed = await hashPassword(password);

    return this.userRepository.save({
      name,
      email,
      password: passwordHashed,
      phoneNumber,
      avatar,
    });
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    const { name, email, phoneNumber, avatar } = updateUserInput;

    const user = await this.userRepository.findOne({ id });
    if (!user) {
      throw new NotFoundException();
    }

    return this.userRepository.save({
      ...user,
      name,
      email,
      phoneNumber,
      avatar,
    });
  }

  async remove(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ id });
    if (!user) {
      throw new NotFoundException();
    }

    await this.userRepository.softDelete({ id });

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async findOneByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<User> {
    const user = await this.userRepository.findOne({ email });
    if (!user || !(await comparePassword(user.password, password))) {
      throw new NotFoundException();
    }

    return user;
  }
}
