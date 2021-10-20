import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../../@database/database.module';
import { ShoppingsLoader } from './shoppings.loader';
import { UsersModule } from '../../users/users.module';

describe('UserBanksLoader', () => {
  let loader: ShoppingsLoader;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, UsersModule],
      providers: [ShoppingsLoader],
    }).compile();

    loader = await module.resolve<ShoppingsLoader>(ShoppingsLoader);
  });

  it('should be defined', () => {
    expect(loader).toBeDefined();
  });
});
