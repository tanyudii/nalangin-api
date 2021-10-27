import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '../../users/users.module';
import { PasswordResetRepository } from './repositories/password-reset.repository';
import { PasswordsResolver } from './resolvers/passwords.resolver';
import { PasswordResetsService } from './services/password-resets.service';
import { PasswordsService } from './services/passwords.service';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([PasswordResetRepository])],
  providers: [PasswordsResolver, PasswordsService, PasswordResetsService],
})
export class PasswordsModule {}
