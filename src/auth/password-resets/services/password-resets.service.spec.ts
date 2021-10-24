import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '../../../@database/database.module';
import { PasswordReset } from '../entities/password-reset.entity';
import { PasswordResetsService } from './password-resets.service';

describe('PasswordResetsService', () => {
  let service: PasswordResetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, TypeOrmModule.forFeature([PasswordReset])],
      providers: [PasswordResetsService],
    }).compile();

    service = module.get<PasswordResetsService>(PasswordResetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
