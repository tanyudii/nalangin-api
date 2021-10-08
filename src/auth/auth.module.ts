import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessToken } from './entities/access-token.entity';
import { PasswordReset } from './entities/password-reset.entity';
import { RefreshToken } from './entities/refresh-token.entity';
import { AccessTokensService } from './services/access-tokens/access-tokens.service';
import { AuthService } from './services/auth-service/auth.service';
import { PasswordResetsService } from './services/password-resets/password-resets.service';
import { RefreshTokensService } from './services/refresh-tokens/refresh-tokens.service';

const providers: Provider[] = [
  {
    provide: AuthService.name,
    useClass: AuthService,
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
  ],
  providers: [...providers],
})
export class AuthModule {}
