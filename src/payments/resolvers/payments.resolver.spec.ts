import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '../../@database/database.module';
import { ShoppingsModule } from '../../shoppings/shoppings.module';
import { UsersModule } from '../../users/users.module';
import { PaymentsLoader } from '../loaders/payments.loader';
import { PaymentItemRepository } from '../repositories/payment-item.repository';
import { PaymentRepository } from '../repositories/payment.repository';
import { PaymentItemsService } from '../services/payment-items.service';
import { PaymentsService } from '../services/payments.service';
import { PaymentsResolver } from './payments.resolver';

describe('PaymentsResolver', () => {
  let resolver: PaymentsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        TypeOrmModule.forFeature([PaymentRepository, PaymentItemRepository]),
        ShoppingsModule,
        UsersModule,
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
