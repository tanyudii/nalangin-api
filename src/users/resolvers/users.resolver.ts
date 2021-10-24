import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { JwtGqlGuard } from '../../@common/guards/jwt-gql.guard';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGqlGuard)
  @Query(() => [User], { name: 'users' })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtGqlGuard)
  @Query(() => User, { name: 'user' })
  async findOne(@Args('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtGqlGuard)
  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.usersService.create(createUserInput);
  }

  @UseGuards(JwtGqlGuard)
  @Mutation(() => User)
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @UseGuards(JwtGqlGuard)
  @Mutation(() => User)
  async removeUser(@Args('id') id: string): Promise<User> {
    return this.usersService.remove(id);
  }
}
