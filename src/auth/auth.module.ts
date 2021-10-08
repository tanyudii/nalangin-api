import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtExpiresIn, jwtSecret } from '../common/constants/jwt.constant';
import { AccessToken } from './access-tokens/entities/access-token.entity';
import { PasswordReset } from './entities/password-reset.entity';
import { RefreshToken } from './refresh-tokens/entities/refresh-token.entity';
import { TokensResolver } from './resolvers/tokens/tokens.resolver';
import { TokensService } from './services/tokens/tokens.service';
import { AccessTokensService } from './access-tokens/services/access-tokens.service';
import { PasswordResetsService } from './password-resets/services/password-resets.service';
import { RefreshTokensService } from './refresh-tokens/services/refresh-tokens.service';
import { UsersModule } from '../users/users.module';
import { AccessTokensModule } from './access-tokens/access-tokens.module';
import { RefreshTokensModule } from './refresh-tokens/refresh-tokens.module';
import { PasswordResetsModule } from './password-resets/password-resets.module';

const providers: Provider[] = [
  {
    provide: TokensResolver.name,
    useClass: TokensResolver,
  },
  {
    provide: TokensService.name,
    useClass: TokensService,
  },
  {
    provide: AccessTokensService.name,
    useClass: AccessTokensService,
  },
  {
    provide: RefreshTokensService.name,
    useClass: RefreshTokensService,
  },
  {
    provide: PasswordResetsService.name,
    useClass: PasswordResetsService,
  },
];

@Module({
  imports: [
    TypeOrmModule.forFeature([AccessToken, RefreshToken, PasswordReset]),
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: jwtExpiresIn },
    }),
    UsersModule,
    AccessTokensModule,
    RefreshTokensModule,
    PasswordResetsModule,
  ],
  providers: [...providers],
})
export class AuthModule {}
