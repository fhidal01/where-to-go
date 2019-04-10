import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { AuthService } from '../services/auth.service';
import { PlacesService } from '../services/places.service';

import browser from 'browser-detect';
import { BrowserDetectInfo } from 'browser-detect/dist/types/browser-detect.interface';
import {
  StackConfig,
  Stack,
  Card,
  ThrowEvent,
  DragEvent,
  Direction,
  SwingStackComponent,
  SwingCardComponent
} from 'angular2-swing';

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
interface AfterViewInit {
  ngAfterViewInit(): void;
}

@Component({
  selector: 'app-home',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements AfterViewInit {
  @ViewChild('myswing1') swingStack: SwingStackComponent;
  @ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;
  public places: Array<Result>;
  cards: Array<any>;
  stackConfig: StackConfig;

  private apiURL: string;
  browser: any = {};

  constructor(private placesserv: PlacesService, private http: HttpClient, public authserv: AuthService) {
    this.stackConfig = {
      allowedDirections: [Direction.LEFT, Direction.RIGHT],
      throwOutConfidence: (offsetX: number, offsetY: number, targetElement: HTMLElement) => {
        // you would put ur logic based on offset & targetelement to determine
        // what is your throwout confidence
        const xConfidence = Math.min(Math.abs(offsetX) / targetElement.offsetWidth, 1);
        const yConfidence = Math.min(Math.abs(offsetY) / targetElement.offsetHeight, 1);

        return Math.max(xConfidence, yConfidence);
      },
      minThrowOutDistance: 400 // default value is 400
    };
    this.cards = [{ name: 'clubs', symbol: '♣' }, { name: 'diamonds', symbol: '♦' }, { name: 'spades', symbol: '♠' }];
    this.apiURL = environment.api.baseURL;
    this.browser = this.setBrowserOS(browser());
    this.places = this.placesserv.places;
  }
  //ngOnInit() {}
  ngAfterViewInit() {
    console.log(this.swingStack); // this is the stack
    console.log(this.swingCards); // this is a list of cards
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

  // getPlaces(){
  //   this.places =
  // }

  //getDetails(placeId) {
  // this.placesService.getPlaceDetails(placeId)
  //   .subscribe((value: any) => {
  //     this.placeDetails = value.result;
  //     this.detailsReady = true;
  //   });
  //}
}
