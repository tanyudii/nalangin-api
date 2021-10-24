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
import { CreateShoppingInput } from '../dto/create-shopping.input';
import { UpdateShoppingInput } from '../dto/update-shopping.input';
import { ShoppingItem } from '../entities/shopping-items.entity';
import { Shopping } from '../entities/shopping.entity';
import { ShoppingsLoader } from '../loaders/shoppings.loader';
import { ShoppingsService } from '../services/shoppings.service';

@Resolver(() => Shopping)
export class ShoppingsResolver {
  constructor(
    private readonly shoppingsService: ShoppingsService,
    private readonly shoppingsLoader: ShoppingsLoader,
  ) {}

  @UseGuards(JwtGqlGuard)
  @Mutation(() => Shopping)
  async createShopping(
    @CurrentUser() currentUser: IUser,
    @Args('createShoppingInput') createShoppingInput: CreateShoppingInput,
  ): Promise<Shopping> {
    return this.shoppingsService.create(currentUser.id, createShoppingInput);
  }

  @UseGuards(JwtGqlGuard)
  @Query(() => [Shopping], { name: 'shoppings' })
  async findAll(@CurrentUser() currentUser: IUser): Promise<Shopping[]> {
    return this.shoppingsService.findAll(currentUser.id);
  }

  @UseGuards(JwtGqlGuard)
  @Query(() => Shopping, { name: 'shopping' })
  async findOne(
    @CurrentUser() currentUser: IUser,
    @Args('id') id: string,
  ): Promise<Shopping> {
    return this.shoppingsService.findOne(currentUser.id, id);
  }

  @UseGuards(JwtGqlGuard)
  @Mutation(() => Shopping)
  async updateShopping(
    @CurrentUser() currentUser: IUser,
    @Args('updateShoppingInput') updateShoppingInput: UpdateShoppingInput,
  ): Promise<Shopping> {
    return this.shoppingsService.update(
      currentUser.id,
      updateShoppingInput.id,
      updateShoppingInput,
    );
  }

  @UseGuards(JwtGqlGuard)
  @Mutation(() => Shopping)
  async removeShopping(
    @CurrentUser() currentUser: IUser,
    @Args('id') id: string,
  ): Promise<Shopping> {
    return this.shoppingsService.remove(currentUser.id, id);
  }

  @ResolveField('user', () => User)
  async getUser(@Parent() shopping: Shopping): Promise<User> {
    const { userId } = shopping;
    return this.shoppingsLoader.batchUsers.load(userId);
  }

  @ResolveField('shoppingItems', () => [ShoppingItem])
  async getShoppingItem(@Parent() shopping: Shopping) {
    const { id } = shopping;
    return this.shoppingsLoader.batchShoppingItems.load(id);
  }
}