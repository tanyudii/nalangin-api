import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { configValidationSchema } from './@common/constants/config.constant';
import { DatabaseModule } from './@database/database.module';
import { AuthModule } from './auth/auth.module';
import { PaymentsModule } from './payments/payments.module';
import { ShoppingsModule } from './shoppings/shoppings.module';
import { UserBanksModule } from './user-banks/user-banks.module';
import { UsersModule } from './users/users.module';
import { OtpModule } from './otp/otp.module';


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
    PaymentsModule,
    OtpModule,
  ],
})
export class AppModule {}