import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtGqlGuard } from '../../@common/guards/jwt-gql.guard';
import { CurrentUser } from '../../@common/decorators/current-user.decorator';
import { IUser } from '../../@common/interfaces/user.interface';
import { UserBanksService } from '../services/user-banks.service';
import { UserBanksLoader } from '../loaders/user-banks.loader';
import { UserBank } from '../entities/user-bank.entity';
import { CreateUserBankInput } from '../dto/create-user-bank.input';
import { UpdateUserBankInput } from '../dto/update-user-bank.input';
import { User } from '../../users/entities/user.entity';

@Resolver(() => UserBank)
export class UserBanksResolver {
  constructor(
    private readonly userBanksService: UserBanksService,
    private readonly userBanksLoader: UserBanksLoader,
  ) {}

  @UseGuards(JwtGqlGuard)
  @Mutation(() => UserBank)
  async createUserBank(
    @CurrentUser() currentUser: IUser,
    @Args('createUserBankInput') createUserBankInput: CreateUserBankInput,
  ): Promise<UserBank> {
    return this.userBanksService.create(currentUser.id, createUserBankInput);
  }

  @UseGuards(JwtGqlGuard)
  @Query(() => [UserBank], { name: 'userBanks' })
  async findAll(@CurrentUser() currentUser: IUser): Promise<UserBank[]> {
    return this.userBanksService.findAll(currentUser.id);
  }

  @UseGuards(JwtGqlGuard)
  @Query(() => UserBank, { name: 'userBank' })
  async findOne(
    @CurrentUser() currentUser: IUser,
    @Args('id') id: string,
  ): Promise<UserBank> {
    return this.userBanksService.findOne(currentUser.id, id);
  }

  @UseGuards(JwtGqlGuard)
  @Mutation(() => UserBank)
  async updateUserBank(
    @CurrentUser() currentUser: IUser,
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
    @CurrentUser() currentUser: IUser,
    @Args('id') id: string,
  ): Promise<UserBank> {
    return this.userBanksService.remove(currentUser.id, id);
  }

  @ResolveField('user', () => User)
  async getAuthor(@Parent() userBank: UserBank): Promise<User> {
    const { userId } = userBank;
    return this.userBanksLoader.batchUsers.load(userId);
  }
}
