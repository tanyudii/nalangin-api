import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '../users/users.module';
import { GroupUser } from './entities/group-user.entity';
import { Group } from './entities/group.entity';
import { GroupsResolver } from './resolvers/groups.resolver';
import { GroupsService } from './services/groups.service';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Group, GroupUser])],
  providers: [GroupsService, GroupsResolver],
})
export class GroupsModule {}
