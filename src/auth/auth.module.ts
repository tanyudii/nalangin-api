import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { AccessTokensModule } from './access-tokens/access-tokens.module';
import { PasswordResetsModule } from './password-resets/password-resets.module';
import { PasswordsModule } from './passwords/passwords.module';
import { RefreshTokensModule } from './refresh-tokens/refresh-tokens.module';
import { RegistersModule } from './registers/registers.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TokensModule } from './tokens/tokens.module';

@Module({
  imports: [
    TokensModule,
    UsersModule,
    PasswordsModule,
    RegistersModule,
    PasswordResetsModule,
    AccessTokensModule,
    RefreshTokensModule,
  ],
  providers: [JwtStrategy],
})
export class AuthModule {}
