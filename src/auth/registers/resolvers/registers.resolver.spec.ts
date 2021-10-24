import { Test, TestingModule } from '@nestjs/testing';

import { DatabaseModule } from '../../../@database/database.module';
import { UsersModule } from '../../../users/users.module';
import { RegistersService } from '../services/registers.service';
import { RegistersResolver } from './registers.resolver';

describe('RegistersResolver', () => {
  let resolver: RegistersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, UsersModule],
      providers: [RegistersResolver, RegistersService],
    }).compile();

    resolver = module.get<RegistersResolver>(RegistersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
