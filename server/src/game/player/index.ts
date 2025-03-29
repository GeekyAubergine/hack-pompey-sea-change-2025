import { ServerWebSocket } from "bun"
import { PlayerInput } from "./input"
import { Rotation, Vec2 } from "../maths"

export type Player = {
    wsConnection: ServerWebSocket<{uuid: string}>,
    uuid: string,
    inputState: PlayerInput,
    position: Vec2,
    rotation: Rotation,
    angularVelocity: Rotation,
    velocity: Rotation
}