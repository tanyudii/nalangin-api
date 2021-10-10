import { Module } from '@nestjs/common';
import { AccessTokensModule } from './access-tokens/access-tokens.module';
import { RefreshTokensModule } from './refresh-tokens/refresh-tokens.module';
import { PasswordResetsModule } from './password-resets/password-resets.module';
import { TokensModule } from './tokens/tokens.module';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PasswordsModule } from './passwords/passwords.module';
import { RegistersModule } from './registers/registers.module';

@Module({
  imports: [
    AccessTokensModule,
    RefreshTokensModule,
    PasswordResetsModule,
    TokensModule,
    UsersModule,
    PasswordsModule,
    RegistersModule,
  ],
  providers: [JwtStrategy],
})
export class AuthModule {}
