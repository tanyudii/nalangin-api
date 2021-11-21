import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RegisterInput } from '../dto/register.input';
import { RegistersService } from '../services/registers.service';
import { DefaultMessageResource } from '../../../@common/graphql/types/default-message-resource.type';

@Resolver()
export class RegistersResolver {
  constructor(private readonly registersService: RegistersService) {}

  @Mutation(() => DefaultMessageResource)
  async register(
    @Args('registerInput') registerInput: RegisterInput,
  ): Promise<DefaultMessageResource> {
    const data = await this.registersService.register(registerInput);
    return new DefaultMessageResource({ data });
  }
}
