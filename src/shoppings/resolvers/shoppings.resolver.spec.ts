import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../../@database/database.module';
import { ShoppingsResolver } from './shoppings.resolver';
import { ShoppingsService } from '../services/shoppings.service';
import { UsersModule } from '../../users/users.module';
import { Shopping } from '../entities/shopping.entity';
import { ShoppingItem } from '../entities/shopping-items.entity';
import { ShoppingsLoader } from '../loaders/shoppings.loader';

describe('ShoppingsResolver', () => {
  let resolver: ShoppingsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        UsersModule,
        TypeOrmModule.forFeature([Shopping, ShoppingItem]),
      ],
      providers: [ShoppingsResolver, ShoppingsService, ShoppingsLoader],
    }).compile();

    resolver = module.get<ShoppingsResolver>(ShoppingsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
