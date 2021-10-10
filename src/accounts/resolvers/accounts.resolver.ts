import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AccountsService } from '../services/accounts.service';
import { Account } from '../entities/account.entity';
import { CreateAccountInput } from '../dto/create-account.input';
import { UpdateAccountInput } from '../dto/update-account.input';
import { JwtGqlGuard } from '../../@common/guards/jwt-gql.guard';
import { IUser } from '../../@common/interfaces/user.interface';
import { CurrentUser } from '../../@common/decorators/current-user.decorator';

@Resolver(() => Account)
export class AccountsResolver {
  constructor(private readonly accountsService: AccountsService) {}

  @UseGuards(JwtGqlGuard)
  @Query(() => [Account], { name: 'accounts' })
  findAll(@CurrentUser() currentUser: IUser) {
    return this.accountsService.findAll(currentUser.id);
  }

  @UseGuards(JwtGqlGuard)
  @Query(() => Account, { name: 'account' })
  findOne(@CurrentUser() currentUser: IUser, @Args('id') id: string) {
    return this.accountsService.findOne(currentUser.id, id);
  }

  @UseGuards(JwtGqlGuard)
  @Mutation(() => Account)
  createAccount(
    @CurrentUser() currentUser: IUser,
    @Args('createAccountInput') createAccountInput: CreateAccountInput,
  ) {
    return this.accountsService.create(currentUser.id, createAccountInput);
  }

  @UseGuards(JwtGqlGuard)
  @Mutation(() => Account)
  updateAccount(
    @CurrentUser() currentUser: IUser,
    @Args('updateAccountInput') updateAccountInput: UpdateAccountInput,
  ) {
    return this.accountsService.update(
      currentUser.id,
      updateAccountInput.id,
      updateAccountInput,
    );
  }

  @UseGuards(JwtGqlGuard)
  @Mutation(() => Account)
  removeAccount(@CurrentUser() currentUser: IUser, @Args('id') id: string) {
    return this.accountsService.remove(currentUser.id, id);
  }
}
