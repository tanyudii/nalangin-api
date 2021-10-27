import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { FindConditions } from 'typeorm/find-options/FindConditions';

import { FindAllShoppingItemArg } from '../dto/args/find-all-shopping-item.arg';
import { ShoppingItem } from '../entities/shopping-item.entity';
import { ShoppingItemRepository } from '../repositories/shopping-item.repository';

@Injectable()
export class ShoppingItemsService {
  constructor(
    private readonly shoppingItemRepository: ShoppingItemRepository,
  ) {}

  async findAll(
    findAllShoppingItemArg: FindAllShoppingItemArg,
  ): Promise<ShoppingItem[]> {
    const { userIds, shoppingIds, borrowerIds, shoppingItemIds } =
      findAllShoppingItemArg;

    const condition: FindConditions<ShoppingItem> = {};

    if (borrowerIds !== undefined) {
      condition.borrowerId = In(borrowerIds);
    }

    if (shoppingItemIds !== undefined) {
      condition.id = In(shoppingItemIds);
    }

    return this.shoppingItemRepository.find({
      relations: ['shopping'],
      where: {
        ...condition,
        shopping: {
          ...(shoppingIds !== undefined ? { id: In(shoppingIds) } : {}),
          ...(userIds !== undefined ? { userId: In(userIds) } : {}),
        },
      },
    });
  }

  async findAllByShoppingIds(shoppingIds: string[]): Promise<ShoppingItem[]> {
    return this.shoppingItemRepository.find({
      where: {
        shoppingId: In(shoppingIds),
      },
    });
  }
}
