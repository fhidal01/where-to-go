import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { MatchesGuard } from './guards/matches.guard';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ResultsComponent } from './results/results.component';
import { MatchesComponent } from './matches/matches.component';

const routes: Routes = [
  { path: 'login', pathMatch: 'full', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'home', pathMatch: 'full', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'results', pathMatch: 'full', component: ResultsComponent, canActivate: [AuthGuard] },
  { path: 'match', pathMatch: 'full', component: MatchesComponent, canActivate: [AuthGuard, MatchesGuard] },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
