import { Prisma, UserRole } from '@prisma/client';

export interface User {
  id: string;
  username: string;
  email: string;
  isEmailVerified: boolean;
  image: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export type GetUserInput = Prisma.UserWhereUniqueInput;
