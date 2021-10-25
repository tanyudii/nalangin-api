import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '../../users/users.module';
import { PasswordReset } from './entities/password-reset.entity';
import { PasswordsResolver } from './resolvers/passwords.resolver';
import { PasswordResetsService } from './services/password-resets.service';
import { PasswordsService } from './services/passwords.service';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([PasswordReset])],
  providers: [PasswordsService, PasswordResetsService, PasswordsResolver],
})
export class PasswordsModule {}
