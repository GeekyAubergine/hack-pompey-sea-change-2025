import { ServerWebSocket } from "bun";
import {randomUUID} from 'crypto';
import { Player } from "./player";
import { C2S, S2C } from "./packets";
import { ClientPacketIndex } from "shared";
import { serializePlayerState } from "./packets/s2c";

export class Instance{
    private players: Map<string, Player>; 

    constructor(){
        this.players = new Map();
    }

    public addPlayer(websocket: ServerWebSocket<{uuid: string}>){
        this.players.set(websocket.data.uuid, {
            wsConnection: websocket,
            uuid: randomUUID(),
            inputState: {
                forwardVector: 0,
                leftVector: 0
            },
            position: {
                x: 0,
                y: 0
            },
            rotation: {
                deg: 0
            },
            angularVelocity: {
                deg: 0
            },
            velocity: {
                deg: 0
            }
        });
    }

    public playerLeave(websocket:ServerWebSocket<{uuid: string}>){
        
    }

    public tick() {
        for(const [uuid, player] of this.players){
            this.physicsTick(player);
        }

        for(const [uuid, player] of this.players){
            // Send out the message!  
            this.broadcastMessage(serializePlayerState(player))
        }
    }

    public broadcastMessage(data: any){
        for(const [uuid, player] of this.players){
            player.wsConnection.send(JSON.stringify(data))
        }
    }

    public physicsTick(player: Player){
        player.position.x += player.inputState.forwardVector
    }

    public networkReceive(websocket: ServerWebSocket<{uuid: string}>, data: any){
        const player = this.players.get(websocket.data.uuid);
        
        if(!player){
            console.log('invalid player')
            return;
        }

        const deserializedData = C2S.deserialize(data);
        
        if(deserializedData == null){
            console.log('invalid data!')
            return;
        }

        switch (deserializedData.id){
            case ClientPacketIndex.INPUT_STATE:
                player.inputState = {
                    forwardVector: deserializedData.forward,
                    leftVector: deserializedData.left,
                }
                break
            case ClientPacketIndex.START_GAME:
                break
        }
    }
}