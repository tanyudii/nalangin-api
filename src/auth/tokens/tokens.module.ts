import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { jwtExpiresIn, jwtSecret } from '../../@common/constants/jwt.constant';
import { UsersModule } from '../../users/users.module';
import { AccessTokenRepository } from './repositories/access-token.repository';
import { RefreshTokenRepository } from './repositories/refresh-token.repository';
import { TokensResolver } from './resolvers/tokens.resolver';
import { AccessTokensService } from './services/access-tokens.service';
import { RefreshTokensService } from './services/refresh-tokens.service';
import { TokensService } from './services/tokens.service';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: jwtExpiresIn },
    }),
    TypeOrmModule.forFeature([AccessTokenRepository, RefreshTokenRepository]),
    UsersModule,
  ],
  providers: [
    TokensResolver,
    AccessTokensService,
    RefreshTokensService,
    TokensService,
  ],
  exports: [AccessTokensService],
})
export class TokensModule {}
