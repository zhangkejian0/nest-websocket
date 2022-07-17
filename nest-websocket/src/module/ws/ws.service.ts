import { Injectable, Logger } from '@nestjs/common';
import { Server } from 'socket.io';
const FlakeId = require('flake-idgen')
const Intformat = require('biguint-format')
const flakeIdGen = new FlakeId();
@Injectable()
export class WsService {

    generateClientId(server, client, _id){
        // client.id = Intformat(flakeIdGen.next());
        client.id = !!_id ? _id : Intformat(flakeIdGen.next());
        this.broadcastConnectCounts(server);
    }

    // 广播在线人数
    broadcastConnectCounts(server){
        let count = 0;
        server.clients.forEach(client => {
            if(client._readyState) count++;
        });
        for(let client of server.clients) {
            client.send(JSON.stringify({ event: 'client_count', data: count}))
        }
    }

    broadcastMessage(server: any, _client:any, data: any){
        const clients = server.clients;
        for(let client of clients) {
            try {
                // 0：正在链接中 1：已经链接并且可以通讯 2：连接正在关闭 3：连接已关闭或者没有链接成功
                if(client._readyState === 1){
                    client.send(JSON.stringify({
                        "event": "broadcast",
                        "data": data,
                        "time": new Date(),
                        "user": {
                            id: _client.id
                        }
                    }))
                }
            } catch (error) {
                Logger.log(client)
                Logger.log(error)
            }
        }
    }
}
