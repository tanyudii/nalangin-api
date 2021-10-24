import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';

import { CreateRefreshTokenDto } from '../dto/create-refresh-token.dto';
import { RefreshToken } from '../entities/refresh-token.entity';

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

  async updateAccessToken(
    id: string,
    accessTokenId: string,
  ): Promise<RefreshToken> {
    const refreshToken = await this.refreshTokenRepository.findOne({ id });
    if (!refreshToken) {
      throw new NotFoundException();
    }

    return this.refreshTokenRepository.save({
      ...refreshToken,
      accessTokenId,
    });
  }

  async isValidExpiry(
    refreshTokenId: string,
    accessTokenId: string,
  ): Promise<boolean> {
    return !!(await this.refreshTokenRepository.findOne({
      where: {
        id: refreshTokenId,
        revoked: false,
        expiresAt: MoreThan(new Date()),
        accessTokenId,
      },
    }));
  }
}
