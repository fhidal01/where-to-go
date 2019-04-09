import { TestBed, async, inject } from '@angular/core/testing';

import { MatchesGuard } from './matches.guard';

describe('MatchesGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatchesGuard]
    });
  });

  it('should ...', inject([MatchesGuard], (guard: MatchesGuard) => {
    expect(guard).toBeTruthy();
  }));
});
