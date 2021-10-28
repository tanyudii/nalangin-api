import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateGroupInput } from '../dto/create-group.input';
import { InviteGroupUserInput } from '../dto/invite-group-user.input';
import { RemoveGroupUserInput } from '../dto/remove-group-user.input';
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
      .andWhere('groups.id = :id', { id })
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
      role: RoleType.TRIBAL_CHIEF,
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

  async inviteGroupUser(
    userId: string,
    id: string,
    inviteGroupUserInput: InviteGroupUserInput,
  ): Promise<Group> {
    const group = await this.groupRepository
      .my(userId, 'groups')
      .andWhere('groups.id = :id', { id })
      .getOne();

    if (!group) {
      throw new NotFoundException();
    }

    const { userId: invitedUserId } = inviteGroupUserInput;
    const currentUserGroup = await this.groupUserRepository.findOne({
      userId: invitedUserId,
      groupId: id,
    });

    if (currentUserGroup) {
      throw new BadRequestException('user has already in group.');
    }

    await this.groupUserRepository.save({
      userId: invitedUserId,
      groupId: id,
      role: RoleType.VILLAGER,
    });

    return group;
  }

  async removeGroupUser(
    userId: string,
    id: string,
    removeGroupUserInput: RemoveGroupUserInput,
  ): Promise<Group> {
    const group = await this.groupRepository
      .my(userId, 'groups')
      .andWhere('groups.id = :id', { id })
      .getOne();

    if (!group) {
      throw new NotFoundException();
    }

    const { userId: invitedUserId } = removeGroupUserInput;
    const currentUserGroup = await this.groupUserRepository.findOne({
      userId: invitedUserId,
      groupId: id,
    });

    if (!currentUserGroup) {
      throw new BadRequestException('user is not member of group.');
    } else if (currentUserGroup.userId === userId) {
      throw new BadRequestException('you cannot remove yourself.');
    } else if (currentUserGroup.role === RoleType.TRIBAL_CHIEF) {
      throw new BadRequestException('you cannot remove leader.');
    }

    await this.groupUserRepository.softRemove(currentUserGroup);

    return group;
  }
}
