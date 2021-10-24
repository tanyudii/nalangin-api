import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '../../@database/database.module';
import { ShoppingsModule } from '../../shoppings/shoppings.module';
import { UsersModule } from '../../users/users.module';
import { PaymentItem } from '../entities/payment-item.entity';
import { Payment } from '../entities/payment.entity';
import { PaymentItemsService } from '../services/payment-items.service';
import { PaymentsService } from '../services/payments.service';
import { PaymentsLoader } from './payments.loader';

describe('PaymentsLoader', () => {
  let loader: PaymentsLoader;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        UsersModule,
        ShoppingsModule,
        TypeOrmModule.forFeature([Payment, PaymentItem]),
      ],
      providers: [PaymentsService, PaymentItemsService, PaymentsLoader],
    }).compile();

    loader = await module.resolve<PaymentsLoader>(PaymentsLoader);
  });

  it('should be defined', () => {
    expect(loader).toBeDefined();
  });
});
