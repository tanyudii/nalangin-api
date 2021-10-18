import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsService } from './services/accounts.service';
import { AccountsLoaders } from './loaders/accounts.loader';
import { AccountsResolver } from './resolvers/accounts.resolver';
import { Account } from './entities/account.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Account])],
  providers: [AccountsResolver, AccountsService, AccountsLoaders],
})
export class AccountsModule {}
