import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';

import { UsersService } from '../../users/services/users.service';
import { GroupUsersService } from '../services/group-users.service';

@Injectable({ scope: Scope.REQUEST })
export class GroupsLoader {
  constructor(
    private readonly groupUsersService: GroupUsersService,
    private readonly usersService: UsersService,
  ) {}

  public readonly batchUsersOfGroupUsers = new DataLoader(
    async (groupIds: string[]) => {
      const groupUsers = await this.groupUsersService.findAllByGroupIds(
        groupIds,
      );

      const users = await this.usersService.findAllByIDs(
        groupUsers.map((groupUser) => groupUser.userId),
      );

      return groupIds.map((groupId) => {
        const listGroupUsers = groupUsers.filter(
          (groupUser) => groupUser.groupId === groupId,
        );

        return listGroupUsers.map((groupUser) =>
          users.find((user) => user.id === groupUser.userId),
        );
      });
    },
  );

  public readonly batchGroupUsers = new DataLoader(
    async (groupIds: string[]) => {
      const groupUsers = await this.groupUsersService.findAllByGroupIds(
        groupIds,
      );

      const users = await this.usersService.findAllByIDs(
        groupUsers.map((groupUser) => groupUser.userId),
      );

      return groupIds.map((groupId) => {
        const listGroupUsers = groupUsers.filter(
          (groupUser) => groupUser.groupId === groupId,
        );

        return listGroupUsers.map((groupUser) => {
          groupUser.user = users.find((user) => user.id == groupUser.userId);
          return groupUser;
        });
      });
    },
  );
}
