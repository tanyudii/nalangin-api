import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokensService } from './refresh-tokens.service';
import { DatabaseModule } from '../../../database/database.module';
import { RefreshToken } from '../entities/refresh-token.entity';

describe('RefreshTokensService', () => {
  let service: RefreshTokensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, TypeOrmModule.forFeature([RefreshToken])],
      providers: [RefreshTokensService],
    }).compile();

    service = module.get<RefreshTokensService>(RefreshTokensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
