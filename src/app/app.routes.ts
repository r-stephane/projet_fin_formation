import { Routes } from '@angular/router';
import { Login } from './projects/login/login';
import { Dashboard } from './projects/dashboard/dashboard';
import { ForgotPassword } from './projects/forgot-password/forgot-password';
import { ResetPassword } from './projects/reset-password/reset-password';
import { Register } from './projects/register/register';
import { Problemes } from './projects/problemes/problemes';
import { Solutions } from './projects/solutions/solutions';
import { Discussion } from './projects/discussion/discussion';

export const routes: Routes = [
  // 1. Route par défaut : Redirigez directement vers '/login' ou '/dashboard'
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 

  // 2. Supprimez le préfixe 'projects/' de tous les chemins d'accès (paths)
  { path: 'login', component: Login }, // Anciennement 'projects/login'
  { path: 'dashboard', component: Dashboard }, // Anciennement 'projects/dashboard'
  { path: 'forgot-password', component: ForgotPassword },
  { path: 'reset-password', component: ResetPassword },
  { path: 'register', component: Register },
  { path: 'problemes', component: Problemes },
  { path: 'solutions', component: Solutions },
  { path: 'discussion', component: Discussion },
  
  // 3. Route de gestion des erreurs 404 (doit être la dernière)
  { path: '**', redirectTo: 'dashboard' }, // Redirige vers le tableau de bord pour toutes les routes inconnues
];