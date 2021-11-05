import { Body, Controller, Post } from '@nestjs/common';

import { ResponseData } from '../../@common/interfaces/response-data.interface';
import { CreateOtpInput } from '../dtos/create-otp.input';
import { OtpService } from '../services/otp.service';
import { OtpResponse } from '../types/otp-response.type';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('create')
  async createOtp(
    @Body() createOtpInput: CreateOtpInput,
  ): Promise<ResponseData<OtpResponse>> {
    const data = await this.otpService.create(createOtpInput);
    return { data };
  }
}
