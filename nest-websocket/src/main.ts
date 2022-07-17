import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';
import { Log4jsLogger } from '@nestx-log4js/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Log4jsLogger));
  app.useWebSocketAdapter(new WsAdapter(app));
  await app.listen(3300);
}
bootstrap();
