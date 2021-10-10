import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from '../dto/create-account.input';
import { UpdateAccountInput } from '../dto/update-account.input';
import { Account } from '../entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async findAll(userId: string): Promise<Account[]> {
    return this.accountRepository.find({ userId });
  }

  async findOne(userId: string, id: string): Promise<Account> {
    const account = await this.accountRepository.findOne({ userId, id });
    if (!account) {
      throw new NotFoundException();
    }

    return account;
  }

  async create(
    userId: string,
    createAccountInput: CreateAccountInput,
  ): Promise<Account> {
    const { name } = createAccountInput;
    return this.accountRepository.save({
      userId,
      name,
    });
  }

  async update(
    userId: string,
    id: string,
    updateAccountInput: UpdateAccountInput,
  ): Promise<Account> {
    const account = await this.accountRepository.findOne({ userId, id });
    if (!account) {
      throw new NotFoundException();
    }

    const { name } = updateAccountInput;
    return this.accountRepository.save({
      ...account,
      userId,
      name,
    });
  }

  async remove(userId: string, id: string): Promise<Account> {
    const account = await this.accountRepository.findOne({ userId, id });
    if (!account) {
      throw new NotFoundException();
    }

    await this.accountRepository.softDelete({ id });

    return account;
  }
}
