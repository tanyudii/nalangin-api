import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersResolver } from './resolvers/users.resolver';
import { UsersService } from './services/users-service/users.service';
import { UserEmailUnique } from './rules/user-email-unique.rule';
import { User } from './entities/user.entity';

const providers: Provider[] = [
  {
    provide: UsersResolver.name,
    useClass: UsersResolver,
  },
  {
    provide: UsersService.name,
    useClass: UsersService,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [...providers, UserEmailUnique],
})
export class UsersModule {}
