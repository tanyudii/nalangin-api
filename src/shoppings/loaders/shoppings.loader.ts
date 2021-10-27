import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';

import { UsersService } from '../../users/services/users.service';
import { ShoppingItemsService } from '../services/shopping-items.service';
import { ShoppingsService } from '../services/shoppings.service';

@Injectable({ scope: Scope.REQUEST })
export class ShoppingsLoader {
  constructor(
    private readonly usersService: UsersService,
    private readonly shoppingsService: ShoppingsService,
    private readonly shoppingItemsService: ShoppingItemsService,
  ) {}

  public readonly batchUsers = new DataLoader(async (userIds: string[]) => {
    const users = await this.usersService.findAllByIds(userIds);
    return userIds.map((userId) => users.find((user) => user.id === userId));
  });

  public readonly batchShoppingItems = new DataLoader(
    async (shoppingIds: string[]) => {
      const shoppingItems =
        await this.shoppingItemsService.findAllByShoppingIds(shoppingIds);

      return shoppingIds.map((shoppingId) =>
        shoppingItems.filter(
          (shoppingItem) => shoppingItem.shoppingId === shoppingId,
        ),
      );
    },
  );
}
