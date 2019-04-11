import { AddressComponent } from './AddressComponent.model';
import { Geometry } from './Geometry.model';
import { DetailedOpeningHours } from './OpeningHours.model';
import { Photo } from './Photo.model';
import { PlusCode } from './PlusCode.model';
import { Review } from './Review.model';

export interface PlaceDetails {
  address_components: AddressComponent[];
  adr_address: string;
  formatted_address: string;
  formatted_phone_number: string;
  geometry: Geometry;
  icon: string;
  id: string;
  international_phone_number: string;
  name: string;
  opening_hours: DetailedOpeningHours;
  photos: Photo[];
  place_id: string;
  plus_code: PlusCode;
  price_level: number;
  rating: number;
  reference: string;
  reviews: Review[];
  scope: string;
  types: string[];
  url: string;
  user_ratings_total: number;
  utc_offset: number;
  vicinity: string;
  website: string;
}
