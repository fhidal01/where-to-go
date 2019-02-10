import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class LocationService {

  private apiURL: string;

  public COORDINATE_TYPE = {
    ADDRESS: 'address',
    PLACE: 'place_id'
  };

  constructor(private http: HttpClient) {
    this.apiURL = environment.api.baseURL;
  }

  getCoordinates(type: string, address: string): Observable<any> {
    return this.http.get(`${this.apiURL}/coordinates?type=${type}&address=${address}`);
  }

  getPredictions(input: string): Observable<any> {
    return this.http.get(`${this.apiURL}/location/autocomplete?input=${input}`);
  }

}

export enum COORDINATE_TYPE {
  ADDRESS = 'address',
  PLACE = 'place_id'
}
