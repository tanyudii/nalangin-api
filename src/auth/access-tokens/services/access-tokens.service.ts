import { Injectable } from '@nestjs/common';
import { MoreThan } from 'typeorm';

import { CreateAccessTokenDto } from '../dto/create-access-token.dto';
import { AccessToken } from '../entities/access-token.entity';
import { AccessTokenRepository } from '../repositories/access-token.repository';

@Injectable()
export class AccessTokensService {
  constructor(private readonly accessTokenRepository: AccessTokenRepository) {}

  async create(
    createAccessTokenDto: CreateAccessTokenDto,
  ): Promise<AccessToken> {
    const { userId, expiresAt } = createAccessTokenDto;
    return this.accessTokenRepository.save({
      userId,
      expiresAt,
    });
  }

  async isValidExpiry(accessTokenId: string): Promise<boolean> {
    return !!(await this.accessTokenRepository.findOne({
      where: {
        id: accessTokenId,
        revoked: false,
        expiresAt: MoreThan(new Date()),
      },
    }));
  }
}
