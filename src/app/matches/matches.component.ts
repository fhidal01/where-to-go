import { Component, OnInit } from '@angular/core';
import { MatchesService } from '../services/matches.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {
  constructor(public matchesService: MatchesService) {}

  ngOnInit() {}
}
