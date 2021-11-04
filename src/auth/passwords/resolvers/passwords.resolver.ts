import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { DefaultMessage } from '../../../@common/graphql/types/default-message.type';
import { ForgotPasswordInput } from '../dto/forgot-password.input';
import { ResetPasswordInput } from '../dto/reset-password.input';
import { PasswordsService } from '../services/passwords.service';

@Resolver()
export class PasswordsResolver {
  constructor(private readonly passwordsService: PasswordsService) {}

  @Mutation(() => DefaultMessage)
  async forgotPassword(
    @Args('forgotPasswordInput') forgotPasswordInput: ForgotPasswordInput,
  ): Promise<DefaultMessage> {
    return this.passwordsService.forgotPassword(forgotPasswordInput);
  }

  @Mutation(() => DefaultMessage)
  async resetPassword(
    @Args('resetPasswordInput') resetPasswordInput: ResetPasswordInput,
  ): Promise<DefaultMessage> {
    return this.passwordsService.resetPassword(resetPasswordInput);
  }
}
