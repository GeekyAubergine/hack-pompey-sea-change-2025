import { Rotation, Vec2 } from "../../maths"
import { Player } from "../../player"

export type SerializedPlayerState = {
    uuid: string,
    position: Vec2,
    rotation: Rotation,
    angularVelocity: Rotation,
    velocity: Rotation
}

export function serialize(player: Player): SerializedPlayerState{
    return {
        uuid: player.uuid,
        position: player.position,
        rotation: player.rotation,
        angularVelocity: player.angularVelocity,
        velocity: player.velocity
    }
}