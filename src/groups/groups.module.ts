import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '../users/users.module';
import { GroupsLoader } from './loaders/groups.loader';
import { GroupInvitationRepository } from './repositories/group-invitation.repository';
import { GroupJoinRequestRepository } from './repositories/group-join-request.repository';
import { GroupUserRepository } from './repositories/group-user.repository';
import { GroupRepository } from './repositories/group.repository';
import { GroupsResolver } from './resolvers/groups.resolver';
import { GroupUsersService } from './services/group-users.service';
import { GroupsService } from './services/groups.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GroupRepository,
      GroupUserRepository,
      GroupJoinRequestRepository,
      GroupInvitationRepository,
    ]),
    UsersModule,
  ],
  providers: [GroupsLoader, GroupsResolver, GroupsService, GroupUsersService],
})
export class GroupsModule {}
