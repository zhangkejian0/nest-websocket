import { Module } from '@nestjs/common';
import { WsService } from './ws.service';
import { WsController } from './ws.controller';
import { WsStartGateway } from './ws.gateway';

@Module({
  providers: [WsService, WsStartGateway],
  controllers: [WsController]
})
export class WsModule {}
