import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../../@database/database.module';
import { UserBanksLoader } from './user-banks.loader';
import { UsersModule } from '../../users/users.module';

describe('UserBanksLoader', () => {
  let loader: UserBanksLoader;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, UsersModule],
      providers: [UserBanksLoader],
    }).compile();

    loader = await module.resolve<UserBanksLoader>(UserBanksLoader);
  });

  it('should be defined', () => {
    expect(loader).toBeDefined();
  });
});
