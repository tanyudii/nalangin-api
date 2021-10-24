import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccessToken } from './entities/access-token.entity';
import { AccessTokensService } from './services/access-tokens.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccessToken])],
  providers: [AccessTokensService],
  exports: [AccessTokensService],
})
export class AccessTokensModule {}
