import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PasswordsService } from '../services/passwords.service';
import { PasswordMessage } from '../entities/password-message.entity';
import { ForgotPasswordInput } from '../dto/forgot-password.input';
import { ResetPasswordInput } from '../dto/reset-password.input';

@Resolver(() => PasswordMessage)
export class PasswordsResolver {
  constructor(private readonly passwordsService: PasswordsService) {}

  @Mutation(() => PasswordMessage)
  async forgotPassword(
    @Args('forgotPasswordInput') forgotPasswordInput: ForgotPasswordInput,
  ): Promise<PasswordMessage> {
    return this.passwordsService.forgotPassword(forgotPasswordInput);
  }

  @Mutation(() => PasswordMessage)
  async resetPassword(
    @Args('resetPasswordInput') resetPasswordInput: ResetPasswordInput,
  ): Promise<PasswordMessage> {
    return this.passwordsService.resetPassword(resetPasswordInput);
  }
}
