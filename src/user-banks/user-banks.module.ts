import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBanksService } from './services/user-banks.service';
import { UserBanksLoader } from './loaders/user-banks.loader';
import { UserBanksResolver } from './resolvers/user-banks.resolver';
import { UserBank } from './entities/user-bank.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([UserBank])],
  providers: [UserBanksResolver, UserBanksService, UserBanksLoader],
})
export class UserBanksModule {}
