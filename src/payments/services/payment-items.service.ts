import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { PaymentItem } from '../entities/payment-item.entity';

@Injectable()
export class PaymentItemsService {
  constructor(
    @InjectRepository(PaymentItem)
    private readonly paymentItemRepository: Repository<PaymentItem>,
  ) {}

  async findAllByPaymentIds(paymentIds: string[]): Promise<PaymentItem[]> {
    return this.paymentItemRepository.find({
      where: {
        paymentId: In(paymentIds),
      },
    });
  }
}
