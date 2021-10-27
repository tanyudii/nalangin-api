import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserBankRepository } from './repositories/user-bank.repository';
import { UserBanksResolver } from './resolvers/user-banks.resolver';
import { UserBanksService } from './services/user-banks.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserBankRepository])],
  providers: [UserBanksResolver, UserBanksService],
})
export class UserBanksModule {}
