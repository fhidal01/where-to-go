import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { AuthService } from '../services/auth.service';
import { HomeComponent } from '../home/home.component';

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

@Component({
  selector: 'app-home',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  public places: Array<Result>;

  private apiURL: string;

  browser: any = {};

  constructor(private homecomp: HomeComponent, private http: HttpClient, public authserv: AuthService) {
    this.apiURL = environment.api.baseURL;
    this.browser = this.setBrowserOS(browser());
    this.places = this.homecomp.places;
  }
  ngOnInit() {
    console.log(this.places);
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

  //getDetails(placeId) {
  // this.placesService.getPlaceDetails(placeId)
  //   .subscribe((value: any) => {
  //     this.placeDetails = value.result;
  //     this.detailsReady = true;
  //   });
  //}
}
