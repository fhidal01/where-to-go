import { Location } from './Location.model';
import { Bounds } from './Bounds.model';

export interface Geometry {
  bounds: Bounds;
  location: Location;
  location_type: string;
  viewport: Bounds;
}
