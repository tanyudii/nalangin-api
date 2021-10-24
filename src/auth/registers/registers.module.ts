import { Module } from '@nestjs/common';

import { UsersModule } from '../../users/users.module';
import { RegistersController } from './controllers/registers.controller';
import { RegistersResolver } from './resolvers/registers.resolver';
import { RegistersService } from './services/registers.service';

@Module({
  imports: [UsersModule],
  providers: [RegistersResolver, RegistersService],
  controllers: [RegistersController],
})
export class RegistersModule {}
