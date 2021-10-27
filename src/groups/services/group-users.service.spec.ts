import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '../../@database/database.module';
import { GroupUserRepository } from '../repositories/group-user.repository';
import { GroupUsersService } from './group-users.service';

describe('GroupUsersService', () => {
  let service: GroupUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        TypeOrmModule.forFeature([GroupUserRepository]),
      ],
      providers: [GroupUsersService],
    }).compile();

    service = module.get<GroupUsersService>(GroupUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
