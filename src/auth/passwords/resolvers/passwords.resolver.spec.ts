import { Test, TestingModule } from '@nestjs/testing';

import { DatabaseModule } from '../../../@database/database.module';
import { UsersModule } from '../../../users/users.module';
import { PasswordResetsModule } from '../../password-resets/password-resets.module';
import { PasswordsService } from '../services/passwords.service';
import { PasswordsResolver } from './passwords.resolver';

describe('PasswordsResolver', () => {
  let resolver: PasswordsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, PasswordResetsModule, UsersModule],
      providers: [PasswordsResolver, PasswordsService],
    }).compile();

    resolver = module.get<PasswordsResolver>(PasswordsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
