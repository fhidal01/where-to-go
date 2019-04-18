import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable()
export class LocationService {
  private apiURL: string;

  public COORDINATE_TYPE = {
    ADDRESS: 'address',
    PLACE: 'place_id'
  };
  ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) {
    this.apiURL = environment.api.baseURL;
  }

  getCoordinates(type: string, address: string): Observable<any> {
    return this.http.get(`${this.apiURL}/coordinates?type=${type}&address=${address}`);
  }

  getPredictions(input: string): Observable<any> {
    this.ngUnsubscribe.next();
    return this.http.get(`${this.apiURL}/location/autocomplete?input=${input}`).pipe(takeUntil(this.ngUnsubscribe));
  }
}

export enum COORDINATE_TYPE {
  ADDRESS = 'address',
  PLACE = 'place_id'
}
