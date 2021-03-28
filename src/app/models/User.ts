import { Profile } from './Profile';
import { Product } from './Product';

/**
 * Model for a user
 */
export interface User {
  id?: string;
  username: string;
  email: string;
  password: string;
  profile?: Profile;
  product?: Product[];
}
