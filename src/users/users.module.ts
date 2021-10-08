import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersResolver } from './resolvers/users.resolver';
import { UsersService } from './services/users.service';
import { UserEmailUnique } from './rules/user-email-unique.rule';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersResolver, UsersService, UserEmailUnique],
  exports: [UsersResolver, UsersService],
})
export class UsersModule {}
