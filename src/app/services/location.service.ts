import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class LocationService {

  private apiURL: string;

  constructor(private http: HttpClient) {
    this.apiURL = environment.api.baseURL;
  }

  getCoordinates(address): Observable<any> {
    return this.http.get(`${this.apiURL}/coordinates?address=${address}`);
  }

}
