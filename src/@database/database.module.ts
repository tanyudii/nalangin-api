import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isProduction: boolean =
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
          logging: false,
          entities: [__dirname + '/../**/*.entity.{js,ts}'],
          timezone: '+00:00',
        };
      },
    }),
  ],
})
export class DatabaseModule {}
