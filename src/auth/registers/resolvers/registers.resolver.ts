import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { DefaultMessage } from '../../../@common/graphql/types/default-message.type';
import { RegisterInput } from '../dto/register.input';
import { RegistersService } from '../services/registers.service';

@Resolver()
export class RegistersResolver {
  constructor(private readonly registersService: RegistersService) {}

  @Mutation(() => DefaultMessage)
  async register(
    @Args('registerInput') registerInput: RegisterInput,
  ): Promise<DefaultMessage> {
    return this.registersService.register(registerInput);
  }
}
