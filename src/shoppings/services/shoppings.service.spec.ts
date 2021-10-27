import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '../../@database/database.module';
import { ShoppingItemRepository } from '../repositories/shopping-item.repository';
import { ShoppingRepository } from '../repositories/shopping.repository';
import { ShoppingsService } from './shoppings.service';

describe('ShoppingsService', () => {
  let service: ShoppingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        TypeOrmModule.forFeature([ShoppingRepository, ShoppingItemRepository]),
      ],
      providers: [ShoppingsService],
    }).compile();

    service = module.get<ShoppingsService>(ShoppingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
