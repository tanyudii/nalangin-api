import { Injectable, NotFoundException } from '@nestjs/common';

import { ShoppingItem } from '../../shoppings/entities/shopping-item.entity';
import { ShoppingItemsService } from '../../shoppings/services/shopping-items.service';
import { CreatePaymentInput } from '../dto/create-payment.input';
import { UpdatePaymentInput } from '../dto/update-payment.input';
import { Payment } from '../entities/payment.entity';
import { PaymentItemRepository } from '../repositories/payment-item.repository';
import { PaymentRepository } from '../repositories/payment.repository';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly paymentItemRepository: PaymentItemRepository,
    private readonly shoppingItemsService: ShoppingItemsService,
  ) {}

  async findAll(userId: string): Promise<Payment[]> {
    return this.paymentRepository.my(userId, 'payments').getMany();
  }

  async findAllPagination(
    userId: string,
    options: IPaginationOptions,
  ): Promise<Pagination<Payment>> {
    const queryBuilder = this.paymentRepository
      .my(userId, 'payments')
      .orderBy('payments.createdAt', 'DESC');

    return paginate<Payment>(queryBuilder, options);
  }

  async findOne(userId: string, id: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOne(id);

    if (!payment) {
      throw new NotFoundException();
    }

    return payment;
  }

  async create(
    userId: string,
    createPaymentInput: CreatePaymentInput,
  ): Promise<Payment> {
    const { date, lenderId, lenderBankId, paymentItems } = createPaymentInput;

    const shoppingItems = await this.shoppingItemsService.findAll({
      borrowerIds: [userId],
      userIds: [lenderId],
      shoppingIds: paymentItems.map((paymentItem) => paymentItem.shoppingId),
    });

    let delivery = 0;
    let discount = 0;
    let ppn = 0;
    let subtotal = 0;
    let grandTotal = 0;

    shoppingItems.forEach((shoppingItem) => {
      delivery += shoppingItem.delivery;
      discount += shoppingItem.discount;
      ppn += shoppingItem.ppn;
      subtotal += shoppingItem.price;
      grandTotal += shoppingItem.total;
    });

    const payment = await this.paymentRepository.save({
      userId,
      date,
      lenderId,
      lenderBankId,
      delivery,
      discount,
      ppn,
      subtotal,
      grandTotal,
    });

    await this.syncPaymentItems(payment, shoppingItems);

    return payment;
  }

  async update(
    userId: string,
    id: string,
    updatePaymentInput: UpdatePaymentInput,
  ): Promise<Payment> {
    const { date, lenderId, lenderBankId, paymentItems } = updatePaymentInput;

    let payment = await this.paymentRepository.findOne({ userId, id });

    if (!payment) {
      throw new NotFoundException();
    }

    const shoppingItems = await this.shoppingItemsService.findAll({
      userIds: [lenderId],
      borrowerIds: [userId],
      shoppingIds: paymentItems.map((paymentItem) => paymentItem.shoppingId),
    });

    let delivery = 0;
    let discount = 0;
    let ppn = 0;
    let subtotal = 0;
    let grandTotal = 0;

    shoppingItems.forEach((shoppingItem) => {
      delivery += shoppingItem.delivery;
      discount += shoppingItem.discount;
      ppn += shoppingItem.ppn;
      subtotal += shoppingItem.price;
      grandTotal += shoppingItem.total;
    });

    payment = await this.paymentRepository.save({
      ...payment,
      date,
      lenderId,
      lenderBankId,
      delivery,
      discount,
      ppn,
      subtotal,
      grandTotal,
    });

    await this.syncPaymentItems(payment, shoppingItems);

    return payment;
  }

  async remove(userId: string, id: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOne(id);

    if (!payment) {
      throw new NotFoundException();
    }

    await this.paymentRepository.softDelete({ id });

    return payment;
  }

  protected async syncPaymentItems(
    payment: Payment,
    shoppingItems: ShoppingItem[],
  ) {
    //delete all old payment item
    await this.paymentItemRepository.delete({
      paymentId: payment.id,
    });

    for (const shoppingItem of shoppingItems) {
      const { shoppingId, price, percentage, delivery, discount, ppn, total } =
        shoppingItem;

      await this.paymentItemRepository.save({
        payment,
        shoppingId,
        price,
        percentage,
        delivery,
        discount,
        ppn,
        total,
      });
    }
  }
}
