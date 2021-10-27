import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { DefaultMessage } from '../../../@graphql/types/default-message.type';
import { RegisterRequestOtpInput } from '../dto/register-request-otp.input';
import { RegisterInput } from '../dto/register.input';
import { RegistersService } from '../services/registers.service';

@Resolver()
export class RegistersResolver {
  constructor(private readonly registersService: RegistersService) {}

  @Mutation(() => DefaultMessage)
  async registerRequestOtp(
    @Args('registerRequestOtpInput')
    registerRequestOtpInput: RegisterRequestOtpInput,
  ): Promise<DefaultMessage> {
    return this.registersService.registerRequestOtp(registerRequestOtpInput);
  }

  @Mutation(() => DefaultMessage)
  async register(
    @Args('registerInput') registerInput: RegisterInput,
  ): Promise<DefaultMessage> {
    return this.registersService.register(registerInput);
  }
}
