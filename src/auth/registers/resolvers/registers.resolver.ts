import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { RegisterRequestOtpInput } from '../dto/register-request-otp.input';
import { RegisterInput } from '../dto/register.input';
import { RegisterMessage } from '../entities/register-message.entity';
import { RegistersService } from '../services/registers.service';

@Resolver(() => RegisterMessage)
export class RegistersResolver {
  constructor(private readonly registersService: RegistersService) {}

  @Mutation(() => RegisterMessage)
  async registerRequestOtp(
    @Args('registerRequestOtpInput')
    registerRequestOtpInput: RegisterRequestOtpInput,
  ): Promise<RegisterMessage> {
    return this.registersService.registerRequestOtp(registerRequestOtpInput);
  }

  @Mutation(() => RegisterMessage)
  async register(
    @Args('registerInput') registerInput: RegisterInput,
  ): Promise<RegisterMessage> {
    return this.registersService.register(registerInput);
  }
}
