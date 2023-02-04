import { UserPayload } from './UserPayload';

export interface UserToken {
  accessToken: string;
  userPayload: UserPayload;
}
