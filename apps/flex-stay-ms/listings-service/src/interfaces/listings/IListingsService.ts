import { CreateListingInput, UpdateListingInput } from '@flex-stay/schemas';
import { Listing, ListingQuery } from '@flex-stay/shared-types';

export interface IListingsService {
  getListings(limit: number, offset: number): Promise<Listing[]>;
  getListingById(listingId: string): Promise<Listing>;
  getListingsByQuery(
    query: ListingQuery,
    limit: number,
    offset: number
  ): Promise<Listing[]>;
  createListing(data: CreateListingInput): Promise<Listing>;
  updateListing(id: string, data: UpdateListingInput): Promise<Listing>;
  deleteListing(id: string): Promise<Listing>;
}
