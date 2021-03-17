import { Profile } from './Profile';

/**
 * Model for a user
 */
export interface User {
  id?: string;
  username: string;
  email: string;
  password: string;
  profile: Profile;
}
