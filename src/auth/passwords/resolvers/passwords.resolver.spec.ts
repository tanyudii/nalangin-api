import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '../../../@database/database.module';
import { UsersModule } from '../../../users/users.module';
import { PasswordReset } from '../entities/password-reset.entity';
import { PasswordResetsService } from '../services/password-resets.service';
import { PasswordsService } from '../services/passwords.service';
import { PasswordsResolver } from './passwords.resolver';

describe('PasswordsResolver', () => {
  let resolver: PasswordsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        UsersModule,
        TypeOrmModule.forFeature([PasswordReset]),
      ],
      providers: [PasswordsResolver, PasswordsService, PasswordResetsService],
    }).compile();

    resolver = module.get<PasswordsResolver>(PasswordsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
