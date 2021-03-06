import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const serverConfig = config.get('server');
  const logger = new Logger('bootstrap');

  const port = process.env.PORT || serverConfig.port;
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  await app.listen(port);
  logger.log(`app listening on port ${port} `);
}
bootstrap();
