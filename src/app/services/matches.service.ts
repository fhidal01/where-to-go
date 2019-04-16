import { Injectable } from '@angular/core';
import { pullAt } from 'lodash';
import { Place } from '../models/Place.model';
import { Scope } from '../models/Scope.model';
import { PlaceType } from '../models/PlaceType.model';
import { PlaceDetails } from '../models/PlaceDetails.model';
@Injectable()
export class MatchesService {
  public dummyMatches: Array<Place>;
  public matches: Array<PlaceDetails>;
  public rejects: Array<PlaceDetails>;

  constructor() {
    this.matches = new Array();
    this.rejects = new Array();
    //this.populate(5);
  }

  private populate(matches: number) {
    const dummyPlace = {
      geometry: {
        location: {
          lat: 37.6207342,
          lng: -77.61331439999999
        },
        viewport: {
          northeast: {
            lat: 37.62200303029149,
            lng: -77.6119148197085
          },
          southwest: {
            lat: 37.6193050697085,
            lng: -77.61461278029151
          }
        }
      },
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png',
      id: 'c6fbf6193b2f6743abbf3104ef5b1d040b0b1dad',
      name: 'Ciao Capri',
      opening_hours: {
        open_now: false
      },
      photos: [
        {
          height: 2988,
          html_attributions: [
            '\u003ca href="https://maps.google.com/maps/contrib/114483796399143566596/photos"\u003eMichael Stephens\u003c/a\u003e'
          ],
          photo_reference:
            'CmRaAAAAlQdsmTD6xeITVhthgyndjmDlHI0iqIpi2xdyl_C3K5jn0DpQHegTqbcIHa8kTdLY6A9vU-6d86CDWcwmmqWZddJL76_rSDl9xva4sXarZWR9-FWxCQNxIa1P4EGtvPf9EhCixx6q5slIIeAeGhg7wfBYGhRuH9Ba5JJ0q2MsVxMNQT8-_wlbaA',
          width: 5312
        }
      ],
      place_id: 'ChIJE2q_TqtrsYkREReB0FdND_Y',
      plus_code: {
        compound_code: 'J9CP+7M Henrico, Three Chopt, VA, United States',
        global_code: '8794J9CP+7M'
      },
      rating: 4.8,
      reference: 'ChIJE2q_TqtrsYkREReB0FdND_Y',
      scope: Scope.Google,
      types: [PlaceType.Restaurant, PlaceType.PointOfInterest, PlaceType.Food, PlaceType.Establishment],
      user_ratings_total: 33,
      vicinity: '10478 Ridgefield Parkway, Henrico'
    };
    let iterations = 1;
    while (iterations <= matches) {
      this.dummyMatches.push(dummyPlace);
      iterations++;
    }
  }

  public chooseRandomMatch(): void {
    const selectedMatch = pullAt(this.matches, Math.floor(Math.random() * this.matches.length));
    this.rejects = this.matches;
    this.matches = selectedMatch;

    console.log({ m: this.matches, r: this.rejects });
  }

  public undo() {
    this.matches = [...this.matches, ...this.rejects];
  }
}
