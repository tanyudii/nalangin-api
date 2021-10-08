import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Token } from '../../entities/token.entity';
import { TokensService } from '../../services/tokens/tokens.service';
import { CreateTokenInput } from '../../dto/create-token.input';

@Resolver(() => Token)
export class TokensResolver {
  constructor(
    @Inject(TokensService.name)
    private readonly tokensService: TokensService,
  ) {}

  @Mutation(() => Token)
  async createToken(
    @Args('createTokenInput') createTokenInput: CreateTokenInput,
  ): Promise<Token> {
    return this.tokensService.create(createTokenInput);
  }
}
