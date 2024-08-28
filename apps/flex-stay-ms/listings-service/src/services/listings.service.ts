import { Listing, ListingQuery } from '@flex-stay/shared-types';

import { IListingsService } from '../interfaces/listings/IListingsService';
import { ListingRepository } from '../repositories/listings.repository';
import { APIError, NotFoundError } from '@flex-stay/utils';
import { CreateListingInput, UpdateListingInput } from '@flex-stay/schemas';

export class ListingsService implements IListingsService {
  private repository: ListingRepository;

  constructor(_listingsRespository: ListingRepository) {
    this.repository = _listingsRespository;
  }

  async getListings(limit: number, offset: number): Promise<Listing[]> {
    try {
      return await this.repository.find(limit, offset);
    } catch (error) {
      throw new NotFoundError('Error retrieving listings');
    }
  }

  async getListingById(listingId: string): Promise<Listing> {
    try {
      return await this.repository.findById(listingId);
    } catch (error) {
      throw new NotFoundError('No Listing with this id found.');
    }
  }

  async getListingsByQuery(
    query: ListingQuery,
    limit: number,
    offset: number
  ): Promise<Listing[]> {
    try {
      return await this.repository.findByQuery(query, limit, offset);
    } catch (error) {
      throw new NotFoundError('No Listings found.');
    }
  }

  async createListing(data: CreateListingInput): Promise<Listing> {
    try {
      return await this.repository.create(data);
    } catch (error) {
      throw new APIError('Error creating Listing.');
    }
  }

  async updateListing(id: string, data: UpdateListingInput): Promise<Listing> {
    try {
      return await this.repository.update(id, data);
    } catch (error) {
      throw new APIError('Error update Listing.');
    }
  }

  async deleteListing(id: string): Promise<Listing> {
    try {
      return await this.repository.delete(id);
    } catch (error) {
      throw new APIError('Error delete Listing.');
    }
  }
}
