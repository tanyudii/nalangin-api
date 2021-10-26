import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CurrentUser } from '../../@common/decorators/current-user.decorator';
import { JwtGqlGuard } from '../../@common/guards/jwt-gql.guard';
import { IUser } from '../../@common/interfaces/user.interface';
import { CreateGroupInput } from '../dto/create-group.input';
import { UpdateGroupInput } from '../dto/update-group.input';
import { Group } from '../entities/group.entity';
import { GroupsService } from '../services/groups.service';

@Resolver(() => Group)
export class GroupsResolver {
  constructor(private readonly groupsService: GroupsService) {}

  @UseGuards(JwtGqlGuard)
  @Mutation(() => Group)
  async createGroup(
    @CurrentUser() user: IUser,
    @Args('createGroupInput') createGroupInput: CreateGroupInput,
  ): Promise<Group> {
    return this.groupsService.create(user.id, createGroupInput);
  }

  // @UseGuards(JwtGqlGuard)
  // @Query(() => [Group], { name: 'groups' })
  // async findAll(@CurrentUser() user: IUser): Promise<Group[]> {
  //   return this.groupsService.findAll(user.id);
  // }
  //
  // @UseGuards(JwtGqlGuard)
  // @Query(() => Group, { name: 'group' })
  // async findOne(
  //   @CurrentUser() user: IUser,
  //   @Args('id') id: string,
  // ): Promise<Group> {
  //   return this.groupsService.findOne(user.id, id);
  // }

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
}
