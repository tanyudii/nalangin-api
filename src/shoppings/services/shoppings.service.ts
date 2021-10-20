import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateShoppingInput } from '../dto/create-shopping.input';
import { UpdateShoppingInput } from '../dto/update-shopping.input';
import { Shopping } from '../entities/shopping.entity';
import { Repository } from 'typeorm';
import { ShoppingItem } from '../entities/shopping-items.entity';

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
    const shopping = await this.shoppingRepository.findOne({
      where: { userId, id },
      relations: ['shoppingItems'],
    });

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

    const shopping = await this.shoppingRepository.save({
      userId,
      date,
      store,
      isPpn,
      delivery,
      discount,
      ppn: 0,
      grandTotal: 0,
    });

    for (const shoppingItem of shoppingItems) {
      const { borrowerId, price, description } = shoppingItem;
      await this.shoppingItemRepository.save({
        shopping: shopping,
        borrowerId,
        price,
        description,
        percentage: 0,
        delivery: 0,
        discount: 0,
        ppn: 0,
        grandTotal: 0,
      });
    }

    return this.findOne(userId, shopping.id);
  }

  async update(
    userId: string,
    id: string,
    updateShoppingInput: UpdateShoppingInput,
  ): Promise<Shopping> {
    const shopping = await this.shoppingRepository.findOne({
      where: { userId, id },
      relations: ['shoppingItems'],
    });

    if (!shopping) {
      throw new NotFoundException();
    }

    return shopping;
    // const { bankName, bankNumber } = updateShoppingInput;
    // return this.userBankRepository.save({
    //   ...userBank,
    //   userId,
    //   bankName,
    //   bankNumber,
    // });
  }

  async remove(userId: string, id: string): Promise<Shopping> {
    const shopping = await this.shoppingRepository.findOne({
      where: { userId, id },
      relations: ['shoppingItems'],
    });

    if (!shopping) {
      throw new NotFoundException();
    }

    await this.shoppingRepository.softDelete({ id });

    return shopping;
  }
}
