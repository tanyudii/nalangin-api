import { Test, TestingModule } from '@nestjs/testing';

import { DatabaseModule } from '../../../@database/database.module';
import { UsersModule } from '../../../users/users.module';
import { PasswordResetsModule } from '../../password-resets/password-resets.module';
import { PasswordsService } from '../services/passwords.service';
import { PasswordsController } from './passwords.controller';

describe('PasswordsController', () => {
  let controller: PasswordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, PasswordResetsModule, UsersModule],
      controllers: [PasswordsController],
      providers: [PasswordsService],
    }).compile();

    controller = module.get<PasswordsController>(PasswordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
