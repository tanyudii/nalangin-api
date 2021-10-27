import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';

import { UsersService } from '../../users/services/users.service';

@Injectable({ scope: Scope.REQUEST })
export class GroupsLoader {
  constructor(private readonly usersService: UsersService) {}

  public readonly batchUsers = new DataLoader(async (userIds: string[]) => {
    const users = await this.usersService.findAllByIds(userIds);
    return userIds.map((userId) => users.find((user) => user.id === userId));
  });
}
