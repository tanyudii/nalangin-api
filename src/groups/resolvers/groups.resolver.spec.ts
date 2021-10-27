import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '../../@database/database.module';
import { UsersModule } from '../../users/users.module';
import { GroupUserRepository } from '../repositories/group-user.repository';
import { GroupRepository } from '../repositories/group.repository';
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
      providers: [GroupsResolver, GroupsService],
    }).compile();

    resolver = module.get<GroupsResolver>(GroupsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
