import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '../users/users.module';
import { GroupUserRepository } from './repositories/group-user.repository';
import { GroupRepository } from './repositories/group.repository';
import { GroupsResolver } from './resolvers/groups.resolver';
import { GroupsService } from './services/groups.service';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([GroupRepository, GroupUserRepository]),
  ],
  providers: [GroupsService, GroupsResolver],
})
export class GroupsModule {}
