import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { GqlCurrentUser } from '../../@common/decorators/current-user.decorator';
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
import { GroupResource } from '../resources/group.resource';
import { PaginationArg } from '../../@common/graphql/args/pagination.arg';
import { GroupCollection } from '../resources/group.collection';

@Resolver(() => Group)
export class GroupsResolver {
  constructor(
    private readonly groupsService: GroupsService,
    private readonly groupsLoader: GroupsLoader,
  ) {}

  @UseGuards(JwtGqlGuard)
  @Mutation(() => GroupResource)
  async createGroup(
    @GqlCurrentUser() user: IUser,
    @Args('createGroupInput') createGroupInput: CreateGroupInput,
  ): Promise<GroupResource> {
    const data = await this.groupsService.create(user.id, createGroupInput);
    return new GroupResource({ data });
  }

  @UseGuards(JwtGqlGuard)
  @Query(() => GroupCollection, { name: 'groups' })
  async findAll(
    @GqlCurrentUser() user: IUser,
    @Args() paginationArg: PaginationArg,
  ): Promise<GroupCollection> {
    const { limit, page } = paginationArg;
    const { items: data, meta } = await this.groupsService.findAllPagination(
      user.id,
      { limit, page },
    );

    return new GroupCollection({ data, meta });
  }

  @UseGuards(JwtGqlGuard)
  @Query(() => GroupResource, { name: 'group' })
  async findOne(
    @GqlCurrentUser() user: IUser,
    @Args('id') id: string,
  ): Promise<GroupResource> {
    const data = await this.groupsService.findOne(user.id, id);
    return new GroupResource({ data });
  }

  @UseGuards(JwtGqlGuard)
  @Mutation(() => GroupResource)
  async updateGroup(
    @GqlCurrentUser() user: IUser,
    @Args('updateGroupInput') updateGroupInput: UpdateGroupInput,
  ): Promise<GroupResource> {
    const data = await this.groupsService.update(
      user.id,
      updateGroupInput.id,
      updateGroupInput,
    );
    return new GroupResource({ data });
  }

  @UseGuards(JwtGqlGuard)
  @Mutation(() => GroupResource)
  async removeGroup(
    @GqlCurrentUser() user: IUser,
    @Args('id') id: string,
  ): Promise<GroupResource> {
    const data = await this.groupsService.remove(user.id, id);
    return new GroupResource({ data });
  }

  @UseGuards(JwtGqlGuard)
  @Mutation(() => GroupResource)
  async exitGroup(
    @GqlCurrentUser() user: IUser,
    @Args('id') id: string,
  ): Promise<GroupResource> {
    const data = await this.groupsService.exit(user.id, id);
    return new GroupResource({ data });
  }

  @UseGuards(JwtGqlGuard)
  @Mutation(() => GroupResource)
  async inviteGroupUser(
    @GqlCurrentUser() user: IUser,
    @Args('inviteGroupUserInput') inviteGroupUserInput: InviteGroupUserInput,
  ): Promise<GroupResource> {
    const data = await this.groupsService.inviteGroupUser(
      user.id,
      inviteGroupUserInput.id,
      inviteGroupUserInput,
    );
    return new GroupResource({ data });
  }

  @UseGuards(JwtGqlGuard)
  @Mutation(() => GroupResource)
  async removeGroupUser(
    @GqlCurrentUser() user: IUser,
    @Args('removeGroupUserInput') removeGroupUserInput: RemoveGroupUserInput,
  ): Promise<GroupResource> {
    const data = await this.groupsService.removeGroupUser(
      user.id,
      removeGroupUserInput.id,
      removeGroupUserInput,
    );
    return new GroupResource({ data });
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
