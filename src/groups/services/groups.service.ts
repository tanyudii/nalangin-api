import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateGroupInput } from '../dto/create-group.input';
import { UpdateGroupInput } from '../dto/update-group.input';
import { GroupUser } from '../entities/group-user.entity';
import { Group } from '../entities/group.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(GroupUser)
    private readonly groupUserRepository: Repository<GroupUser>,
  ) {}

  async create(
    userId: string,
    createGroupInput: CreateGroupInput,
  ): Promise<Group> {
    const { name } = createGroupInput;

    const group = await this.groupRepository.save({
      name,
    });

    await this.groupUserRepository.save({
      group,
      userId,
    });

    return group;
  }

  async update(
    userId: string,
    id: string,
    updateGroupInput: UpdateGroupInput,
  ): Promise<Group> {
    const group = await this.groupRepository.findOne({
      relations: ['groupUsers'],
      where: { id, groupUsers: { userId } },
    });

    if (!group) {
      throw new NotFoundException();
    }

    const { name } = updateGroupInput;
    return this.groupRepository.save({
      ...group,
      name,
    });
  }

  async remove(userId: string, id: string): Promise<Group> {
    const group = await this.groupRepository.findOne({
      relations: ['groupUsers'],
      where: { id, groupUsers: { userId } },
    });

    if (!group) {
      throw new NotFoundException();
    }

    await this.groupRepository.softDelete({ id });

    return group;
  }

  async exit(userId: string, id: string): Promise<Group> {
    const groupUser = await this.groupUserRepository.findOne({
      relations: ['group'],
      where: { groupId: id, userId },
    });

    if (!groupUser) {
      throw new NotFoundException();
    }

    await this.groupUserRepository.softDelete({ id: groupUser.id });

    return groupUser.group;
  }
}
