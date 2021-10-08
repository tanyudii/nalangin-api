import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordResetsService } from './services/password-resets.service';
import { PasswordReset } from './entities/password-reset.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PasswordReset])],
  providers: [PasswordResetsService],
  exports: [PasswordResetsService],
})
export class PasswordResetsModule {}
