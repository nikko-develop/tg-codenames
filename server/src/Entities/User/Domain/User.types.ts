export interface UserProps {
  nickname: string;
  teamCodes: string[];
}

export type UserSearchParams = Partial<Pick<UserProps, 'nickname'>>;
