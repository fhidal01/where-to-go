import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { AuthService } from '../services/auth.service';
import { LocationService, COORDINATE_TYPE } from '../services/location.service';
import { PlacesService } from '../services/places.service';
import { ModalService } from '../modal/modal.service';

import browser from 'browser-detect';
import { BrowserDetectInfo } from 'browser-detect/dist/types/browser-detect.interface';

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
  modalMsg: any;

  private apiURL: string;

  browser: any = {};

  constructor(
    private http: HttpClient,
    public authserv: AuthService,
    private placesService: PlacesService,
    private locationService: LocationService,
    private modalService: ModalService
  ) {
    this.apiURL = environment.api.baseURL;
    this.browser = this.setBrowserOS(browser());
  }

  private setBrowserOS(browserInfo: BrowserDetectInfo): BrowserDetectInfo {
    const brws = browserInfo;

    if (browserInfo.os === undefined) {
      brws.os = 'OTHER';
    } else if (browserInfo.os === 'OS X') {
      brws.os = 'IOS';
    } else if (browserInfo.os.includes('Android')) {
      brws.os = 'ANDROID';
    } else {
      brws.os = 'OTHER';
    }

    return brws;
  }

  native() {
    window.open('maps://maps.google.com/maps?daddr=lat,long&amp;ll=');
  }
  web() {
    window.open('https://maps.google.com/maps?daddr=lat,long&amp;ll=');
  }

  getCurrentLocation() {
    this.fetchingCurrentLocation = true;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.currentLocationSuccess.bind(this),
        this.currentLocationFailure.bind(this)
      );
    } else {
      this.fetchingCurrentLocation = false;
      this.modalMsg = 'not supported';
      this.openModal('geo-not-supported');
    }
  }

  private currentLocationSuccess(position) {
    this.address = 'Current Location';
    this.fetchingCurrentLocation = false;
    this.fetchImage(`${position.coords.latitude},${position.coords.longitude}`);
    this.searchByGeoCode(position.coords.latitude, position.coords.longitude);
  }

  fetchImage(address) {
    if (this.selectedIndex !== -1) {
      this.address = this.predictions[this.selectedIndex].description;
    }
    this.clearPredictions();
    this.imageUrl = `${this.apiURL}/map?address=${address}`;
  }

  private currentLocationFailure(error) {
    this.fetchingCurrentLocation = false;
    this.modalMsg = `${error.code}) ${error.message}`;
    console.log(error);
    this.openModal('geo-not-enabled');
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

  openModal(id: string) {
    console.log('clicked');
    this.modalService.open(id);
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }
}
