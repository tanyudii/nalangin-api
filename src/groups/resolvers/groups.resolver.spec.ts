import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '../../@database/database.module';
import { UsersModule } from '../../users/users.module';
import { GroupUser } from '../entities/group-user.entity';
import { Group } from '../entities/group.entity';
import { GroupsService } from '../services/groups.service';
import { GroupsResolver } from './groups.resolver';

describe('GroupsResolver', () => {
  let resolver: GroupsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        UsersModule,
        TypeOrmModule.forFeature([Group, GroupUser]),
      ],
      providers: [GroupsResolver, GroupsService],
    }).compile();

    resolver = module.get<GroupsResolver>(GroupsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
