import { Injectable, NotFoundException } from '@nestjs/common';

import { IUserBank } from '../../@interfaces/user-banks/entities/user-bank.entity';
import { IUserBanksService } from '../../@interfaces/user-banks/services/user-banks.service';
import { CreateUserBankInput } from '../dto/create-user-bank.input';
import { UpdateUserBankInput } from '../dto/update-user-bank.input';
import { UserBankRepository } from '../repositories/user-bank.repository';

@Injectable()
export class UserBanksService implements IUserBanksService {
  constructor(private readonly userBankRepository: UserBankRepository) {}

  async findAll(userId: string): Promise<IUserBank[]> {
    return this.userBankRepository.find({ userId });
  }

  async findOne(userId: string, id: string): Promise<IUserBank> {
    const userBank = await this.userBankRepository.findOne({ userId, id });
    if (!userBank) {
      throw new NotFoundException();
    }

    return userBank;
  }

  async create(
    userId: string,
    createUserBankInput: CreateUserBankInput,
  ): Promise<IUserBank> {
    const { bankName, bankNumber } = createUserBankInput;
    return this.userBankRepository.save({
      userId,
      bankName,
      bankNumber,
    });
  }

  async update(
    userId: string,
    id: string,
    updateUserBankInput: UpdateUserBankInput,
  ): Promise<IUserBank> {
    const userBank = await this.userBankRepository.findOne({ userId, id });
    if (!userBank) {
      throw new NotFoundException();
    }

    const { bankName, bankNumber } = updateUserBankInput;
    return this.userBankRepository.save({
      ...userBank,
      userId,
      bankName,
      bankNumber,
    });
  }

  async remove(userId: string, id: string): Promise<IUserBank> {
    const userBank = await this.userBankRepository.findOne({ userId, id });

    if (!userBank) {
      throw new NotFoundException();
    }

    await this.userBankRepository.softDelete({ id });

    return userBank;
  }
}
