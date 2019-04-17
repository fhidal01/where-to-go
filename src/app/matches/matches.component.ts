import { Component, OnInit } from '@angular/core';
import { MatchesService } from '../services/matches.service';
import { environment } from '../../environments/environment';
import { PlaceDetails } from '../models/PlaceDetails.model';
@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {
  public apiURL: string;

  constructor(public matchesService: MatchesService) {
    this.apiURL = environment.api.baseURL;
  }

  ngOnInit() {}

  openDetails() {
    console.log('Opening details');
  }

  chooseForMe() {
    this.matchesService.chooseRandomMatch();
  }

  undo() {
    this.matchesService.undo();
  }
}
