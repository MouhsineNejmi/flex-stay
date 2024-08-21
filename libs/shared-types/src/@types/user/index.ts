import { Prisma } from '@prisma/client';
import { RoleEnumType } from '@prisma/client';

export interface User {
  id: string;
  username: string;
  email: string;
  emailVerified: boolean;
  image: string;
  password: string;
  role: RoleEnumType;
  createdAt: Date;
  updatedAt: Date;
}

export type FindUserInput = Prisma.UserWhereUniqueInput;
