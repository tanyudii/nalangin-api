import { Args, Query, Resolver } from '@nestjs/graphql';

import { DefaultObject } from '../../@common/graphql/types/default-object.type';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => DefaultObject)
  async getUserIDByPhoneNumber(
    @Args('phoneNumber') phoneNumber: string,
  ): Promise<User> {
    return this.usersService.findOneByPhoneNumber(phoneNumber);
  }

  @Query(() => DefaultObject)
  async getUserIDByEmail(@Args('email') email: string): Promise<User> {
    return this.usersService.findOneByEmail(email);
  }
}
