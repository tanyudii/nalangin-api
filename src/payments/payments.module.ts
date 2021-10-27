import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShoppingsModule } from '../shoppings/shoppings.module';
import { UsersModule } from '../users/users.module';
import { PaymentsLoader } from './loaders/payments.loader';
import { PaymentItemRepository } from './repositories/payment-item.repository';
import { PaymentRepository } from './repositories/payment.repository';
import { PaymentsResolver } from './resolvers/payments.resolver';
import { PaymentItemsService } from './services/payment-items.service';
import { PaymentsService } from './services/payments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentRepository, PaymentItemRepository]),
    UsersModule,
    ShoppingsModule,
  ],
  providers: [
    PaymentsLoader,
    PaymentsResolver,
    PaymentsService,
    PaymentItemsService,
  ],
})
export class PaymentsModule {}
