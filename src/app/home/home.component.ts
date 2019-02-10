import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { AuthService } from '../services/auth.service';
import { LocationService, COORDINATE_TYPE } from '../services/location.service';
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
  address = '';
  binaryImage: any;
  displayImage = false;
  places: Array<Result>;
  searching = false;
  imageUrl = '';
  detailsReady;
  placeDetails;

  private apiURL: string;
  predictions: Array<any> = new Array<any>();

  constructor(
    private http: HttpClient,
    public authserv: AuthService,
    private placesService: PlacesService,
    private locationService: LocationService
  ) {
    this.apiURL = environment.api.baseURL;
  }

  fetchPredictions() {
    this.imageUrl = null;
    if (this.address.length >= 3) {
      this.locationService.getPredictions(this.address).subscribe(
        result => {
          this.predictions = result.predictions;
        }
      );
    } else {
      this.clearPredictions();
    }
  }

  fetchImage() {
    this.clearPredictions();
    this.imageUrl = `${this.apiURL}/map?address=${this.address}`;
  }

  searchByAddress() {
    this.searching = true;
    this.fetchCoordinatesAndPlaces(COORDINATE_TYPE.ADDRESS, this.address);
  }

  searchByPlaceID(placeId) {
    this.searching = true;
    this.fetchCoordinatesAndPlaces(COORDINATE_TYPE.PLACE, placeId);
  }


  private fetchCoordinatesAndPlaces(coordinateType: COORDINATE_TYPE, location: string): any {
  this.locationService.getCoordinates(coordinateType, location).subscribe(
    value => {
      const latitude = (value as MyResponse).results[0].geometry.location.lat;
      const longitude = (value as MyResponse).results[0].geometry.location.lng;

      this.placesService.getPlaces(latitude, longitude).subscribe(
        places => {
          this.places = (places as MyResponse).results;
          this.searching = false;

          console.log(this.places);
        }
      );
    }
  );
}

  private clearPredictions() {
  this.predictions.length = 0;
}

getDetails(placeId) {
  // this.placesService.getPlaceDetails(placeId)
  //   .subscribe((value: any) => {
  //     this.placeDetails = value.result;
  //     this.detailsReady = true;
  //   });
}

}
