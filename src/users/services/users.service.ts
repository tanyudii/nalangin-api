import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { hashPassword } from '../common/helpers/bcrypt.helper';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne({ id });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ email });
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

  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    const { name, email, phoneNumber, avatar } = updateUserInput;

    const user = await this.userRepository.findOne({ id });

    return this.userRepository.save({
      ...user,
      name,
      email,
      phoneNumber,
      avatar,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
