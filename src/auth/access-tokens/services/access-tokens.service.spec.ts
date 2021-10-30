import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '../../../@database/database.module';
import { AccessTokenRepository } from '../repositories/access-token.repository';
import { AccessTokensService } from './access-tokens.service';

describe('AccessTokensService', () => {
  let service: AccessTokensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        TypeOrmModule.forFeature([AccessTokenRepository]),
      ],
      providers: [AccessTokensService],
    }).compile();

    service = module.get<AccessTokensService>(AccessTokensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
