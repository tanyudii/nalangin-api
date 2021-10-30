import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccessTokenRepository } from './repositories/access-token.repository';
import { AccessTokensService } from './services/access-tokens.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccessTokenRepository])],
  providers: [AccessTokensService],
  exports: [AccessTokensService],
})
export class AccessTokensModule {}
