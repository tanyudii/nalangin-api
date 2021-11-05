import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '../../@database/database.module';
import { OtpRepository } from '../repositories/otp.repository';
import { OtpService } from '../services/otp.service';
import { OtpResolver } from './otp.resolver';

describe('OtpResolver', () => {
  let resolver: OtpResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, TypeOrmModule.forFeature([OtpRepository])],
      providers: [OtpService, OtpResolver],
    }).compile();

    resolver = module.get<OtpResolver>(OtpResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
