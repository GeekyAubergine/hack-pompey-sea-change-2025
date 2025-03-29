import z from 'zod';
import { ClientPacketIndex } from 'shared';

export const InputPayloadValidator = z.object({
    id: z.literal(ClientPacketIndex.INPUT_STATE),
    forward: z.number().min(-1).max(1),
    left: z.number().min(-1).max(-1),
});

export type InputPayloadValidatorType = z.infer<typeof InputPayloadValidator>
