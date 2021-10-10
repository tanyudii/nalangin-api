import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { TokensService } from './tokens.service';
import { UsersModule } from '../../../users/users.module';
import {
  jwtExpiresIn,
  jwtSecret,
} from '../../../@common/constants/jwt.constant';
import { DatabaseModule } from '../../../@database/database.module';
import { AccessTokensModule } from '../../access-tokens/access-tokens.module';
import { RefreshTokensModule } from '../../refresh-tokens/refresh-tokens.module';

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
        AccessTokensModule,
        RefreshTokensModule,
        UsersModule,
      ],
      providers: [TokensService],
    }).compile();

    service = module.get<TokensService>(TokensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
