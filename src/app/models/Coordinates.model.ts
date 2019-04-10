import { AddressComponent } from './AddressComponent.model';
import { Geometry } from './Geometry.model';

export interface Coordinates {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: Geometry;
  place_id: string;
  types: string[];
}
