import { Logger } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from 'socket.io';
import { WsService } from "./ws.service";

@WebSocketGateway(3301,{
    cors: {
      origin: '*',
    },
  })
export class WsStartGateway implements OnGatewayConnection, OnGatewayDisconnect{
    constructor(
      private readonly wsService: WsService
    ) {}

    @WebSocketServer()
    server: Server;

    handleConnection(client: any, ...args: any[]) {
      Logger.log(`有客户端进来`)
      const id: string = (args[0].url as string).split('/')[1]
      this.wsService.generateClientId(this.server, client, id);
      client.send(JSON.stringify({
        "event": "client_info",
        "time": new Date(),
        "user": {
          id: client.id
        }
      }))
    }

    handleDisconnect(client: any) {
      Logger.log(`有客户端断开`)
      this.wsService.broadcastConnectCounts(this.server)
    }

    @SubscribeMessage('ping')
    async ping(@MessageBody() data: any): Promise<any> {
        return {
            "event": "ping",
            "data": data,
            "time": new Date()
        };
    }
    
    @SubscribeMessage('client_send')
    async message(@MessageBody() data: any, @ConnectedSocket() client): Promise<any> {
      this.wsService.broadcastMessage(this.server, client, data);
      return {
          "event": "client_send_ok",
          "data": data,
          "time": new Date(),
          "user": {
            id: client.id
          }
      };
    }
}