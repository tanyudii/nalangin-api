import { Args, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from '../services/users.service';
import { DefaultObjectResource } from '../../@common/graphql/types/default-object-resource.type';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => DefaultObjectResource)
  async getUserIDByPhoneNumber(
    @Args('phoneNumber') phoneNumber: string,
  ): Promise<DefaultObjectResource> {
    const data = await this.usersService.findOneByPhoneNumber(phoneNumber);
    return new DefaultObjectResource({ data });
  }

  @Query(() => DefaultObjectResource)
  async getUserIDByEmail(
    @Args('email') email: string,
  ): Promise<DefaultObjectResource> {
    const data = await this.usersService.findOneByEmail(email);
    return new DefaultObjectResource({ data });
  }
}
