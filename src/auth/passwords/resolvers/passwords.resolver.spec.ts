import { Test, TestingModule } from '@nestjs/testing';
import { PasswordsResolver } from './passwords.resolver';
import { PasswordsService } from '../services/passwords.service';
import { PasswordResetsModule } from '../../password-resets/password-resets.module';
import { DatabaseModule } from '../../../@database/database.module';

describe('PasswordsResolver', () => {
  let resolver: PasswordsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, PasswordResetsModule],
      providers: [PasswordsResolver, PasswordsService],
    }).compile();

    resolver = module.get<PasswordsResolver>(PasswordsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
