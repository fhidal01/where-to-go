import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { AuthService } from '../services/auth.service';
import { LocationService, COORDINATE_TYPE } from '../services/location.service';
import { PlacesService } from '../services/places.service';
import { tick } from '@angular/core/src/render3';

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
  address = '';
  predictions: Array<any> = new Array<any>();
  selectedItem: any;
  selectedIndex = -1;
  fetchingCurrentLocation: boolean;
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

  getCurrentLocation() {
    this.fetchingCurrentLocation = true;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.currentLocationSuccess.bind(this), this.currentLocationFailure);
    } else {
      this.fetchingCurrentLocation = false;
      console.log('Geolocation is not supported by this browser.');
    }
  }

  private currentLocationSuccess(position) {
    this.address = 'Current Location';
    this.fetchingCurrentLocation = false;
    this.fetchImage(`${position.coords.latitude},${position.coords.longitude}`);
    this.searchByGeoCode(position.coords.latitude, position.coords.longitude);
  }

  private currentLocationFailure(error) {
    this.fetchingCurrentLocation = false;
    console.log(error.message);
  }

  fetchPredictions() {
    this.imageUrl = null;
    if (this.address.length >= 3) {
      this.locationService.getPredictions(this.address).subscribe(result => {
        this.predictions = result.predictions;
      });
    } else {
      this.clearPredictions();
    }
  }

  moveUp() {
    if (this.predictions.length > 0) {
      this.selectedIndex =
        this.selectedIndex === 0 || this.selectedIndex === -1 ? this.predictions.length : this.selectedIndex;
      this.selectedItem = this.predictions[--this.selectedIndex];
    }
  }

  moveDown() {
    if (this.predictions.length > 0) {
      this.selectedIndex = this.selectedIndex === this.predictions.length - 1 ? -1 : this.selectedIndex;
      this.selectedItem = this.predictions[++this.selectedIndex];
    }
  }

  isSelected(prediction: any) {
    return this.selectedItem ? this.selectedItem.place_id === prediction.place_id : false;
  }

  fetchImage(address, fetchingCurrent = false) {
    if (this.selectedIndex !== -1 && !fetchingCurrent) {
      this.address = this.predictions[this.selectedIndex].description;
    }
    this.clearPredictions();
    this.imageUrl = `${this.apiURL}/map?address=${address}`;
  }

  optionClick(option) {
    this.address = option;
    this.fetchImage(this.address);
  }

  searchByAddress() {
    if (this.selectedIndex !== -1) {
      this.address = this.predictions[this.selectedIndex].description;
    }
    this.searching = true;
    this.fetchCoordinatesAndPlaces(COORDINATE_TYPE.ADDRESS, this.address);
  }

  searchByPlaceID(placeId) {
    this.searching = true;
    this.fetchCoordinatesAndPlaces(COORDINATE_TYPE.PLACE, placeId);
  }

  searchByGeoCode(latitude, longitude) {
    this.searching = true;
    this.getPlaces(latitude, longitude);
  }

  private fetchCoordinatesAndPlaces(coordinateType: COORDINATE_TYPE, location: string): any {
    this.locationService.getCoordinates(coordinateType, location).subscribe(value => {
      const latitude = (value as MyResponse).results[0].geometry.location.lat;
      const longitude = (value as MyResponse).results[0].geometry.location.lng;

      this.getPlaces(latitude, longitude);
    });
  }

  private getPlaces(latitude, longitude) {
    this.placesService.getPlaces(latitude, longitude).subscribe(places => {
      this.places = (places as MyResponse).results;
      this.searching = false;

      console.log(this.places);
    });
  }

  private clearPredictions() {
    this.predictions.length = 0;
    this.selectedIndex = -1;
  }

  getDetails(placeId) {
    // this.placesService.getPlaceDetails(placeId)
    //   .subscribe((value: any) => {
    //     this.placeDetails = value.result;
    //     this.detailsReady = true;
    //   });
  }
}
