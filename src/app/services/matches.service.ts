import { Injectable } from '@angular/core';
import { pullAt } from 'lodash';
@Injectable()
export class MatchesService {
  public matches: Array<any>;
  public rejects: Array<any>;

  constructor() {
    this.matches = new Array();
    this.rejects = new Array();
    this.populate(5);
  }

  private populate(matches: number) {
    let iterations = 1;
    while (iterations <= matches) {
      this.matches.push({
        id: iterations,
        name: 'The Daily Kitchen The Daily Kitchen The Daily Kitchen',
        image: 'assets/temp/food.jpg'
      });
      iterations++;
    }
  }

  public chooseRandomMatch(): void {
    const selectedMatch = pullAt(this.matches, Math.floor(Math.random() * this.matches.length));
    this.rejects = this.matches;
    this.matches = selectedMatch;

    console.log({ m: this.matches, r: this.rejects });
  }

  public undo() {
    this.matches = [...this.matches, ...this.rejects];
  }
}
