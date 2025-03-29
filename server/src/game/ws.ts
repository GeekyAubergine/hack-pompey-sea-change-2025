import { ServerWebSocket } from "bun"

export type WebsocketData = {
    uuid: string
}

export type GameWebsocket = ServerWebSocket<WebsocketData>
