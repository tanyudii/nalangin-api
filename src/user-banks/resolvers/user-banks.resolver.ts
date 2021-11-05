import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GqlCurrentUser } from '../../@common/decorators/current-user.decorator';
import { JwtGqlGuard } from '../../@common/guards/jwt-gql.guard';
import { IUser } from '../../@common/interfaces/user.interface';
import { CreateUserBankInput } from '../dto/create-user-bank.input';
import { UpdateUserBankInput } from '../dto/update-user-bank.input';
import { UserBank } from '../entities/user-bank.entity';
import { UserBanksService } from '../services/user-banks.service';

@Resolver(() => UserBank)
export class UserBanksResolver {
  constructor(private readonly userBanksService: UserBanksService) {}

  @UseGuards(JwtGqlGuard)
  @Mutation(() => UserBank)
  async createUserBank(
    @GqlCurrentUser() currentUser: IUser,
    @Args('createUserBankInput') createUserBankInput: CreateUserBankInput,
  ): Promise<UserBank> {
    return this.userBanksService.create(currentUser.id, createUserBankInput);
  }

  @UseGuards(JwtGqlGuard)
  @Query(() => [UserBank], { name: 'userBanks' })
  async findAll(@GqlCurrentUser() currentUser: IUser): Promise<UserBank[]> {
    return this.userBanksService.findAll(currentUser.id);
  }

  @UseGuards(JwtGqlGuard)
  @Query(() => UserBank, { name: 'userBank' })
  async findOne(
    @GqlCurrentUser() currentUser: IUser,
    @Args('id') id: string,
  ): Promise<UserBank> {
    return this.userBanksService.findOne(currentUser.id, id);
  }

  @UseGuards(JwtGqlGuard)
  @Mutation(() => UserBank)
  async updateUserBank(
    @GqlCurrentUser() currentUser: IUser,
    @Args('updateUserBankInput') updateUserBankInput: UpdateUserBankInput,
  ): Promise<UserBank> {
    return this.userBanksService.update(
      currentUser.id,
      updateUserBankInput.id,
      updateUserBankInput,
    );
  }

  @UseGuards(JwtGqlGuard)
  @Mutation(() => UserBank)
  async removeUserBank(
    @GqlCurrentUser() currentUser: IUser,
    @Args('id') id: string,
  ): Promise<UserBank> {
    return this.userBanksService.remove(currentUser.id, id);
  }
}
