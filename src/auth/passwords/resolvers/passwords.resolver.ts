import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PasswordsService } from '../services/passwords.service';
import { PasswordMessage } from '../entities/password-message.entity';
import { ForgotPasswordInput } from '../dto/forgot-password.input';
import { ResetPasswordInput } from '../dto/reset-password.input';

@Resolver(() => PasswordMessage)
export class PasswordsResolver {
  constructor(private readonly passwordsService: PasswordsService) {}

  @Mutation(() => PasswordMessage)
  forgotPassword(
    @Args('forgotPasswordInput') forgotPasswordInput: ForgotPasswordInput,
  ) {
    return this.passwordsService.forgotPassword(forgotPasswordInput);
  }

  @Mutation(() => PasswordMessage)
  resetPassword(
    @Args('resetPasswordInput') resetPasswordInput: ResetPasswordInput,
  ) {
    return this.passwordsService.resetPassword(resetPasswordInput);
  }
}
