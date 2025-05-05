export interface UserProps {
  nickname: string;
  passwordHash: string;
  teamCodes: string[];
}

export type UserSearchParams = Partial<Pick<UserProps, 'nickname'>>;
