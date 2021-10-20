import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../../@database/database.module';
import { UserBanksResolver } from './user-banks.resolver';
import { UserBanksService } from '../services/user-banks.service';
import { UsersModule } from '../../users/users.module';
import { UserBanksLoader } from '../loaders/user-banks.loader';
import { UserBank } from '../entities/user-bank.entity';

describe('UserBanksResolver', () => {
  let resolver: UserBanksResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        UsersModule,
        TypeOrmModule.forFeature([UserBank]),
      ],
      providers: [UserBanksResolver, UserBanksService, UserBanksLoader],
    }).compile();

    resolver = module.get<UserBanksResolver>(UserBanksResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
