import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '../../../@database/database.module';
import { MailerModule } from '../../../@mailer/mailer.module';
import { UsersModule } from '../../../users/users.module';
import { PasswordResetRepository } from '../repositories/password-reset.repository';
import { PasswordResetsService } from './password-resets.service';
import { PasswordsService } from './passwords.service';

describe('PasswordsService', () => {
  let service: PasswordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        MailerModule,
        TypeOrmModule.forFeature([PasswordResetRepository]),
        UsersModule,
      ],
      providers: [PasswordResetsService, PasswordsService],
    }).compile();

    service = module.get<PasswordsService>(PasswordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
