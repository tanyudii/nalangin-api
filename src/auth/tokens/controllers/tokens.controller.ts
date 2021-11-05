import { Body, Controller, Post } from '@nestjs/common';

import { ResponseData } from '../../../@common/interfaces/response-data.interface';
import { CreateTokenInput } from '../dto/create-token.input';
import { RefreshTokenInput } from '../dto/refresh-token.input';
import { TokensService } from '../services/tokens.service';
import { TokenResponse } from '../types/token-response.type';

@Controller('tokens')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Post('create')
  async createToken(
    @Body() createTokenInput: CreateTokenInput,
  ): Promise<ResponseData<TokenResponse>> {
    const data = await this.tokensService.createToken(createTokenInput);
    return { data };
  }

  @Post('refresh')
  async refreshToken(
    @Body() refreshTokenInput: RefreshTokenInput,
  ): Promise<ResponseData<TokenResponse>> {
    const data = await this.tokensService.refreshToken(refreshTokenInput);
    return { data };
  }
}
