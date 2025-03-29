import z from 'zod'
import {InputPayloadValidator} from './inputState'
import { StartGameValidator } from './startGame';

const GenericInputPacket = z.discriminatedUnion('id', 
    [ InputPayloadValidator, StartGameValidator ]);

export type GenericInputPacketType = z.infer<typeof GenericInputPacket>

export function deserialize(data: any): GenericInputPacketType | undefined {
    const parsedPacket = GenericInputPacket.safeParse(data);

    if(!parsedPacket.success){
        return undefined;
    }

    return parsedPacket.data
}