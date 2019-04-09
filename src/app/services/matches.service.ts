import { Injectable } from '@angular/core';

@Injectable()
export class MatchesService {
  public matches: Array<any>;

  constructor() {
    this.matches = new Array();
    this.populate(1);
  }

  private populate(matches: number) {
    let iterations = 1;
    while (iterations <= matches) {
      this.matches.push({
        id: iterations,
        name: 'The Daily Kitchen The Daily Kitchen The Daily Kitchen',
        image: 'https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png'
      });
      iterations++;
    }
  }

  public chooseRandomMatch() {
    return this.matches[Math.floor(Math.random() * this.matches.length)];
  }
}
