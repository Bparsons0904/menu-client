/**
 * Model for a profile
 */
export interface Profile {
  id?: string;
  firstName: string;
  lastName: string;
  role: string;
  title: string;
  email: string;
  phone: number;
  image?: string;
  active?: boolean;
  dealerId: string;
  userId: string;
}
