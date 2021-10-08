import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessTokensService } from './services/access-tokens.service';
import { AccessToken } from './entities/access-token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccessToken])],
  providers: [AccessTokensService],
  exports: [AccessTokensService],
})
export class AccessTokensModule {}
