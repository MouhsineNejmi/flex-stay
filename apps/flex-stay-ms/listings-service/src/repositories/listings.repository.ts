import { Listing, ListingQuery } from '@flex-stay/shared-types';
import { Prisma, PrismaClient } from '@prisma/client';

import { IListingsRespository } from '../interfaces/listings/IListingsRepository';
import { CreateListingInput, UpdateListingInput } from '@flex-stay/schemas';

export class ListingRepository implements IListingsRespository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async find(limit: number, offset: number): Promise<Listing[]> {
    return await this.prisma.listing.findMany({
      take: limit,
      skip: offset,
    });
  }

  async findById(id: string): Promise<Listing> {
    return await this.prisma.listing.findUnique({
      where: {
        id,
      },
    });
  }

  async findByQuery(
    queryParams: ListingQuery,
    limit: number,
    offset: number
  ): Promise<Listing[]> {
    const query: Prisma.ListingWhereInput = {};
    const {
      userId,
      categoryId,
      roomCount,
      guestCount,
      bathroomCount,
      location,
      startDate,
      endDate,
    } = queryParams;

    if (userId) {
      query.userId = userId;
    }

    if (categoryId) {
      query.categoryId = categoryId;
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      };
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      };
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      };
    }

    if (location) {
      query.location = location;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }

    return await this.prisma.listing.findMany({
      where: query,
      take: limit,
      skip: offset,
    });
  }

  async create({
    title,
    description,
    images,
    price,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    userId,
    categoryId,
  }: CreateListingInput): Promise<Listing> {
    const newListing = {
      title,
      description,
      images,
      price,
      roomCount,
      bathroomCount,
      guestCount,
      location,
      userId,
      categoryId,
    };

    return await this.prisma.listing.create({ data: newListing });
  }

  async update(
    id: string,
    {
      title,
      description,
      images,
      price,
      roomCount,
      bathroomCount,
      guestCount,
      location,
      categoryId,
    }: UpdateListingInput
  ): Promise<Listing> {
    const newListing = {
      title,
      description,
      images,
      price,
      roomCount,
      bathroomCount,
      guestCount,
      location,
      categoryId,
    };

    return await this.prisma.listing.update({
      where: { id },
      data: newListing,
    });
  }

  async delete(id: string): Promise<Listing> {
    return await this.prisma.listing.delete({
      where: { id },
    });
  }
}
