import { Category, CategoryQuery } from '@flex-stay/shared-types';
import { CreateCategoryInput, UpdateCategoryInput } from '@flex-stay/schemas';
import { Prisma, PrismaClient } from '@prisma/client';

import { ICategoriesRespository } from '../interfaces/categories/ICategoriesRepository';

export class CategoriesRepository implements ICategoriesRespository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async find(limit: number, offset: number): Promise<Category[]> {
    return await this.prisma.category.findMany({
      take: limit,
      skip: offset,
    });
  }

  async findById(id: string): Promise<Category> {
    return await this.prisma.category.findUnique({
      where: {
        id,
      },
    });
  }

  async findByQuery(
    queryParams: CategoryQuery,
    limit: number,
    offset: number
  ): Promise<Category[]> {
    const query: Prisma.CategoryWhereInput = {};
    const { id, name, icon } = queryParams;

    if (id) {
      query.id = id;
    }

    if (name) {
      query.name = name;
    }

    if (icon) {
      query.icon = icon;
    }

    return await this.prisma.category.findMany({
      where: query,
      take: limit,
      skip: offset,
    });
  }

  async create({ icon, name }: CreateCategoryInput): Promise<Category> {
    return await this.prisma.category.create({
      data: {
        icon,
        name,
      },
    });
  }

  async update(
    id: string,
    { icon, name }: UpdateCategoryInput
  ): Promise<Category> {
    return await this.prisma.category.update({
      where: { id },
      data: {
        icon,
        name,
      },
    });
  }

  async delete(id: string): Promise<Category> {
    return await this.prisma.category.delete({
      where: { id },
    });
  }
}
