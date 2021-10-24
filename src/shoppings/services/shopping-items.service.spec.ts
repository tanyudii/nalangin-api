import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '../../@database/database.module';
import { ShoppingItem } from '../entities/shopping-items.entity';
import { ShoppingItemsService } from './shopping-items.service';

describe('ShoppingItemsService', () => {
  let service: ShoppingItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, TypeOrmModule.forFeature([ShoppingItem])],
      providers: [ShoppingItemsService],
    }).compile();

    service = module.get<ShoppingItemsService>(ShoppingItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
