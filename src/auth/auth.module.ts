import { Module } from '@nestjs/common';
import { AccessTokensModule } from './access-tokens/access-tokens.module';
import { RefreshTokensModule } from './refresh-tokens/refresh-tokens.module';
import { PasswordResetsModule } from './password-resets/password-resets.module';
import { TokensModule } from './tokens/tokens.module';

@Module({
  imports: [
    AccessTokensModule,
    RefreshTokensModule,
    PasswordResetsModule,
    TokensModule,
  ],
})
export class AuthModule {}
