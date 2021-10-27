import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRepository } from './repositories/user.repository';
import { UsersResolver } from './resolvers/users.resolver';
import { UserEmailUnique } from './rules/user-email-unique.rule';
import { UserPhoneNumberUnique } from './rules/user-phone-number-unique.rule';
import { UsersService } from './services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [
    UsersResolver,
    UsersService,
    UserEmailUnique,
    UserPhoneNumberUnique,
  ],
  exports: [UsersService],
})
export class UsersModule {}
