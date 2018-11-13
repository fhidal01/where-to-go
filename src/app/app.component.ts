import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'where-to-go';
  address: String = '';
  binaryImage: any;
  displayImage = false;
  places: Array<Result>;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
  }

  search() {
    this.http.get(`http://localhost:5000/where-to-go-2acea/us-central1/coordinates?address=${this.address}`)
      .subscribe(value => {
        const latitude = (value as MyResponse).results[0].geometry.location.lat;
        const longitude = (value as MyResponse).results[0].geometry.location.lng;
        console.log(latitude);
        console.log(longitude);

        this.http.get(`http://localhost:5000/where-to-go-2acea/us-central1/places?latitude=${latitude}&longitude=${longitude}`)
          .subscribe(places => {
            this.places = (places as MyResponse).results;
          });

      });
  }
}
