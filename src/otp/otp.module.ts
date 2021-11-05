import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OtpController } from './controllers/otp.controller';
import { OtpRepository } from './repositories/otp.repository';
import { OtpResolver } from './resolvers/otp.resolver';
import { OtpService } from './services/otp.service';

@Module({
  imports: [TypeOrmModule.forFeature([OtpRepository])],
  providers: [OtpResolver, OtpService],
  controllers: [OtpController],
  exports: [OtpService],
})
export class OtpModule {}
