import { Body, Controller, Post } from '@nestjs/common';
import { PasswordsService } from '../services/passwords.service';
import { ForgotPasswordInput } from '../dto/forgot-password.input';
import { ResetPasswordInput } from '../dto/reset-password.input';
import { PasswordMessage } from '../entities/password-message.entity';

@Controller('passwords')
export class PasswordsController {
  constructor(private readonly passwordsService: PasswordsService) {}

  @Post('request')
  async forgotPassword(
    @Body() forgotPasswordInput: ForgotPasswordInput,
  ): Promise<PasswordMessage> {
    return this.passwordsService.forgotPassword(forgotPasswordInput);
  }

  @Post('reset')
  async resetPassword(
    @Body() resetPasswordInput: ResetPasswordInput,
  ): Promise<PasswordMessage> {
    return this.passwordsService.resetPassword(resetPasswordInput);
  }
}
