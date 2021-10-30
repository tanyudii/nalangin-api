import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RefreshTokenRepository } from './repositories/refresh-token.repository';
import { RefreshTokensService } from './services/refresh-tokens.service';

@Module({
  imports: [TypeOrmModule.forFeature([RefreshTokenRepository])],
  providers: [RefreshTokensService],
  exports: [RefreshTokensService],
})
export class RefreshTokensModule {}
