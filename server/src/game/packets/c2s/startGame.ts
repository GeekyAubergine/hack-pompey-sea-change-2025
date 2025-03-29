import z from 'zod'
import { ClientPacketIndex } from 'shared';

export const StartGameValidator = z.object({
    id: z.literal(ClientPacketIndex.START_GAME),
    ship: z.number().min(-1).max(1),
});

export type StartGameValidatorType = z.infer<typeof StartGameValidator>
