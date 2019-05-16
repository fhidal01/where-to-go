import { Component, OnInit, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { AuthService } from '../services/auth.service';
import { PlacesService } from '../services/places.service';
import { PlaceDetails } from '../models/PlaceDetails.model';
import { Router } from '@angular/router';
//rf: no need
import browser from 'browser-detect';
//rf: no need
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
//rf: no need
import { Place } from '../models/Place.model';
import { MatchesService } from '../services/matches.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements AfterViewInit {
  @ViewChild('placeStack') swingStack: SwingStackComponent;
  @ViewChildren('place') swingCards: QueryList<SwingCardComponent>;

  public allPlaceDetails: Array<PlaceDetails> = [];
  stackConfig: StackConfig;
  private apiURL: string;

  constructor(
    private placesServ: PlacesService,
    public authServ: AuthService,
    public matchServ: MatchesService,
    public router: Router
  ) {
    this.apiURL = environment.api.baseURL;
    this.allPlaceDetails = this.placesServ.places;
    this.stackConfig = {
      allowedDirections: [Direction.LEFT, Direction.RIGHT],
      throwOutConfidence: (offsetX: number, offsetY: number, targetElement: HTMLElement) => {
        // you would put ur logic based on offset & targetelement to determine
        // what is your throwout confidence
        const xConfidence = Math.min(Math.abs(offsetX) / targetElement.offsetWidth, 1);
        const yConfidence = Math.min(Math.abs(offsetY) / targetElement.offsetHeight, 1);

        return Math.max(xConfidence, yConfidence);
      },
      minThrowOutDistance: 400
    };
  }

  ngAfterViewInit() {
    console.log(this.allPlaceDetails);
    if (this.allPlaceDetails === undefined) {
      this.router.navigate(['/home']);
    }

    this.swingStack.throwoutright.subscribe((event: ThrowEvent) => {
      this.matchServ.matches.push(this.allPlaceDetails.pop());
      console.log('Accepted');
      console.log(this.matchServ.matches);
    });

    this.swingStack.throwoutleft.subscribe((event: ThrowEvent) => {
      this.matchServ.rejects.push(this.allPlaceDetails.pop());
      console.log('Denied');
      console.log(this.matchServ.rejects);
    });
  }
}
