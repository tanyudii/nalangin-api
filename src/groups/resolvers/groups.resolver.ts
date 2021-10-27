import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { CurrentUser } from '../../@common/decorators/current-user.decorator';
import { JwtGqlGuard } from '../../@common/guards/jwt-gql.guard';
import { IUser } from '../../@common/interfaces/user.interface';
import { User } from '../../users/entities/user.entity';
import { CreateGroupInput } from '../dto/create-group.input';
import { InviteGroupUserInput } from '../dto/invite-group-user.input';
import { RemoveGroupUserInput } from '../dto/remove-group-user.input';
import { UpdateGroupInput } from '../dto/update-group.input';
import { GroupUser } from '../entities/group-user.entity';
import { Group } from '../entities/group.entity';
import { GroupsLoader } from '../loaders/groups.loader';
import { GroupsService } from '../services/groups.service';

@Resolver(() => Group)
export class GroupsResolver {
  constructor(
    private readonly groupsService: GroupsService,
    private readonly groupsLoader: GroupsLoader,
  ) {}

  @UseGuards(JwtGqlGuard)
  @Mutation(() => Group)
  async createGroup(
    @CurrentUser() user: IUser,
    @Args('createGroupInput') createGroupInput: CreateGroupInput,
  ): Promise<Group> {
    return this.groupsService.create(user.id, createGroupInput);
  }

  @UseGuards(JwtGqlGuard)
  @Query(() => [Group], { name: 'groups' })
  async findAll(@CurrentUser() user: IUser): Promise<Group[]> {
    return this.groupsService.findAll(user.id);
  }

  @UseGuards(JwtGqlGuard)
  @Query(() => Group, { name: 'group' })
  async findOne(
    @CurrentUser() user: IUser,
    @Args('id') id: string,
  ): Promise<Group> {
    return this.groupsService.findOne(user.id, id);
  }

  @UseGuards(JwtGqlGuard)
  @Mutation(() => Group)
  async updateGroup(
    @CurrentUser() user: IUser,
    @Args('updateGroupInput') updateGroupInput: UpdateGroupInput,
  ): Promise<Group> {
    return this.groupsService.update(
      user.id,
      updateGroupInput.id,
      updateGroupInput,
    );
  }

  @UseGuards(JwtGqlGuard)
  @Mutation(() => Group)
  async removeGroup(
    @CurrentUser() user: IUser,
    @Args('id') id: string,
  ): Promise<Group> {
    return this.groupsService.remove(user.id, id);
  }

  @UseGuards(JwtGqlGuard)
  @Mutation(() => Group)
  async exitGroup(
    @CurrentUser() user: IUser,
    @Args('id') id: string,
  ): Promise<Group> {
    return this.groupsService.exit(user.id, id);
  }

  @UseGuards(JwtGqlGuard)
  @Mutation(() => Group)
  async inviteGroupUser(
    @CurrentUser() user: IUser,
    @Args('inviteGroupUserInput') inviteGroupUserInput: InviteGroupUserInput,
  ): Promise<Group> {
    return this.groupsService.inviteGroupUser(
      user.id,
      inviteGroupUserInput.id,
      inviteGroupUserInput,
    );
  }

  @UseGuards(JwtGqlGuard)
  @Mutation(() => Group)
  async removeGroupUser(
    @CurrentUser() user: IUser,
    @Args('removeGroupUserInput') removeGroupUserInput: RemoveGroupUserInput,
  ): Promise<Group> {
    return this.groupsService.removeGroupUser(
      user.id,
      removeGroupUserInput.id,
      removeGroupUserInput,
    );
  }

  @ResolveField('users', () => [User])
  async getUsers(@Parent() group: Group): Promise<User[]> {
    const { id } = group;
    return this.groupsLoader.batchUsersOfGroupUsers.load(id);
  }

  @ResolveField('groupUsers', () => [GroupUser])
  async getGroupUsers(@Parent() group: Group): Promise<GroupUser[]> {
    const { id } = group;
    return this.groupsLoader.batchGroupUsers.load(id);
  }
}
