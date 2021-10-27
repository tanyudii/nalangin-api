import { BadRequestException, Injectable } from '@nestjs/common';

import { DefaultMessage } from '../../../@graphql/types/default-message.type';
import { OtpService } from '../../../otp/services/otp.service';
import { UsersService } from '../../../users/services/users.service';
import { RegisterRequestOtpInput } from '../dto/register-request-otp.input';
import { RegisterInput } from '../dto/register.input';

@Injectable()
export class RegistersService {
  constructor(
    private readonly otpService: OtpService,
    private readonly usersService: UsersService,
  ) {}

  async registerRequestOtp(
    registerRequestOtpInput: RegisterRequestOtpInput,
  ): Promise<DefaultMessage> {
    const { phoneNumber } = registerRequestOtpInput;

    await this.otpService.create({
      subjectType: 'register',
      subjectId: phoneNumber,
      phoneNumber: phoneNumber,
      expiresIn: 120,
    });

    return this.registerMessageFactory(`Successfully send OTP.`);
  }

  async register(registerInput: RegisterInput): Promise<DefaultMessage> {
    const { name, phoneNumber, password, otp } = registerInput;

    const isValidOtp = await this.otpService.isValidExpiry(
      'register',
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
      password,
    });

    await this.otpService.revoke('register', phoneNumber, phoneNumber, otp);

    return this.registerMessageFactory(`Hi ${name} :)`);
  }

  protected registerMessageFactory(message = 'Success'): DefaultMessage {
    const passwordMessage = new DefaultMessage();
    passwordMessage.message = message;
    return passwordMessage;
  }
}
