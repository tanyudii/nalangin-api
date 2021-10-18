import { Body, Controller, Post } from '@nestjs/common';
import { PasswordsService } from '../services/passwords.service';
import { ForgotPasswordInput } from '../dto/forgot-password.input';
import { ResetPasswordInput } from '../dto/reset-password.input';

@Controller('passwords')
export class PasswordsController {
  constructor(private readonly passwordsService: PasswordsService) {}

  @Post('request')
  forgotPassword(@Body() forgotPasswordInput: ForgotPasswordInput) {
    return this.passwordsService.forgotPassword(forgotPasswordInput);
  }

  @Post('reset')
  resetPassword(@Body() resetPasswordInput: ResetPasswordInput) {
    return this.passwordsService.resetPassword(resetPasswordInput);
  }
}
