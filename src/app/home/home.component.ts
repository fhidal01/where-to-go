import { Component, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { AuthService } from '../services/auth.service';
import { LocationService, COORDINATE_TYPE } from '../services/location.service';
import { PlacesService } from '../services/places.service';
import { ModalService } from '../modal/modal.service';

import browser from 'browser-detect';
import { BrowserDetectInfo } from 'browser-detect/dist/types/browser-detect.interface';

import { MyResponse } from '../models/MyResponse.model';
import { Coordinates } from '../models/Coordinates.model';
import { Place } from '../models/Place.model';
import { MatchesService } from '../services/matches.service';
import { PlaceDetails } from '../models/PlaceDetails.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  address = '';
  predictions: Array<any> = new Array<any>();
  selectedItem: any;
  selectedIndex = -1;
  fetchingCurrentLocation: boolean;
  //rf: no need
  places: Array<Place>;
  searching = false;
  imageUrl = '';
  //rf: no need
  detailsReady;
  //rf: no need
  placeDetails;
  //rf: no need
  allPlaceDetails: Array<PlaceDetails> = [];
  modalMsg: any;

  private apiURL: string;

  browser: any = {};

  private coordinateSub: Subscription;
  private predictionSub: Subscription;
  private placesSub: Subscription;

  constructor(
    private http: HttpClient,
    public authserv: AuthService,
    private placesService: PlacesService,
    private locationService: LocationService,
    private modalService: ModalService,
    private matchesService: MatchesService
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

  // native() {
  //   window.open(
  //     'https://maps.apple.com/?address=Corso%20Italia%2020,%2001100%20Viterbo,%20Province%20of%20Viterbo,%20Italy&ll=42.418399,12.106154&t=m'
  //   );
  // }
  // web() {
  //   window.open('https://maps.google.com/maps?daddr=lat,long&amp;ll=');
  // }

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
    this.locationService.ngUnsubscribe.next();
    this.imageUrl = null;
    if (this.address.length >= 3) {
      this.predictionSub = this.locationService.getPredictions(this.address).subscribe(result => {
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
    this.coordinateSub = this.locationService.getCoordinates(coordinateType, location).subscribe(value => {
      const latitude = (value as MyResponse<Coordinates>).results[0].geometry.location.lat;
      const longitude = (value as MyResponse<Coordinates>).results[0].geometry.location.lng;

      this.getPlaces(latitude, longitude);
    });
  }

  private getPlaces(latitude, longitude) {
    this.placesSub = this.placesService.getPlaces(latitude, longitude).subscribe(places => {
      //rf: direct set to this.placesService.places and type changes to Array of PlaceDetails
      this.places = (places as MyResponse<Place>).results;
      //rf: no need
      this.placesService.places = this.places;
      //rf: no need
      this.matchesService.dummyMatches = this.places;
      //rf: no need
      this.places.forEach(x => {
        this.getDetails(x.reference);
      });
      this.searching = false;
    });
  }

  private clearPredictions() {
    this.predictions.length = 0;
    this.selectedIndex = -1;
  }

  //rf: no need
  getDetails(placeId) {
    this.placesService.getPlaceDetails(placeId).subscribe((value: any) => {
      this.placeDetails = value.result;
      this.allPlaceDetails.push(this.placeDetails);
      this.detailsReady = true;
      this.placesService.allPlaceDetails = this.allPlaceDetails;
    });
  }

  openModal(id: string) {
    console.log('clicked');
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  ngOnDestroy(): void {
    this.locationService.ngUnsubscribe.complete();
    this.coordinateSub.unsubscribe();
    this.predictionSub.unsubscribe();
    this.placesSub.unsubscribe();
  }
}
