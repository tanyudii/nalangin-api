import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '../../@database/database.module';
import { UsersModule } from '../../users/users.module';
import { ShoppingItem } from '../entities/shopping-items.entity';
import { Shopping } from '../entities/shopping.entity';
import { ShoppingItemsService } from '../services/shopping-items.service';
import { ShoppingsService } from '../services/shoppings.service';
import { ShoppingsLoader } from './shoppings.loader';

describe('ShoppingsLoader', () => {
  let loader: ShoppingsLoader;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        UsersModule,
        TypeOrmModule.forFeature([Shopping, ShoppingItem]),
      ],
      providers: [ShoppingsService, ShoppingItemsService, ShoppingsLoader],
    }).compile();

    loader = await module.resolve<ShoppingsLoader>(ShoppingsLoader);
  });

  it('should be defined', () => {
    expect(loader).toBeDefined();
  });
});
