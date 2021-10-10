import { Test, TestingModule } from '@nestjs/testing';
import { AccountsResolver } from './accounts.resolver';
import { AccountsService } from '../services/accounts.service';
import { DatabaseModule } from '../../@database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../entities/account.entity';

describe('AccountsResolver', () => {
  let resolver: AccountsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, TypeOrmModule.forFeature([Account])],
      providers: [AccountsResolver, AccountsService],
    }).compile();

    resolver = module.get<AccountsResolver>(AccountsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
