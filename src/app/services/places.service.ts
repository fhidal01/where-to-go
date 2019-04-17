import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Place } from '../models/Place.model';
import { PlaceDetails } from '../models/PlaceDetails.model';

@Injectable()
export class PlacesService {
  private apiURL: string;
  places: Array<Place>;
  public allPlaceDetails: Array<PlaceDetails>;

  constructor(private http: HttpClient, private router: Router) {
    this.apiURL = environment.api.baseURL;
  }

  getPlaces(latitude, longitude): Observable<any> {
    return this.http.get(`${this.apiURL}/places?latitude=${latitude}&longitude=${longitude}`);
  }

  getPlaceDetails(id) {
    return this.http.get(`${this.apiURL}/placeDetails?place=${id}`);
  }
}
