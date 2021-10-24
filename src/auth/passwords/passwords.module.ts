import { Module } from '@nestjs/common';

import { UsersModule } from '../../users/users.module';
import { PasswordResetsModule } from '../password-resets/password-resets.module';
import { PasswordsController } from './controllers/passwords.controller';
import { PasswordsResolver } from './resolvers/passwords.resolver';
import { PasswordsService } from './services/passwords.service';

@Module({
  imports: [PasswordResetsModule, UsersModule],
  providers: [PasswordsResolver, PasswordsService],
  controllers: [PasswordsController],
})
export class PasswordsModule {}
