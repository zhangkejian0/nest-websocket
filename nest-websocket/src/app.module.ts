import { Module } from '@nestjs/common';
import { Log4jsModule } from '@nestx-log4js/core';
import { WsModule } from './module/ws/ws.module';

@Module({
  imports: [
    Log4jsModule.forRoot(),
    WsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
