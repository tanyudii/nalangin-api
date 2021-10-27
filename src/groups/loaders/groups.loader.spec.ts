import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '../../@database/database.module';
import { UsersModule } from '../../users/users.module';
import { GroupUserRepository } from '../repositories/group-user.repository';
import { GroupRepository } from '../repositories/group.repository';
import { GroupsService } from '../services/groups.service';
import { GroupsLoader } from './groups.loader';

describe('GroupsLoader', () => {
  let loader: GroupsLoader;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        TypeOrmModule.forFeature([GroupRepository, GroupUserRepository]),
        UsersModule,
      ],
      providers: [GroupsLoader, GroupsService],
    }).compile();

    loader = await module.resolve<GroupsLoader>(GroupsLoader);
  });

  it('should be defined', () => {
    expect(loader).toBeDefined();
  });
});
