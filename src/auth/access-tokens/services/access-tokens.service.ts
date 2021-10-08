import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccessToken } from '../entities/access-token.entity';
import { CreateAccessTokenDto } from '../dto/create-access-token.dto';

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
}
