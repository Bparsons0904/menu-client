import { User } from './User';

/**
 * Model for a product
 */
export interface Product {
  id?: string;
  title: string;
  description: string;
  cost: number;
  image?: string;
  video?: string;
  user: User;
}
