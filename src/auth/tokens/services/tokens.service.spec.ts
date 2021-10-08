import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { TokensService } from './tokens.service';
import { AccessToken } from '../../access-tokens/entities/access-token.entity';
import { RefreshToken } from '../../refresh-tokens/entities/refresh-token.entity';
import { UsersModule } from '../../../users/users.module';
import {
  jwtExpiresIn,
  jwtSecret,
} from '../../../common/constants/jwt.constant';
import { DatabaseModule } from '../../../database/database.module';
import { AccessTokensService } from '../../access-tokens/services/access-tokens.service';
import { RefreshTokensService } from '../../refresh-tokens/services/refresh-tokens.service';

describe('TokensService', () => {
  let service: TokensService;

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
        TokensService,
      ],
    }).compile();

    service = module.get<TokensService>(TokensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
