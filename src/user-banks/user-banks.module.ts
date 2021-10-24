import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserBank } from './entities/user-bank.entity';
import { UserBanksResolver } from './resolvers/user-banks.resolver';
import { UserBanksService } from './services/user-banks.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserBank])],
  providers: [UserBanksResolver, UserBanksService],
})
export class UserBanksModule {}
