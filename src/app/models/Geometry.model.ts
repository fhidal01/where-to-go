import { Location } from './Location.model';
import { Bounds } from './Bounds.model';

export interface Geometry {
  location: Location;
  viewport: Bounds;
}

export interface CoordinatesGeometry {
  bounds: Bounds;
  location: Location;
  location_type: string;
  viewport: Bounds;
}
