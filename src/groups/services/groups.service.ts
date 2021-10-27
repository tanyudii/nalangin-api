import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateGroupInput } from '../dto/create-group.input';
import { UpdateGroupInput } from '../dto/update-group.input';
import { RoleType } from '../entities/group-user.entity';
import { Group } from '../entities/group.entity';
import { GroupUserRepository } from '../repositories/group-user.repository';
import { GroupRepository } from '../repositories/group.repository';

@Injectable()
export class GroupsService {
  constructor(
    private readonly groupRepository: GroupRepository,
    private readonly groupUserRepository: GroupUserRepository,
  ) {}

  async findAll(userId: string): Promise<Group[]> {
    return this.groupRepository.my(userId, 'groups').getMany();
  }

  async findOne(userId: string, id: string): Promise<Group> {
    const group = await this.groupRepository
      .my(userId, 'groups')
      .andWhere('groups.id = id', { id })
      .getOne();

    if (!group) {
      throw new NotFoundException();
    }

    return group;
  }

  async create(
    userId: string,
    createGroupInput: CreateGroupInput,
  ): Promise<Group> {
    const { name } = createGroupInput;

    const group = await this.groupRepository.save({
      name,
      role: RoleType.LEADER,
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
    const group = await this.groupRepository
      .my(userId, 'groups')
      .andWhere('groups.id = :id', { id })
      .getOne();

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
    const group = await this.groupRepository
      .my(userId, 'groups')
      .andWhere('groups.id = :id', { id })
      .getOne();

    if (!group) {
      throw new NotFoundException();
    }

    return this.groupRepository.softRemove(group);
  }

  async exit(userId: string, id: string): Promise<Group> {
    const groupUser = await this.groupUserRepository.findOne({
      relations: ['group'],
      where: { groupId: id, userId },
    });

    if (!groupUser) {
      throw new NotFoundException();
    }

    await this.groupUserRepository.softRemove(groupUser);

    return groupUser.group;
  }
}
