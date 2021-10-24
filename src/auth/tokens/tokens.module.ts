import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { jwtExpiresIn, jwtSecret } from '../../@common/constants/jwt.constant';
import { UsersModule } from '../../users/users.module';
import { AccessTokensModule } from '../access-tokens/access-tokens.module';
import { RefreshTokensModule } from '../refresh-tokens/refresh-tokens.module';
import { TokensController } from './controllers/tokens.controller';
import { TokensResolver } from './resolvers/tokens.resolver';
import { TokensService } from './services/tokens.service';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: jwtExpiresIn },
    }),
    AccessTokensModule,
    RefreshTokensModule,
    UsersModule,
  ],
  providers: [TokensResolver, TokensService],
  controllers: [TokensController],
})
export class TokensModule {}
