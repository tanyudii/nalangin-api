import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';

import {
  CreateShoppingInput,
  CreateShoppingItemInput,
} from '../dto/create-shopping.input';
import { UpdateShoppingInput } from '../dto/update-shopping.input';
import { ShoppingItem } from '../entities/shopping-items.entity';
import { Shopping } from '../entities/shopping.entity';

@Injectable()
export class ShoppingsService {
  constructor(
    @InjectRepository(Shopping)
    private readonly shoppingRepository: Repository<Shopping>,
    @InjectRepository(ShoppingItem)
    private readonly shoppingItemRepository: Repository<ShoppingItem>,
  ) {}

  async findAll(userId: string): Promise<Shopping[]> {
    return this.shoppingRepository.find({ userId });
  }

  async findOne(userId: string, id: string): Promise<Shopping> {
    const shopping = await this.shoppingRepository.findOne(id);

    if (!shopping) {
      throw new NotFoundException();
    }

    return shopping;
  }

  async create(
    userId: string,
    createShoppingInput: CreateShoppingInput,
  ): Promise<Shopping> {
    const { date, store, isPpn, delivery, discount, shoppingItems } =
      createShoppingInput;

    const subtotal = shoppingItems
      .map((shoppingItem) => shoppingItem.price)
      .reduce((a, b) => a + b, 0);

    const ppn = isPpn ? subtotal * 0.1 : 0;

    const shopping = await this.shoppingRepository.save({
      userId,
      date,
      store,
      isPpn,
      delivery,
      discount,
      ppn,
      subtotal,
      grandTotal: subtotal + ppn + delivery - discount,
    });

    await this.syncShoppingItem(shopping, shoppingItems);

    return shopping;
  }

  async update(
    userId: string,
    id: string,
    updateShoppingInput: UpdateShoppingInput,
  ): Promise<Shopping> {
    const { date, store, isPpn, delivery, discount, shoppingItems } =
      updateShoppingInput;

    let shopping = await this.shoppingRepository.findOne({ userId, id });

    if (!shopping) {
      throw new NotFoundException();
    }

    const subtotal = shoppingItems
      .map((shoppingItem) => shoppingItem.price)
      .reduce((a, b) => a + b, 0);

    const ppn = isPpn ? subtotal * 0.1 : 0;

    shopping = await this.shoppingRepository.save({
      ...shopping,
      date,
      store,
      isPpn,
      delivery,
      discount,
      ppn,
      subtotal,
      grandTotal: subtotal + ppn + delivery - discount,
    });

    await this.syncShoppingItem(shopping, shoppingItems);

    return shopping;
  }

  async remove(userId: string, id: string): Promise<Shopping> {
    const shopping = await this.shoppingRepository.findOne(id);

    if (!shopping) {
      throw new NotFoundException();
    }

    await this.shoppingRepository.softDelete({ id });

    return shopping;
  }

  protected async syncShoppingItem(
    shopping: Shopping,
    shoppingItems: CreateShoppingItemInput[],
  ) {
    //delete old shopping item
    await this.shoppingItemRepository.softDelete({
      shoppingId: shopping.id,
      id: Not(
        In(
          shoppingItems.map((shoppingItem) => shoppingItem.id).filter((a) => a),
        ),
      ),
    });

    for (const shoppingItem of shoppingItems) {
      const { id, borrowerId, price, description } = shoppingItem;

      const ppnItem = shopping.isPpn ? price * 0.1 : 0;
      const percentageItem = price / shopping.subtotal;
      const deliveryItem = percentageItem * shopping.delivery;
      const discountItem = percentageItem * shopping.discount;

      const currentShoppingItem =
        id === undefined
          ? null
          : await this.shoppingItemRepository.findOne({
              shoppingId: shopping.id,
              id,
            });

      await this.shoppingItemRepository.save({
        ...(currentShoppingItem ? currentShoppingItem : { shopping }),
        borrowerId,
        price,
        description,
        ppn: ppnItem,
        percentage: percentageItem * 100,
        delivery: deliveryItem,
        discount: discountItem,
        total: price + ppnItem + deliveryItem - discountItem,
      });
    }
  }
}
