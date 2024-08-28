export interface Listing {
  id: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  location: string;
  userId: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ListingQuery {
  id?: string;
  title?: string;
  price?: number;
  bathroomCount?: string;
  roomCount?: number;
  guestCount?: number;
  location?: string;
  userId?: string;
  categoryId?: string;
  startDate?: string;
  endDate?: string;
}
