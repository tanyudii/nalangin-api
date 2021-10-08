import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshToken } from '../entities/refresh-token.entity';
import { CreateRefreshTokenDto } from '../dto/create-refresh-token.dto';

@Injectable()
export class RefreshTokensService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async create(
    createRefreshTokenDto: CreateRefreshTokenDto,
  ): Promise<RefreshToken> {
    const { userId, accessTokenId, expiresAt } = createRefreshTokenDto;
    return this.refreshTokenRepository.save({
      userId,
      accessTokenId,
      expiresAt,
    });
  }
}
