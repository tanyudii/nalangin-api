import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '../../users/users.module';
import { PasswordResetsModule } from '../password-resets/password-resets.module';
import { PasswordResetRepository } from '../password-resets/repositories/password-reset.repository';
import { PasswordResetsService } from '../password-resets/services/password-resets.service';
import { PasswordsResolver } from './resolvers/passwords.resolver';
import { PasswordsService } from './services/passwords.service';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([PasswordResetRepository]),
    PasswordResetsModule,
  ],
  providers: [PasswordsResolver, PasswordsService, PasswordResetsService],
})
export class PasswordsModule {}
