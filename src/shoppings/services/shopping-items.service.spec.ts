import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '../../@database/database.module';
import { ShoppingItemRepository } from '../repositories/shopping-item.repository';
import { ShoppingItemsService } from './shopping-items.service';

describe('ShoppingItemsService', () => {
  let service: ShoppingItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        TypeOrmModule.forFeature([ShoppingItemRepository]),
      ],
      providers: [ShoppingItemsService],
    }).compile();

    service = module.get<ShoppingItemsService>(ShoppingItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
