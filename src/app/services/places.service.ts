import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HomeComponent } from '../home/home.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Place } from '../models/Place.model';
import { MyResponse } from '../models/MyResponse.model';

@Injectable()
export class PlacesService {
  private apiURL: string;
  places: Array<Place>;

  constructor(private http: HttpClient, private router: Router) {
    this.apiURL = environment.api.baseURL;
  }

  getPlaces(latitude, longitude): void {
    this.http.get(`${this.apiURL}/places?latitude=${latitude}&longitude=${longitude}`).subscribe(places => {
      this.places = (places as MyResponse<Place>).results;
      console.log(this.places);
      this.router.navigate(['/results']);
    });
  }

  getPlaceDetails(id) {
    return this.http.get(`${this.apiURL}/placeDetails?place=${id}`);
  }
}
