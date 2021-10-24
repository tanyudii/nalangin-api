import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';

import { CreateAccessTokenDto } from '../dto/create-access-token.dto';
import { AccessToken } from '../entities/access-token.entity';

@Injectable()
export class AccessTokensService {
  constructor(
    @InjectRepository(AccessToken)
    private readonly accessTokenRepository: Repository<AccessToken>,
  ) {}

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
