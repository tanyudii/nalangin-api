import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { UsersService } from '../../users/services/users.service';

@Injectable({ scope: Scope.REQUEST })
export class ShoppingsLoader {
  constructor(private readonly usersService: UsersService) {}

  public readonly batchUsers = new DataLoader(async (userIds: string[]) => {
    const users = await this.usersService.findAllByIds(userIds);
    const usersMap = new Map(users.map((user) => [user.id, user]));
    return userIds.map((userId) => usersMap.get(userId));
  });
}
