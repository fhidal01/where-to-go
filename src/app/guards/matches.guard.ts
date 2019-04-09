import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatchesService } from '../services/matches.service';

@Injectable({
  providedIn: 'root'
})
export class MatchesGuard implements CanActivate {
  constructor(private matchesService: MatchesService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.matchesService.matches.length > 0) {
      return true;
    } else {
      this.router.navigate(['/home']);
    }
    return false;
  }
}
