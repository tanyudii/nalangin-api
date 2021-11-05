import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CreateOtpInput } from '../dtos/create-otp.input';
import { Otp } from '../entities/otp.entity';
import { OtpService } from '../services/otp.service';
import { OtpResponse } from '../types/otp-response.type';

@Resolver(() => Otp)
export class OtpResolver {
  constructor(private readonly otpService: OtpService) {}

  @Mutation(() => OtpResponse)
  async createOtp(
    @Args('createOtpInput') createOtpInput: CreateOtpInput,
  ): Promise<OtpResponse> {
    return this.otpService.create(createOtpInput);
  }
}
