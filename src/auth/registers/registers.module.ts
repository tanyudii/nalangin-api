import { Module } from '@nestjs/common';
import { RegistersService } from './services/registers.service';
import { RegistersResolver } from './resolvers/registers.resolver';
import { UsersModule } from '../../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [RegistersResolver, RegistersService],
})
export class RegistersModule {}
