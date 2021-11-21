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
import { CreateShoppingInput } from '../dto/create-shopping.input';
import { UpdateShoppingInput } from '../dto/update-shopping.input';
import { ShoppingItem } from '../entities/shopping-item.entity';
import { Shopping } from '../entities/shopping.entity';
import { ShoppingsLoader } from '../loaders/shoppings.loader';
import { ShoppingsService } from '../services/shoppings.service';
import { ShoppingResource } from '../resources/shopping.resource';
import { ShoppingCollection } from '../resources/shopping.collection';
import { PaginationArg } from '../../@common/graphql/args/pagination.arg';

@Resolver(() => ShoppingResource)
export class ShoppingsResolver {
  constructor(
    private readonly shoppingsService: ShoppingsService,
    private readonly shoppingsLoader: ShoppingsLoader,
  ) {}

  @UseGuards(JwtGqlGuard)
  @Mutation(() => ShoppingResource)
  async createShopping(
    @GqlCurrentUser() currentUser: IUser,
    @Args('createShoppingInput') createShoppingInput: CreateShoppingInput,
  ): Promise<ShoppingResource> {
    const data = await this.shoppingsService.create(
      currentUser.id,
      createShoppingInput,
    );
    return new ShoppingResource({ data });
  }

  @UseGuards(JwtGqlGuard)
  @Query(() => ShoppingCollection, { name: 'shoppings' })
  async findAll(
    @GqlCurrentUser() currentUser: IUser,
    @Args() paginationArg: PaginationArg,
  ): Promise<ShoppingCollection> {
    const { items: data, meta } = await this.shoppingsService.findAllPagination(
      currentUser.id,
      paginationArg,
    );
    return new ShoppingCollection({ data, meta });
  }

  @UseGuards(JwtGqlGuard)
  @Query(() => ShoppingResource, { name: 'shopping' })
  async findOne(
    @GqlCurrentUser() currentUser: IUser,
    @Args('id') id: string,
  ): Promise<ShoppingResource> {
    const data = await this.shoppingsService.findOne(currentUser.id, id);
    return new ShoppingResource({ data });
  }

  @UseGuards(JwtGqlGuard)
  @Mutation(() => ShoppingResource)
  async updateShopping(
    @GqlCurrentUser() currentUser: IUser,
    @Args('updateShoppingInput') updateShoppingInput: UpdateShoppingInput,
  ): Promise<ShoppingResource> {
    const data = await this.shoppingsService.update(
      currentUser.id,
      updateShoppingInput.id,
      updateShoppingInput,
    );
    return new ShoppingResource({ data });
  }

  @UseGuards(JwtGqlGuard)
  @Mutation(() => ShoppingResource)
  async removeShopping(
    @GqlCurrentUser() currentUser: IUser,
    @Args('id') id: string,
  ): Promise<ShoppingResource> {
    const data = await this.shoppingsService.remove(currentUser.id, id);
    return new ShoppingResource({ data });
  }

  @ResolveField('user', () => User)
  async getUser(@Parent() shopping: Shopping): Promise<User> {
    const { userId } = shopping;
    return this.shoppingsLoader.batchUsers.load(userId);
  }

  @ResolveField('shoppingItems', () => [ShoppingItem])
  async getShoppingItems(
    @Parent() shopping: Shopping,
  ): Promise<ShoppingItem[]> {
    const { id } = shopping;
    return this.shoppingsLoader.batchShoppingItems.load(id);
  }
}
