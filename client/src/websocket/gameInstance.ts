import {ClientPacketIndex} from 'shared'

export function createWsClient(name: string) {
    return new WebSocket('wss://hp25.zoeaubert.me/api?username=' + name);
}

function send(ws: WebSocket, data: any){
    ws.send(JSON.stringify(data));
}

export function sendInputState(ws: WebSocket, fwd: number, left: number){
    send(ws, {
        id: ClientPacketIndex.INPUT_STATE,
        forward: fwd,
        left: left
    })
}

export function selectShip(ws: WebSocket, shipName: string ){
    send(ws, {
        id: ClientPacketIndex.START_GAME,
        shipName
    })
}

export function 