import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';

import { DefaultMessage } from '../../../@graphql/types/default-message.type';
import { UsersService } from '../../../users/services/users.service';
import { ForgotPasswordInput } from '../dto/forgot-password.input';
import { ResetPasswordInput } from '../dto/reset-password.input';
import { PasswordResetsService } from './password-resets.service';

@Injectable()
export class PasswordsService {
  constructor(
    private readonly passwordResetsService: PasswordResetsService,
    private readonly usersService: UsersService,
    private readonly mailerService: MailerService,
  ) {}

  async forgotPassword(
    forgotPasswordInput: ForgotPasswordInput,
  ): Promise<DefaultMessage> {
    const { email } = forgotPasswordInput;
    try {
      const user = await this.usersService.findOneByEmail(email);

      const passwordReset = await this.passwordResetsService.create({
        userId: user.id,
        email: user.email,
      });

      await this.mailerService.sendMail({
        to: `${user.name} <${user.email}>`,
        subject: 'Password Reset',
        html: `
          <p>Click Here for Reset </p>
          <a href="http://localhost:8000/reset-password?token=${passwordReset.id}">Reset Password</a>
        `,
      });
    } catch (e) {}

    return this.passwordMessageFactory(
      "We'll send the password reset when the email is registered.",
    );
  }

  async resetPassword(
    resetPasswordInput: ResetPasswordInput,
  ): Promise<DefaultMessage> {
    const { email, token, password } = resetPasswordInput;

    const isValidPasswordReset = await this.passwordResetsService.isValidExpiry(
      token,
      email,
    );

    if (!isValidPasswordReset) {
      throw new BadRequestException('The password token is invalid.');
    }

    const user = await this.usersService.findOneByEmail(email);

    await Promise.all([
      this.passwordResetsService.remove(token),
      this.usersService.updatePassword(user.id, password),
    ]);

    return this.passwordMessageFactory('Successfully update password.');
  }

  protected passwordMessageFactory(message = 'Success'): DefaultMessage {
    const passwordMessage = new DefaultMessage();
    passwordMessage.message = message;
    return passwordMessage;
  }
}
