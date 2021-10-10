import { Test, TestingModule } from '@nestjs/testing';
import { PasswordsService } from './passwords.service';
import { DatabaseModule } from '../../../@database/database.module';
import { PasswordResetsModule } from '../../password-resets/password-resets.module';
import { UsersModule } from '../../../users/users.module';

describe('PasswordsService', () => {
  let service: PasswordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, PasswordResetsModule, UsersModule],
      providers: [PasswordsService],
    }).compile();

    service = module.get<PasswordsService>(PasswordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
