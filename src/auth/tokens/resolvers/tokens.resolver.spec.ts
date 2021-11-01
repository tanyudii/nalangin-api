import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { DatabaseModule } from '../../../@database/database.module';
import { OtpModule } from '../../../otp/otp.module';
import { UsersModule } from '../../../users/users.module';
import { AccessTokensModule } from '../../access-tokens/access-tokens.module';
import { RefreshTokensModule } from '../../refresh-tokens/refresh-tokens.module';
import { TokensService } from '../services/tokens.service';
import { TokensResolver } from './tokens.resolver';

describe('TokensResolver', () => {
  let resolver: TokensResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        JwtModule.registerAsync({
          imports: [ConfigModule.forRoot()],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: {
              expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
            },
          }),
        }),
        AccessTokensModule,
        RefreshTokensModule,
        UsersModule,
        OtpModule,
      ],
      providers: [TokensResolver, TokensService],
    }).compile();

    resolver = module.get<TokensResolver>(TokensResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
