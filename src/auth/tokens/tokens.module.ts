import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { jwtExpiresIn, jwtSecret } from '../../@common/constants/jwt.constant';
import { UsersModule } from '../../users/users.module';
import { AccessToken } from './entities/access-token.entity';
import { RefreshToken } from './entities/refresh-token.entity';
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
    UsersModule,
    TypeOrmModule.forFeature([AccessToken, RefreshToken]),
  ],
  providers: [
    AccessTokensService,
    RefreshTokensService,
    TokensService,
    TokensResolver,
  ],
  exports: [AccessTokensService],
})
export class TokensModule {}
