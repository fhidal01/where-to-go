import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class PlacesService {
  private apiURL: string;

  constructor(private http: HttpClient) {
    this.apiURL = environment.api.baseURL;
  }

  getPlaces(latitude, longitude): Observable<any> {
    return this.http.get(`${this.apiURL}/places?latitude=${latitude}&longitude=${longitude}`);
  }

  getPlaceDetails(id) {
    return this.http.get(`${this.apiURL}/placeDetails?place=${id}`);
  }
}
