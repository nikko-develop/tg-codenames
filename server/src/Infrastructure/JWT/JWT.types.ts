import { ULID } from '@Libs/types/ULID.type';

export type AccessToken = string;
export type RefreshToken = string;

export interface Tokens {
  refreshToken: AccessToken;
  accessToken: RefreshToken;
}

export interface TokenPayload {
  userId: ULID;
  user: {
    nickname: string;
  };
}

export const isUserTokenPayload = (token: TokenPayload): token is TokenPayload => {
  return (token as TokenPayload)?.userId !== undefined;
};
