import { NextFunction, Request, Response } from 'express';
import { ListingsService } from '../services/listings.service';
import { ListingQuery } from '@flex-stay/shared-types';
import { CreateListingInput, UpdateListingInput } from '@flex-stay/schemas';

export class ListingsController {
  private service: ListingsService;

  constructor(_listingsService: ListingsService) {
    this.service = _listingsService;
  }

  async onGetListings(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = Number(req.query['limit']) || 10;
      const offset = Number(req.query['offset']) || 0;
      const listings = await this.service.getListings(limit, offset);

      return res.status(200).json({
        status: 'success',
        data: {
          listings,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async onGetListingById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = <{ id: string }>req.params;
      const listing = await this.service.getListingById(id);

      return res.status(200).json({
        status: 'success',
        data: {
          listing,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async onGetSearchListings(req: Request, res: Response, next: NextFunction) {
    try {
      const query = <ListingQuery>req.query;
      const limit = Number(req.query['limit']) || 10;
      const offset = Number(req.query['offset']) || 0;
      const listings = await this.service.getListingsByQuery(
        query,
        limit,
        offset
      );

      return res.status(200).json({
        status: 'success',
        data: {
          listings,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async onCreateListing(req: Request, res: Response, next: NextFunction) {
    try {
      const data = <CreateListingInput>req.body;
      const newListing = await this.service.createListing(data);

      return res.status(200).json({
        status: 'success',
        data: {
          listing: newListing,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async onUpdateListing(req: Request, res: Response, next: NextFunction) {
    try {
      const { listingId } = <{ listingId: string }>req.params;
      const data = <UpdateListingInput>req.body;
      const updatedListing = await this.service.updateListing(listingId, data);

      return res.status(200).json({
        status: 'success',
        data: {
          listing: updatedListing,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async onDeleteListing(req: Request, res: Response, next: NextFunction) {
    try {
      const { listingId } = <{ listingId: string }>req.params;
      const deletedListing = await this.service.deleteListing(listingId);

      return res.status(200).json({
        status: 'success',
        data: {
          listing: deletedListing,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
