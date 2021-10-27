import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '../../@database/database.module';
import { UsersModule } from '../../users/users.module';
import { ShoppingsLoader } from '../loaders/shoppings.loader';
import { ShoppingItemRepository } from '../repositories/shopping-item.repository';
import { ShoppingRepository } from '../repositories/shopping.repository';
import { ShoppingItemsService } from '../services/shopping-items.service';
import { ShoppingsService } from '../services/shoppings.service';
import { ShoppingsResolver } from './shoppings.resolver';

describe('ShoppingsResolver', () => {
  let resolver: ShoppingsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        TypeOrmModule.forFeature([ShoppingRepository, ShoppingItemRepository]),
        UsersModule,
      ],
      providers: [
        ShoppingsLoader,
        ShoppingsResolver,
        ShoppingsService,
        ShoppingItemsService,
      ],
    }).compile();

    resolver = module.get<ShoppingsResolver>(ShoppingsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
