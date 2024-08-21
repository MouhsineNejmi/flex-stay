import { PrismaClient } from '@prisma/client';
import { User } from '@flex-stay/shared-types';
import { CreateUserInput, UpdateUserInput } from '@flex-stay/schemas';

import { IUserRepository } from '../interface/IUserRepository';

export class UserRepository implements IUserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async find(limit: number, offset: number): Promise<User[]> {
    return await this.prisma.user.findMany({
      take: limit,
      skip: offset,
    });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async create(data: CreateUserInput): Promise<User> {
    const { username, email, password, role } = data;

    return await this.prisma.user.create({
      data: {
        username,
        email,
        password,
        role,
        emailVerified: false,
      },
    });
  }

  async update(
    id: string,
    { username, emailVerified, image }: UpdateUserInput
  ) {
    return await this.prisma.user.update({
      where: { id },
      data: {
        username,
        emailVerified,
        image,
      },
    });
  }

  async delete(userId: string) {
    return await this.prisma.user.delete({ where: { id: userId } });
  }
}
