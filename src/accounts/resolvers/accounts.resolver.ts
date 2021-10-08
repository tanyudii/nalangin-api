import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AccountsService } from '../services/accounts.service';
import { Account } from '../entities/account.entity';
import { CreateAccountInput } from '../dto/create-account.input';
import { UpdateAccountInput } from '../dto/update-account.input';

@Resolver(() => Account)
export class AccountsResolver {
  constructor(private readonly accountsService: AccountsService) {}

  @Query(() => [Account], { name: 'accounts' })
  findAll() {
    return this.accountsService.findAll();
  }

  @Query(() => Account, { name: 'account' })
  findOne(@Args('id') id: string) {
    return this.accountsService.findOne(id);
  }

  @Mutation(() => Account)
  createAccount(
    @Args('createAccountInput') createAccountInput: CreateAccountInput,
  ) {
    return this.accountsService.create(createAccountInput);
  }

  @Mutation(() => Account)
  updateAccount(
    @Args('updateAccountInput') updateAccountInput: UpdateAccountInput,
  ) {
    return this.accountsService.update(
      updateAccountInput.id,
      updateAccountInput,
    );
  }

  @Mutation(() => Account)
  removeAccount(@Args('id') id: string) {
    return this.accountsService.remove(id);
  }
}
