import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../../@database/database.module';
import { UserBanksService } from './user-banks.service';
import { UserBank } from '../entities/user-bank.entity';

describe('UserBanksService', () => {
  let service: UserBanksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, TypeOrmModule.forFeature([UserBank])],
      providers: [UserBanksService],
    }).compile();

    service = module.get<UserBanksService>(UserBanksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
