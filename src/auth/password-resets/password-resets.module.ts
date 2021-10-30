import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PasswordResetRepository } from './repositories/password-reset.repository';
import { PasswordResetsService } from './services/password-resets.service';

@Module({
  imports: [TypeOrmModule.forFeature([PasswordResetRepository])],
  providers: [PasswordResetsService],
})
export class PasswordResetsModule {}
