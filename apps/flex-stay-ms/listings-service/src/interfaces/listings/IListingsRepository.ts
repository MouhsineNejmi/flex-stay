import { CreateListingInput, UpdateListingInput } from '@flex-stay/schemas';
import { Listing, ListingQuery } from '@flex-stay/shared-types';

export interface IListingsRespository {
  find(limit: number, offset: number): Promise<Listing[]>;
  findById(id: string): Promise<Listing>;
  findByQuery(
    query: ListingQuery,
    limit: number,
    offset: number
  ): Promise<Listing[]>;
  create(data: CreateListingInput): Promise<Listing>;
  update(id: string, data: UpdateListingInput): Promise<Listing>;
  delete(id: string): Promise<Listing>;
}
