import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Account } from '../accounts/entities/account.entity';
import { RefreshToken } from '../auth/refresh-tokens/entities/refresh-token.entity';
import { User } from '../users/entities/user.entity';
import { AccessToken } from '../auth/access-tokens/entities/access-token.entity';
import { PasswordReset } from '../auth/password-resets/entities/password-reset.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isProduction =
          configService.get<string>('NODE_ENV') == 'production';

        return {
          type: 'mysql',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          namingStrategy: new SnakeNamingStrategy(),
          synchronize: !isProduction,
          dropSchema: false,
          logging: !isProduction,
          entities: [Account, AccessToken, PasswordReset, RefreshToken, User],
        };
      },
    }),
  ],
})
export class DatabaseModule {}
