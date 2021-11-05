import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CreateTokenInput } from '../dto/create-token.input';
import { RefreshTokenInput } from '../dto/refresh-token.input';
import { TokensService } from '../services/tokens.service';
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
  async refreshToken(
    @Args('refreshTokenInput')
    refreshTokenInput: RefreshTokenInput,
  ): Promise<TokenResponse> {
    return this.tokensService.refreshToken(refreshTokenInput);
  }
}
