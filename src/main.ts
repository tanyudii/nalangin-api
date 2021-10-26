import { ClassSerializerInterceptor, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { useContainer } from 'class-validator';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';

import { CustomValidationPipe } from './@common/pipes/custom-validation.pipe';
import { AppModule } from './app.module';

initializeTransactionalContext();
patchTypeORMRepositoryWithBaseRepository();

(async () => {
  const configService = new ConfigService();
  const logger = new Logger('Main');

  const appHost = configService.get<string>('APP_HOST') || '0.0.0.0';
  const appPort = configService.get<number>('APP_PORT') || '3000';

  const app = await NestFactory.create(AppModule);

  //is used for transform pipes message
  app.useGlobalPipes(
    new CustomValidationPipe({
      transform: true,
      stopAtFirstError: true,
    }),
  );

  //is used for allow custom pipes attribute
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  //is used for exclude attribute in entity
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(appPort, appHost).then(() => {
    logger.log(`Server is listening on ${appHost}:${appPort}`);
  });
})();
