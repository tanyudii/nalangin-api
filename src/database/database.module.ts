import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { User } from '../users/entities/user.entity';
import { AccessToken } from 'src/auth/entities/access-token.entity';
import { PasswordReset } from 'src/auth/entities/password-reset.entity';
import { RefreshToken } from 'src/auth/entities/refresh-token.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        namingStrategy: new SnakeNamingStrategy(),
        synchronize: true,
        dropSchema: false,
        logging: false,
        entities: [AccessToken, PasswordReset, RefreshToken, User],
        timezone: 'UTC',
      }),
    }),
  ],
})
export class DatabaseModule {}
