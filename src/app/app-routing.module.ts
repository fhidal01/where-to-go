import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { LoginGuardService } from './guards/login-guard.service';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', pathMatch: 'full', component: LoginComponent, canActivate: [LoginGuardService] },
  { path: 'home', pathMatch: 'full', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'results', pathMatch: 'full', component: ResultsComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
