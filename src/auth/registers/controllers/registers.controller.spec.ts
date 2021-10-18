import { Test, TestingModule } from '@nestjs/testing';
import { RegistersController } from './registers.controller';
import { DatabaseModule } from '../../../@database/database.module';
import { UsersModule } from '../../../users/users.module';
import { RegistersService } from '../services/registers.service';

describe('RegistersController', () => {
  let controller: RegistersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, UsersModule],
      controllers: [RegistersController],
      providers: [RegistersService],
    }).compile();

    controller = module.get<RegistersController>(RegistersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
