import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { DefaultMessage } from '../../../@graphql/types/default-message.type';
import { RegisterOtpInput } from '../dto/register-otp.input';
import { RegisterInput } from '../dto/register.input';
import { RegistersService } from '../services/registers.service';
import { RegisterOtpResponse } from '../types/register-otp-response.type';

@Resolver()
export class RegistersResolver {
  constructor(private readonly registersService: RegistersService) {}

  @Mutation(() => RegisterOtpResponse)
  async registerOtp(
    @Args('registerOtpInput')
    registerOtpInput: RegisterOtpInput,
  ): Promise<RegisterOtpResponse> {
    return this.registersService.registerOtp(registerOtpInput);
  }

  @Mutation(() => DefaultMessage)
  async register(
    @Args('registerInput') registerInput: RegisterInput,
  ): Promise<DefaultMessage> {
    return this.registersService.register(registerInput);
  }
}
