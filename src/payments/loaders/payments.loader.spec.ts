import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '../../@database/database.module';
import { ShoppingsModule } from '../../shoppings/shoppings.module';
import { UsersModule } from '../../users/users.module';
import { PaymentItemRepository } from '../repositories/payment-item.repository';
import { PaymentRepository } from '../repositories/payment.repository';
import { PaymentItemsService } from '../services/payment-items.service';
import { PaymentsService } from '../services/payments.service';
import { PaymentsLoader } from './payments.loader';

describe('PaymentsLoader', () => {
  let loader: PaymentsLoader;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        TypeOrmModule.forFeature([PaymentRepository, PaymentItemRepository]),
        UsersModule,
        ShoppingsModule,
      ],
      providers: [PaymentsLoader, PaymentsService, PaymentItemsService],
    }).compile();

    loader = await module.resolve<PaymentsLoader>(PaymentsLoader);
  });

  it('should be defined', () => {
    expect(loader).toBeDefined();
  });
});
