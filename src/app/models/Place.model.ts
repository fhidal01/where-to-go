import { Geometry } from './Geometry.model';
import { OpeningHours } from './OpeningHours.model';
import { Photo } from './Photo.model';
import { PlusCode } from './PlusCode.model';
import { Scope } from './Scope.model';
import { PlaceType } from './PlaceType.model';

export interface Place {
  geometry: Geometry;
  icon: string;
  id: string;
  name: string;
  opening_hours?: OpeningHours;
  photos?: Photo[];
  place_id: string;
  plus_code: PlusCode;
  price_level?: number;
  rating?: number;
  reference: string;
  scope: Scope;
  types: PlaceType[];
  user_ratings_total?: number;
  vicinity: string;
}
