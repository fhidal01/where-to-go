import { Injectable } from '@angular/core';

@Injectable()
export class MatchesService {
  public matches: Array<any>;

  constructor() {
    this.matches = new Array();
    this.matches.push(1);
    this.matches.push(2);
  }
}
