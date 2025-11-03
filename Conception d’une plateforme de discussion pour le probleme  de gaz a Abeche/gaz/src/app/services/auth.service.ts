import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; // Pour intercepter la réponse de login

// URL de base de ton backend (à adapter selon ton environnement)
const BASE_URL = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  /**
   * Tente de connecter l'utilisateur.
   * Utilise 'tap' pour sauvegarder le token localement en cas de succès.
   */
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${BASE_URL}/login`, { email, password }).pipe(
      tap(response => {
        // Supposons que votre backend retourne un token (e.g., response.token)
        if (response && response.token) {
          localStorage.setItem('authToken', response.token);
        }
      })
    );    
  }

  /**
   * Tente d'enregistrer un nouvel utilisateur.
   */
  register(nom: string, prenom: string, email: string, password: string, confirmPassword: string): Observable<any> {
    // Correction : les mots de passe sont des 'string'
    return this.http.post(`${BASE_URL}/register`, { nom, prenom, email, password, confirmPassword });
  }

  /**
   * Vérifie si l'utilisateur est actuellement connecté.
   * Cette méthode est synchrone et résout l'erreur TS2339.
   */
  isLoggedIn(): boolean {
    // Vérifie simplement la présence du token.
    return !!localStorage.getItem('authToken'); 
  }

  /**
   * Déconnecte l'utilisateur.
   */
  logout(): void {
    // Supprime le token localement
    localStorage.removeItem('authToken');
    // Facultatif : faire un appel au backend pour invalider le token côté serveur
    // this.http.get(`${BASE_URL}/logout`).subscribe(); 
  }
  
  // Reste de vos méthodes (peut-être renommer layout() en quelque chose de plus clair si ce n'est pas une déconnexion)
  resetPassword(email: string): Observable<any> {
    return this.http.post(`${BASE_URL}/reset-password`, { email });
  }
  
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${BASE_URL}/forgot-password`, { email });
  }
  
  layout(): Observable<any> {
    return this.http.get(`${BASE_URL}/layout`);
  }
}