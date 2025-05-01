import { UserEntity } from '@Entities/User/Domain/User.entity';

export interface TeamProps {
  code: string;
  type: TeamType;
  captainId: string;
  captainEntity?: UserEntity;
  memberIds: string[];
  memberEntities?: UserEntity[];
  bonusStep: number;
}

export type TeamSearchParams = Partial<Pick<TeamProps, 'code' | 'captainId' | 'memberIds'>>;

export type TeamType = 'blue' | 'red';
