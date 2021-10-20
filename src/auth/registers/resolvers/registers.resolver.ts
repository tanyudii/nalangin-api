import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RegistersService } from '../services/registers.service';
import { RegisterMessage } from '../entities/register-message.entity';
import { RegisterInput } from '../dto/register.input';

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
