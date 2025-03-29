export type User = {
  id: string;
  name: string;
  email: string;
};

export const ClientPacketIndex = {
  INPUT_STATE: 1,
  START_GAME: 2
} as const;
