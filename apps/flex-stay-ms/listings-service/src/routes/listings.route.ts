import express from 'express';

import { ListingsController } from '../controllers/listings.controller';
import { ListingRepository } from '../repositories/listings.repository';
import { ListingsService } from '../services/listings.service';
import { validate } from '@flex-stay/utils';
import { createListingSchema, updateListingSchema } from '@flex-stay/schemas';

const router = express.Router();

const repository = new ListingRepository();
const service = new ListingsService(repository);
const controller = new ListingsController(service);

router.get('/health', (req, res) => {
  return res.status(200).json({ message: 'Welcome to listings service!' });
});
router.get('/', controller.onGetListings.bind(controller));
router.get('/:listingId', controller.onGetListingById.bind(controller));
router.post(
  '/',
  validate(createListingSchema),
  controller.onCreateListing.bind(controller)
);
router.put(
  '/:listingId',
  validate(updateListingSchema),
  controller.onUpdateListing.bind(controller)
);
router.delete('/:listingId', controller.onDeleteListing.bind(controller));

export default router;
