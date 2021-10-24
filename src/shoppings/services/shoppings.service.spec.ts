import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '../../@database/database.module';
import { ShoppingItem } from '../entities/shopping-items.entity';
import { Shopping } from '../entities/shopping.entity';
import { ShoppingsService } from './shoppings.service';

describe('ShoppingsService', () => {
  let service: ShoppingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        TypeOrmModule.forFeature([Shopping, ShoppingItem]),
      ],
      providers: [ShoppingsService],
    }).compile();

    service = module.get<ShoppingsService>(ShoppingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
