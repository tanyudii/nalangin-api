import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CreateTokenByRefreshTokenInput } from '../dto/create-token-by-refresh-token.input';
import { CreateTokenInput } from '../dto/create-token.input';
import { Token } from '../entities/token.entity';
import { TokensService } from '../services/tokens.service';

@Resolver(() => Token)
export class TokensResolver {
  constructor(private readonly tokensService: TokensService) {}

  @Mutation(() => Token)
  async createToken(
    @Args('createTokenInput') createTokenInput: CreateTokenInput,
  ): Promise<Token> {
    return this.tokensService.create(createTokenInput);
  }

  @Mutation(() => Token)
  async createTokenByRefreshToken(
    @Args('createTokenByRefreshTokenInput')
    createTokenByRefreshTokenInput: CreateTokenByRefreshTokenInput,
  ): Promise<Token> {
    return this.tokensService.createByRefreshToken(
      createTokenByRefreshTokenInput,
    );
  }
}
