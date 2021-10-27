import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  jwtExpiresIn,
  jwtSecret,
} from '../../../@common/constants/jwt.constant';
import { DatabaseModule } from '../../../@database/database.module';
import { UsersModule } from '../../../users/users.module';
import { AccessTokenRepository } from '../repositories/access-token.repository';
import { RefreshTokenRepository } from '../repositories/refresh-token.repository';
import { AccessTokensService } from './access-tokens.service';
import { RefreshTokensService } from './refresh-tokens.service';
import { TokensService } from './tokens.service';

describe('TokensService', () => {
  let service: TokensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        JwtModule.register({
          secret: jwtSecret,
          signOptions: { expiresIn: jwtExpiresIn },
        }),
        TypeOrmModule.forFeature([
          AccessTokenRepository,
          RefreshTokenRepository,
        ]),
        UsersModule,
      ],
      providers: [AccessTokensService, RefreshTokensService, TokensService],
    }).compile();

    service = module.get<TokensService>(TokensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
