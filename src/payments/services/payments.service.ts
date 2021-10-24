import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { ShoppingItem } from '../../shoppings/entities/shopping-items.entity';
import { ShoppingItemsService } from '../../shoppings/services/shopping-items.service';
import { CreatePaymentInput } from '../dto/create-payment.input';
import { UpdatePaymentInput } from '../dto/update-payment.input';
import { PaymentItem } from '../entities/payment-item.entity';
import { Payment } from '../entities/payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(PaymentItem)
    private readonly paymentItemRepository: Repository<PaymentItem>,
    private readonly shoppingItemsService: ShoppingItemsService,
  ) {}

  async findAll(userId: string): Promise<Payment[]> {
    return this.paymentRepository.find({ userId });
  }

  async findOne(userId: string, id: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOne(id);

    if (!payment) {
      throw new NotFoundException();
    }

    return payment;
  }

  async findPaymentItemByPaymentIds(
    paymentIds: string[],
  ): Promise<PaymentItem[]> {
    return this.paymentItemRepository.find({
      where: {
        paymentId: In(paymentIds),
      },
    });
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
