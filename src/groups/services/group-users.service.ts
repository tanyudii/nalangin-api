import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { FindConditions } from 'typeorm/find-options/FindConditions';

import { FindAllGroupUserArg } from '../dto/args/find-all-group-user.arg';
import { GroupUser } from '../entities/group-user.entity';
import { GroupUserRepository } from '../repositories/group-user.repository';

@Injectable()
export class GroupUsersService {
  constructor(private readonly groupUserRepository: GroupUserRepository) {}

  async findAll(
    findAllGroupUserArg: FindAllGroupUserArg,
  ): Promise<GroupUser[]> {
    const { groupIds, userIds } = findAllGroupUserArg;

    const condition: FindConditions<GroupUser> = {};

    if (groupIds !== undefined) {
      condition.groupId = In(groupIds);
    }

    if (userIds !== undefined) {
      condition.userId = In(userIds);
    }

    return this.groupUserRepository.find({
      relations: ['group'],
      where: condition,
    });
  }
}
