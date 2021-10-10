import { Module } from '@nestjs/common';
import { PasswordsService } from './services/passwords.service';
import { PasswordsResolver } from './resolvers/passwords.resolver';
import { PasswordResetsModule } from '../password-resets/password-resets.module';
import { UsersModule } from '../../users/users.module';

@Module({
  imports: [PasswordResetsModule, UsersModule],
  providers: [PasswordsResolver, PasswordsService],
})
export class PasswordsModule {}
