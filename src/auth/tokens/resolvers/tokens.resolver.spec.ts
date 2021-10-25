import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  jwtExpiresIn,
  jwtSecret,
} from '../../../@common/constants/jwt.constant';
import { DatabaseModule } from '../../../@database/database.module';
import { UsersModule } from '../../../users/users.module';
import { AccessToken } from '../entities/access-token.entity';
import { RefreshToken } from '../entities/refresh-token.entity';
import { AccessTokensService } from '../services/access-tokens.service';
import { RefreshTokensService } from '../services/refresh-tokens.service';
import { TokensService } from '../services/tokens.service';
import { TokensResolver } from './tokens.resolver';

describe('TokensResolver', () => {
  let resolver: TokensResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        UsersModule,
        JwtModule.register({
          secret: jwtSecret,
          signOptions: { expiresIn: jwtExpiresIn },
        }),
        TypeOrmModule.forFeature([AccessToken, RefreshToken]),
      ],
      providers: [
        AccessTokensService,
        RefreshTokensService,
        TokensService,
        TokensResolver,
      ],
    }).compile();

    resolver = module.get<TokensResolver>(TokensResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
