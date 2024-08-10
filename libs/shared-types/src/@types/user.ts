export interface User {
  id: string;
  username: string;
  email: string;
  emailVerified: boolean;
  image: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
