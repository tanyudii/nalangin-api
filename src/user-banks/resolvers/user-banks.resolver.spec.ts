import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '../../@database/database.module';
import { UserBankRepository } from '../repositories/user-bank.repository';
import { UserBanksService } from '../services/user-banks.service';
import { UserBanksResolver } from './user-banks.resolver';

describe('UserBanksResolver', () => {
  let resolver: UserBanksResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, TypeOrmModule.forFeature([UserBankRepository])],
      providers: [UserBanksResolver, UserBanksService],
    }).compile();

    resolver = module.get<UserBanksResolver>(UserBanksResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
