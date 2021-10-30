import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { jwtExpiresIn, jwtSecret } from '../../@common/constants/jwt.constant';
import { OtpModule } from '../../otp/otp.module';
import { UsersModule } from '../../users/users.module';
import { AccessTokensModule } from '../access-tokens/access-tokens.module';
import { AccessTokenRepository } from '../access-tokens/repositories/access-token.repository';
import { RefreshTokensModule } from '../refresh-tokens/refresh-tokens.module';
import { RefreshTokenRepository } from '../refresh-tokens/repositories/refresh-token.repository';
import { TokensResolver } from './resolvers/tokens.resolver';
import { TokensService } from './services/tokens.service';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: jwtExpiresIn },
    }),
    TypeOrmModule.forFeature([AccessTokenRepository, RefreshTokenRepository]),
    AccessTokensModule,
    RefreshTokensModule,
    UsersModule,
    OtpModule,
  ],
  providers: [TokensResolver, TokensService],
})
export class TokensModule {}
