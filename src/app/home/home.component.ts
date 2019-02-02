import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';

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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title = 'where-to-go';
  address: String = '';
  binaryImage: any;
  displayImage = false;
  places: Array<Result>;
  searching = false;
  imageUrl = '';
  detailsReady;
  placeDetails;

  url = 'https://us-central1-where-to-go-2acea.cloudfunctions.net';


  private apiURL;
  constructor(private http: HttpClient, private sanitizer: DomSanitizer, public authserv: AuthService) {
    this.apiURL = environment.api.baseURL;
  }

  search() {
    this.searching = true;
    // this.authserv.userDetails.getIdToken(true).then(token => {
      // const defaultHeaders = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
      this.imageUrl = `${this.apiURL}/map?address=${this.address}`;

      this.http.get(`${this.apiURL}/coordinates?address=${this.address}`)
        .subscribe(value => {
          const latitude = (value as MyResponse).results[0].geometry.location.lat;
          const longitude = (value as MyResponse).results[0].geometry.location.lng;

          this.http.get(`${this.apiURL}/places?latitude=${latitude}&longitude=${longitude}`)
            .subscribe(places => {
              this.places = (places as MyResponse).results;
              this.searching = false;
            });

        });
    // });
  }


  getDetails(placeId) {

    this.http.get(`${this.apiURL}/placeDetails?place=${placeId}`)
      .subscribe((value: any) => {
        console.log(value.result);
        this.placeDetails = value.result;
        this.detailsReady = true;
      });
  }

}
