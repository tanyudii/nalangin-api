import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { DatabaseModule } from './@database/database.module';
import { configValidationSchema } from './@common/constants/config.constant';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UserBanksModule } from './user-banks/user-banks.module';
import { ShoppingsModule } from './shoppings/shoppings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configValidationSchema,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    UserBanksModule,
    ShoppingsModule,
  ],
})
export class AppModule {}
