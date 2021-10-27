import { EntityRepository, Repository } from 'typeorm';

import { PaymentItem } from '../entities/payment-item.entity';

@EntityRepository(PaymentItem)
export class PaymentItemRepository extends Repository<PaymentItem> {}
