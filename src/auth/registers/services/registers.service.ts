import { BadRequestException, Injectable } from '@nestjs/common';

import { DefaultMessage } from '../../../@graphql/types/default-message.type';
import { Otp } from '../../../otp/entities/otp.entity';
import { OtpService } from '../../../otp/services/otp.service';
import { UsersService } from '../../../users/services/users.service';
import { RegisterOtpInput } from '../dto/register-otp.input';
import { RegisterInput } from '../dto/register.input';
import { RegisterOtpResponse } from '../types/register-otp-response.type';

const otpSubjectTypeName = 'register_user';

@Injectable()
export class RegistersService {
  constructor(
    private readonly otpService: OtpService,
    private readonly usersService: UsersService,
  ) {}

  async registerOtp(
    registerOtpInput: RegisterOtpInput,
  ): Promise<RegisterOtpResponse> {
    const { phoneNumber } = registerOtpInput;

    const otp = await this.otpService.create({
      subjectType: otpSubjectTypeName,
      subjectId: phoneNumber,
      phoneNumber: phoneNumber,
      expiresIn: 120,
    });

    return this.registerOtpFactory(`We have sent your otp!`, otp);
  }

  async register(registerInput: RegisterInput): Promise<DefaultMessage> {
    const { name, phoneNumber, otp } = registerInput;

    const isValidOtp = await this.otpService.isValidExpiry(
      otpSubjectTypeName,
      phoneNumber,
      phoneNumber,
      otp,
    );

    if (!isValidOtp) {
      throw new BadRequestException('otp is invalid.');
    }

    await this.usersService.create({
      name,
      phoneNumber,
    });

    await this.otpService.revoke(
      otpSubjectTypeName,
      phoneNumber,
      phoneNumber,
      otp,
    );

    return this.registerMessageFactory(`Hi ${name}`);
  }

  protected registerOtpFactory(
    message = 'Success',
    otp: Otp,
  ): RegisterOtpResponse {
    const registerOtpResponse = new RegisterOtpResponse();
    registerOtpResponse.message = message;
    registerOtpResponse.increment = otp.increment;
    registerOtpResponse.availableNextAt = otp.availableNextAt;
    return registerOtpResponse;
  }

  protected registerMessageFactory(message = 'Success'): DefaultMessage {
    const passwordMessage = new DefaultMessage();
    passwordMessage.message = message;
    return passwordMessage;
  }
}
