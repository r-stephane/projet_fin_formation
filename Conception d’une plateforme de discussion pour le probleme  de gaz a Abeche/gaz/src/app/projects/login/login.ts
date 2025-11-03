import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    RouterLink 
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Rediriger si déjà connecté
    // NOTE: S'assurer que 'isLoggedIn()' existe dans AuthService et retourne un boolean.
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    
    // 1. Dégager les propriétés email et password de loginForm.value
    const { email, password } = this.loginForm.value;

    // 2. S'abonner (subscribe) à l'Observable retourné par authService.login()
    this.authService.login(email, password).subscribe({
      // Bloc 'next' : le login a réussi (selon Angular/HTTP)
      next: (response) => {
        // NOTE: On suppose que la réponse contient une propriété 'success'
        // C'est ici qu'on vérifie la *réussite métier* (ex: token reçu)
        if (response && response.success) { 
          // Connexion réussie, redirection
          this.router.navigate(['/dashboard']); // Changé de /register à /dashboard, plus logique après un login.
        } else {
          // Connexion échouée selon la réponse du backend
          this.error = response ? response.message : 'Une erreur de connexion est survenue.';
        }
        this.loading = false;
      },
      // Bloc 'error' : une erreur HTTP est survenue (ex: 401 Unauthorized)
      error: (err) => {
        this.error = err.error?.message || 'Identifiants invalides ou problème de serveur.';
        this.loading = false;
      },
      // Bloc 'complete' : se produit après next ou error
      complete: () => {
        // Facultatif : des actions à exécuter après la fin de l'observable.
      }
    });
  }
}