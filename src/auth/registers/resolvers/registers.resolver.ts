import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { RegisterInput } from '../dto/register.input';
import { RegisterMessage } from '../entities/register-message.entity';
import { RegistersService } from '../services/registers.service';

@Resolver(() => RegisterMessage)
export class RegistersResolver {
  constructor(private readonly registersService: RegistersService) {}

  @Mutation(() => RegisterMessage)
  async register(
    @Args('registerInput') registerInput: RegisterInput,
  ): Promise<RegisterMessage> {
    return this.registersService.register(registerInput);
  }
}
