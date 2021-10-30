import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CreateTokenByOtpInput } from '../dto/create-token-by-otp.input';
import { CreateTokenByRefreshTokenInput } from '../dto/create-token-by-refresh-token.input';
import { CreateTokenOtpInput } from '../dto/create-token-otp.input';
import { CreateTokenInput } from '../dto/create-token.input';
import { TokensService } from '../services/tokens.service';
import { CreateTokenOtpResponseType } from '../types/create-token-otp-response.type';
import { TokenResponse } from '../types/token-response.type';

@Resolver()
export class TokensResolver {
  constructor(private readonly tokensService: TokensService) {}

  @Mutation(() => TokenResponse)
  async createToken(
    @Args('createTokenInput') createTokenInput: CreateTokenInput,
  ): Promise<TokenResponse> {
    return this.tokensService.createToken(createTokenInput);
  }

  @Mutation(() => TokenResponse)
  async createTokenByOtp(
    @Args('createTokenByOtpInput') createTokenByOtpInput: CreateTokenByOtpInput,
  ): Promise<TokenResponse> {
    return this.tokensService.createTokenByOtp(createTokenByOtpInput);
  }

  @Mutation(() => TokenResponse)
  async createTokenByRefreshToken(
    @Args('createTokenByRefreshTokenInput')
    createTokenByRefreshTokenInput: CreateTokenByRefreshTokenInput,
  ): Promise<TokenResponse> {
    return this.tokensService.createByRefreshToken(
      createTokenByRefreshTokenInput,
    );
  }

  @Mutation(() => CreateTokenOtpResponseType)
  async createTokenOtp(
    @Args('createTokenOtpInput')
    createTokenOtpInput: CreateTokenOtpInput,
  ): Promise<CreateTokenOtpResponseType> {
    return this.tokensService.createTokenOtp(createTokenOtpInput);
  }
}
