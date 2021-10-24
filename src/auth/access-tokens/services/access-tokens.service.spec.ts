import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '../../../@database/database.module';
import { AccessToken } from '../entities/access-token.entity';
import { AccessTokensService } from './access-tokens.service';

describe('AccessTokensService', () => {
  let service: AccessTokensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, TypeOrmModule.forFeature([AccessToken])],
      providers: [AccessTokensService],
    }).compile();

    service = module.get<AccessTokensService>(AccessTokensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
