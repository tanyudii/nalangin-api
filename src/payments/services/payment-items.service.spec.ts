import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '../../@database/database.module';
import { PaymentItem } from '../entities/payment-item.entity';
import { PaymentItemsService } from './payment-items.service';

describe('PaymentItemsService', () => {
  let service: PaymentItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, TypeOrmModule.forFeature([PaymentItem])],
      providers: [PaymentItemsService],
    }).compile();

    service = module.get<PaymentItemsService>(PaymentItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
