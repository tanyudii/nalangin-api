import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { PasswordsModule } from './passwords/passwords.module';
import { RegistersModule } from './registers/registers.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TokensModule } from './tokens/tokens.module';

@Module({
  imports: [TokensModule, UsersModule, PasswordsModule, RegistersModule],
  providers: [JwtStrategy],
})
export class AuthModule {}
