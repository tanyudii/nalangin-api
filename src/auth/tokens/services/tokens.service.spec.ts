import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import {
  jwtExpiresIn,
  jwtSecret,
} from '../../../@common/constants/jwt.constant';
import { DatabaseModule } from '../../../@database/database.module';
import { OtpModule } from '../../../otp/otp.module';
import { UsersModule } from '../../../users/users.module';
import { AccessTokensModule } from '../../access-tokens/access-tokens.module';
import { RefreshTokensModule } from '../../refresh-tokens/refresh-tokens.module';
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
        AccessTokensModule,
        RefreshTokensModule,
        UsersModule,
        OtpModule,
      ],
      providers: [TokensService],
    }).compile();

    service = module.get<TokensService>(TokensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
