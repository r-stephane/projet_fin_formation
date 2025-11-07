import { Routes } from '@angular/router';
import { Login } from './projects/login/login';
import { Dashboard } from './projects/dashboard/dashboard';
import { ForgotPassword } from './projects/forgot-password/forgot-password';
import { ResetPassword } from './projects/reset-password/reset-password';
import { Register } from './projects/register/register';
import { Contact } from './projects/contact/contact';
import { Problemes } from './projects/problemes/problemes';
import { Solutions } from './projects/solutions/solutions';
import { Discussion } from './projects/discussion/discussion';

export const routes: Routes = [
  { path: 'projects', component: Login },
  { path: 'projects/login', component: Login },
  { path: 'projects/dashboard', component: Dashboard },
  { path: 'projects/forgot-password', component: ForgotPassword },
  { path: 'projects/reset-password', component: ResetPassword },
  { path: 'projects/register', component: Register },
  { path: 'projects/contact', component: Contact },
  { path: 'projects/problemes', component: Problemes },
  { path: 'projects/solutions', component: Solutions },
  { path: 'projects/discussion', component: Discussion },
  { path: '**', redirectTo: 'projects/login' },
];
