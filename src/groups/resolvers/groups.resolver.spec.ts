import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '../../@database/database.module';
import { UsersModule } from '../../users/users.module';
import { GroupsLoader } from '../loaders/groups.loader';
import { GroupUserRepository } from '../repositories/group-user.repository';
import { GroupRepository } from '../repositories/group.repository';
import { GroupUsersService } from '../services/group-users.service';
import { GroupsService } from '../services/groups.service';
import { GroupsResolver } from './groups.resolver';

describe('GroupsResolver', () => {
  let resolver: GroupsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        TypeOrmModule.forFeature([GroupRepository, GroupUserRepository]),
        UsersModule,
      ],
      providers: [
        GroupsLoader,
        GroupsResolver,
        GroupsService,
        GroupUsersService,
      ],
    }).compile();

    resolver = module.get<GroupsResolver>(GroupsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
