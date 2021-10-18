import { Test, TestingModule } from '@nestjs/testing';
import { PasswordsController } from './passwords.controller';
import { DatabaseModule } from '../../../@database/database.module';
import { PasswordResetsModule } from '../../password-resets/password-resets.module';
import { UsersModule } from '../../../users/users.module';
import { PasswordsService } from '../services/passwords.service';

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
