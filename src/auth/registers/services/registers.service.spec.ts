import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../../../@database/database.module';
import { RegistersService } from './registers.service';
import { UsersModule } from '../../../users/users.module';

describe('RegistersService', () => {
  let service: RegistersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, UsersModule],
      providers: [RegistersService],
    }).compile();

    service = module.get<RegistersService>(RegistersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
