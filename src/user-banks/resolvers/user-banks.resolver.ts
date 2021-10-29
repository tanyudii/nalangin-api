import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CurrentUser } from '../../@common/decorators/current-user.decorator';
import { JwtGqlGuard } from '../../@common/guards/jwt-gql.guard';
import { IUser } from '../../@common/interfaces/user.interface';
import { IUserBank } from '../../@interfaces/user-banks/entities/user-bank.entity';
import { IUserBanksResolver } from '../../@interfaces/user-banks/resolvers/user-banks.resolver';
import { CreateUserBankInput } from '../dto/create-user-bank.input';
import { UpdateUserBankInput } from '../dto/update-user-bank.input';
import { UserBank } from '../entities/user-bank.entity';
import { UserBanksService } from '../services/user-banks.service';

@Resolver(() => UserBank)
export class UserBanksResolver implements IUserBanksResolver {
  constructor(private readonly userBanksService: UserBanksService) {}

  @UseGuards(JwtGqlGuard)
  @Mutation(() => UserBank)
  async createUserBank(
    @CurrentUser() currentUser: IUser,
    @Args('createUserBankInput') createUserBankInput: CreateUserBankInput,
  ): Promise<IUserBank> {
    return this.userBanksService.create(currentUser.id, createUserBankInput);
  }

  @UseGuards(JwtGqlGuard)
  @Query(() => [UserBank], { name: 'userBanks' })
  async findAll(@CurrentUser() currentUser: IUser): Promise<IUserBank[]> {
    return this.userBanksService.findAll(currentUser.id);
  }

  @UseGuards(JwtGqlGuard)
  @Query(() => UserBank, { name: 'userBank' })
  async findOne(
    @CurrentUser() currentUser: IUser,
    @Args('id') id: string,
  ): Promise<IUserBank> {
    return this.userBanksService.findOne(currentUser.id, id);
  }

  @UseGuards(JwtGqlGuard)
  @Mutation(() => UserBank)
  async updateUserBank(
    @CurrentUser() currentUser: IUser,
    @Args('updateUserBankInput') updateUserBankInput: UpdateUserBankInput,
  ): Promise<IUserBank> {
    return this.userBanksService.update(
      currentUser.id,
      updateUserBankInput.id,
      updateUserBankInput,
    );
  }

  @UseGuards(JwtGqlGuard)
  @Mutation(() => UserBank)
  async removeUserBank(
    @CurrentUser() currentUser: IUser,
    @Args('id') id: string,
  ): Promise<IUserBank> {
    return this.userBanksService.remove(currentUser.id, id);
  }
}
