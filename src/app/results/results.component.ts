import { Component, OnInit, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { AuthService } from '../services/auth.service';
import { PlacesService } from '../services/places.service';
import { PlaceDetails } from '../models/PlaceDetails.model';

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
import { Place } from '../models/Place.model';
import { MatchesService } from '../services/matches.service';

@Component({
  selector: 'app-home',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements AfterViewInit, OnInit {
  @ViewChild('myswing1') swingStack: SwingStackComponent;
  @ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;
  currentMatch: PlaceDetails;
  currentReject: PlaceDetails;
  public allPlaceDetails: Array<PlaceDetails> = [];
  cards: Array<any>;
  card;
  stackConfig: StackConfig;
  private apiURL: string;
  browser: any = {};

  constructor(
    private placesserv: PlacesService,
    private http: HttpClient,
    public authserv: AuthService,
    public matchserv: MatchesService
  ) {
    this.apiURL = environment.api.baseURL;
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

    this.apiURL = environment.api.baseURL;
    this.browser = this.setBrowserOS(browser());
    this.allPlaceDetails = this.placesserv.allPlaceDetails;
  }
  //ngOnInit() {}
  ngAfterViewInit() {
    console.log(this.allPlaceDetails);
    console.log(this.swingStack); // this is the stack
    console.log(this.swingCards); // this is a list of cards

    this.swingStack.throwoutright.subscribe((event: ThrowEvent) => {
      this.currentMatch = this.allPlaceDetails.pop();
      this.matchserv.matches.push(this.currentMatch);
      console.log('Accepted');
      console.log(this.matchserv.matches);
    });
    this.swingStack.throwoutleft.subscribe((event: ThrowEvent) => {
      this.currentReject = this.allPlaceDetails.pop();
      this.matchserv.rejects.push(this.currentReject);
      console.log('Denied');
      console.log(this.matchserv.rejects);
    });
  }

  ngOnInit() {}

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
