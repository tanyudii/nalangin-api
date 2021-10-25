import { Module } from '@nestjs/common';

import { OtpModule } from '../../otp/otp.module';
import { UsersModule } from '../../users/users.module';
import { RegistersResolver } from './resolvers/registers.resolver';
import { RegistersService } from './services/registers.service';

@Module({
  imports: [OtpModule, UsersModule],
  providers: [RegistersResolver, RegistersService],
})
export class RegistersModule {}
