import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShoppingsModule } from '../shoppings/shoppings.module';
import { UsersModule } from '../users/users.module';
import { PaymentItem } from './entities/payment-item.entity';
import { Payment } from './entities/payment.entity';
import { PaymentsLoader } from './loaders/payments.loader';
import { PaymentsResolver } from './resolvers/payments.resolver';
import { PaymentItemsService } from './services/payment-items.service';
import { PaymentsService } from './services/payments.service';

@Module({
  imports: [
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
})
export class PaymentsModule {}
