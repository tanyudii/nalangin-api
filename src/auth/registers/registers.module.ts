import { Module } from '@nestjs/common';
import { RegistersService } from './services/registers.service';
import { RegistersResolver } from './resolvers/registers.resolver';
import { UsersModule } from '../../users/users.module';
import { RegistersController } from './controllers/registers.controller';

@Module({
  imports: [UsersModule],
  providers: [RegistersResolver, RegistersService],
  controllers: [RegistersController],
})
export class RegistersModule {}
