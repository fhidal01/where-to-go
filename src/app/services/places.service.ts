import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HomeComponent } from '../home/home.component';
import { Router, ActivatedRoute } from '@angular/router';

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

@Injectable()
export class PlacesService {
  private apiURL: string;
  places: Array<Result>;

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
