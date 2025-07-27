import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { ChartFormComponent } from './charts/chart-form/chart-form';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'charts', component: ChartFormComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
