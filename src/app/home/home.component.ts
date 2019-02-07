import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { AuthService } from '../services/auth.service';
import { LocationService } from '../services/location.service';
import { PlacesService } from '../services/places.service';

interface Coordinates {
  lat: number;
  lng: number;
}
interface Location {
  location: Coordinates;
}
interface Result {
  geometry: Location;
  name: String;
}
interface MyResponse {
  results: Array<Result>;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title = 'where-to-go';
  address: String = '';
  binaryImage: any;
  displayImage = false;
  places: Array<Result>;
  searching = false;
  imageUrl = '';
  detailsReady;
  placeDetails;

  private apiURL: string;

  constructor(
    private http: HttpClient,
    public authserv: AuthService,
    private placesService: PlacesService,
    private locationService: LocationService
  ) {
    this.apiURL = environment.api.baseURL;
  }

  search() {
    this.searching = true;

    this.imageUrl = `${this.apiURL}/map?address=${this.address}`;

    this.locationService.getCoordinates(this.address).subscribe(
      value => {
        const latitude = (value as MyResponse).results[0].geometry.location.lat;
        const longitude = (value as MyResponse).results[0].geometry.location.lng;

        this.placesService.getPlaces(latitude, longitude).subscribe(
          places => {
            this.places = (places as MyResponse).results;
            this.searching = false;
          }
        );
      }
    );
  }

  getDetails(placeId) {

    this.placesService.getPlaceDetails(placeId)
      .subscribe((value: any) => {
        this.placeDetails = value.result;
        this.detailsReady = true;
      });
  }

}
