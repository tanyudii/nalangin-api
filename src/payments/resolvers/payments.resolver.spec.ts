import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '../../@database/database.module';
import { ShoppingsModule } from '../../shoppings/shoppings.module';
import { UsersModule } from '../../users/users.module';
import { PaymentItem } from '../entities/payment-item.entity';
import { Payment } from '../entities/payment.entity';
import { PaymentsLoader } from '../loaders/payments.loader';
import { PaymentItemsService } from '../services/payment-items.service';
import { PaymentsService } from '../services/payments.service';
import { PaymentsResolver } from './payments.resolver';

describe('PaymentsResolver', () => {
  let resolver: PaymentsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        UsersModule,
        ShoppingsModule,
        TypeOrmModule.forFeature([Payment, PaymentItem]),
      ],
      providers: [
        PaymentsResolver,
        PaymentsService,
        PaymentItemsService,
        PaymentsLoader,
      ],
    }).compile();

    resolver = module.get<PaymentsResolver>(PaymentsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
