import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { configValidationSchema } from './@common/constants/config.constant';
import { DatabaseModule } from './@database/database.module';
import { MailerModule } from './@mailer/mailer.module';
import { AuthModule } from './auth/auth.module';
import { GroupsModule } from './groups/groups.module';
import { OtpModule } from './otp/otp.module';
import { PaymentsModule } from './payments/payments.module';
import { ProfileModule } from './profile/profile.module';
import { ShoppingsModule } from './shoppings/shoppings.module';
import { UserBanksModule } from './user-banks/user-banks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configValidationSchema,
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        playground: configService.get<string>('NODE_ENV') !== 'production',
      }),
    }),
    DatabaseModule,
    MailerModule,
    AuthModule,
    UsersModule,
    UserBanksModule,
    ShoppingsModule,
    PaymentsModule,
    OtpModule,
    GroupsModule,
    ProfileModule,
  ],
})
export class AppModule {}
