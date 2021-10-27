import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';

import { PaymentItem } from '../entities/payment-item.entity';
import { PaymentItemRepository } from '../repositories/payment-item.repository';

@Injectable()
export class PaymentItemsService {
  constructor(private readonly paymentItemRepository: PaymentItemRepository) {}

  async findAllByPaymentIds(paymentIds: string[]): Promise<PaymentItem[]> {
    return this.paymentItemRepository.find({
      paymentId: In(paymentIds),
    });
  }
}
