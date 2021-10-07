import { Module, Provider } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersResolver } from './resolvers/users.resolver';
import { UserEmailUnique } from './rules/user-email-unique.rule';
import { TypeOrmModule } from '@nestjs/typeorm';
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
