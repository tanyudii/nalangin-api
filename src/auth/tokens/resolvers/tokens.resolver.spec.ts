import { Test, TestingModule } from '@nestjs/testing';
import { TokensResolver } from './tokens.resolver';
import { DatabaseModule } from '../../../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessToken } from '../../access-tokens/entities/access-token.entity';
import { RefreshToken } from '../../refresh-tokens/entities/refresh-token.entity';
import { JwtModule } from '@nestjs/jwt';
import {
  jwtExpiresIn,
  jwtSecret,
} from '../../../common/constants/jwt.constant';
import { UsersModule } from '../../../users/users.module';
import { AccessTokensService } from '../../access-tokens/services/access-tokens.service';
import { RefreshTokensService } from '../../refresh-tokens/services/refresh-tokens.service';

describe('TokensResolver', () => {
  let resolver: TokensResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        TypeOrmModule.forFeature([AccessToken, RefreshToken]),
        JwtModule.register({
          secret: jwtSecret,
          signOptions: { expiresIn: jwtExpiresIn },
        }),
        UsersModule,
      ],
      providers: [
        {
          provide: AccessTokensService.name,
          useClass: AccessTokensService,
        },
        {
          provide: RefreshTokensService.name,
          useClass: RefreshTokensService,
        },
        {
          provide: TokensResolver.name,
          useClass: TokensResolver,
        },
      ],
    }).compile();

    resolver = module.get<TokensResolver>(TokensResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
