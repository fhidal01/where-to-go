import { AddressComponent } from './AddressComponent.model';
import { CoordinatesGeometry } from './Geometry.model';

export interface Coordinates {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: CoordinatesGeometry;
  place_id: string;
  types: string[];
}
