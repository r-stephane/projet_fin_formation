import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
<<<<<<< HEAD
=======
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs'; // Ajout pour la gestion des erreurs
>>>>>>> 6a6eb1e (correction de angular.json)

@Component({
  selector: 'app-register',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
=======
  // IMPORTANT: Ajouter HttpClientModule aux imports
  imports: [CommonModule, ReactiveFormsModule, RouterLink, HttpClientModule],
>>>>>>> 6a6eb1e (correction de angular.json)
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  registerForm: FormGroup;
  submitted = false;
  loading = false;
<<<<<<< HEAD
  error = '';
  success = '';
  currentLanguage: 'fr' | 'ar' = 'fr';

  //  Dictionnaire bilingue
=======
  // Les messages d'erreur et de succès seront définis par l'API
  error = ''; 
  success = '';
  currentLanguage: 'fr' | 'ar' = 'fr';

  // URL de l'API pour l'inscription. 
  // Remplacez 'http://localhost:8000' par l'URL de base de votre API si elle change.
  private BASE_URL = 'http://localhost:8000/user'; 

  // Dictionnaire bilingue
>>>>>>> 6a6eb1e (correction de angular.json)
  translations: any = {
    fr: {
      arabe: 'Arabe',
      inscription: 'Inscription',
      nomComplet: 'Nom complet',
      email: 'Email',
      motDePasse: 'Mot de passe',
      confirmerMotDePasse: 'Confirmer le mot de passe',
      sinscrire: "S'inscrire",
      inscriptionEnCours: 'Inscription en cours...',
      dejaCompte: 'Déjà un compte ?',
      seConnecter: 'Se connecter',
      erreurs: {
        nomRequis: 'Le nom complet est requis',
        nomCourt: 'Minimum 3 caractères requis',
        emailRequis: "L'email est requis",
        emailInvalide: "Format d'email invalide",
        motDePasseRequis: 'Le mot de passe est requis',
        motDePasseCourt: 'Minimum 6 caractères requis',
        confirmationRequise: 'La confirmation du mot de passe est requise',
<<<<<<< HEAD
        motDePasseNonIdentique: 'Les mots de passe ne correspondent pas'
=======
        motDePasseNonIdentique: 'Les mots de passe ne correspondent pas',
        dejaEnregistre: 'Cet email est déjà enregistré.'
>>>>>>> 6a6eb1e (correction de angular.json)
      },
      succes: 'Inscription réussie ! Redirection vers la page de connexion...'
    },
    ar: {
      arabe: 'Français',
      inscription: 'التسجيل',
      nomComplet: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      motDePasse: 'كلمة المرور',
      confirmerMotDePasse: 'تأكيد كلمة المرور',
      sinscrire: 'سجّل',
      inscriptionEnCours: 'جاري التسجيل...',
      dejaCompte: 'هل لديك حساب؟',
      seConnecter: 'تسجيل الدخول',
      erreurs: {
        nomRequis: 'الاسم الكامل مطلوب',
        nomCourt: 'يجب إدخال 3 أحرف على الأقل',
        emailRequis: 'البريد الإلكتروني مطلوب',
        emailInvalide: 'تنسيق البريد الإلكتروني غير صالح',
        motDePasseRequis: 'كلمة المرور مطلوبة',
        motDePasseCourt: 'يجب إدخال 6 أحرف على الأقل',
        confirmationRequise: 'تأكيد كلمة المرور مطلوب',
<<<<<<< HEAD
        motDePasseNonIdentique: 'كلمتا المرور غير متطابقتين'
=======
        motDePasseNonIdentique: 'كلمتا المرور غير متطابقتين',
        dejaEnregistre: 'هذا البريد الإلكتروني مسجل بالفعل.'
>>>>>>> 6a6eb1e (correction de angular.json)
      },
      succes: 'تم التسجيل بنجاح! يتم التوجيه إلى صفحة تسجيل الدخول...'
    }
  };

<<<<<<< HEAD
  // Ajouter Router dans le constructor
  constructor(private fb: FormBuilder, private router: Router) {
=======
  // AJOUTER HttpClient dans le constructor
  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private http: HttpClient // Injection du service HTTP
  ) {
>>>>>>> 6a6eb1e (correction de angular.json)
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

<<<<<<< HEAD
  //  Fonction de traduction
=======
  // Logique de gestion des erreurs HTTP
  private handleError(error: HttpErrorResponse) {
    this.loading = false;
    // L'API devrait renvoyer un message d'erreur clair dans le corps
    if (error.status === 409) { // 409 Conflict si l'utilisateur existe déjà
        this.error = this.t('erreurs.dejaEnregistre');
    } else if (error.error instanceof ErrorEvent) {
      // Erreur côté client ou réseau
      this.error = `Erreur: ${error.error.message}`;
    } else if (error.error && error.error.message) {
      // Erreur renvoyée par le serveur (via le corps de la réponse)
      this.error = `Échec de l'inscription: ${error.error.message}`;
    } else {
      // Erreur non gérée ou statut inconnu
      this.error = `Erreur du serveur (Statut ${error.status}). Veuillez réessayer.`;
    }
    return throwError(() => new Error(this.error));
  }
  
  // Fonction de traduction (inchangée)
>>>>>>> 6a6eb1e (correction de angular.json)
  t(key: string): string {
    const keys = key.split('.');
    let value = this.translations[this.currentLanguage];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  }

<<<<<<< HEAD
  // Bascule entre FR ↔ AR
  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'fr' ? 'ar' : 'fr';
    document.dir = this.currentLanguage === 'ar' ? 'rtl' : 'ltr';
    
    // Sauvegarder la préférence linguistique
=======
  // Bascule entre FR ↔ AR (inchangée)
  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'fr' ? 'ar' : 'fr';
    document.dir = this.currentLanguage === 'ar' ? 'rtl' : 'ltr';
>>>>>>> 6a6eb1e (correction de angular.json)
    localStorage.setItem('preferredLanguage', this.currentLanguage);
  }

  ngOnInit() {
<<<<<<< HEAD
    // Récupérer la langue sauvegardée
=======
>>>>>>> 6a6eb1e (correction de angular.json)
    const savedLanguage = localStorage.getItem('preferredLanguage') as 'fr' | 'ar';
    if (savedLanguage) {
      this.currentLanguage = savedLanguage;
      document.dir = this.currentLanguage === 'ar' ? 'rtl' : 'ltr';
    }
  }

<<<<<<< HEAD
  //  Vérifie que les mots de passe correspondent
=======
  // Vérifie que les mots de passe correspondent (inchangée)
>>>>>>> 6a6eb1e (correction de angular.json)
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

<<<<<<< HEAD
  // Raccourci pour accéder aux contrôles
=======
  // Raccourci pour accéder aux contrôles (inchangée)
>>>>>>> 6a6eb1e (correction de angular.json)
  get f() {
    return this.registerForm.controls;
  }

<<<<<<< HEAD
  //  Soumission du formulaire avec redirection
=======
  // MODIFIÉ: Soumission du formulaire avec appel API
>>>>>>> 6a6eb1e (correction de angular.json)
  onSubmit() {
    this.submitted = true;
    this.error = '';
    this.success = '';

    if (this.registerForm.invalid) return;

    this.loading = true;

<<<<<<< HEAD
    // Simulation d'un appel API
    setTimeout(() => {
      this.loading = false;
      this.success = this.t('succes');
      
      // Sauvegarder les données utilisateur (simulation)
      const userData = {
        fullName: this.registerForm.get('fullName')?.value,
        email: this.registerForm.get('email')?.value,
        registeredAt: new Date().toISOString()
      };
      
      localStorage.setItem('userData', JSON.stringify(userData));
      
      // Redirection vers la page de login après 2 secondes
      setTimeout(() => {
        this.router.navigate(['projects/login']);
      }, 2000);
      
    }, 1500);
  }

  //  Redirection immédiate vers login
  redirectToLogin() {
    this.router.navigate(['projects/login']);
=======
    // 1. Préparer les données pour l'API
    const { nom, email, password, confirm_password } = this.registerForm.value;
    console.log(nom, email, password, confirm_password);    
    
    // NOTE: Le backend de l'inscription ne nécessite généralement pas 'confirmPassword'
    // const payload = { 
    //     nom,
    //     email, 
    //     password,
    //     confirm_password 
    // };
    const payload = { 
      nom: this.registerForm.get('fullName')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      confirmPassword: this.registerForm.get('confirmPassword')?.value
    };
    console.log("Payload : ", payload);
    

    // 2. Faire l'appel POST à l'API de connexion
    this.http.post(`${this.BASE_URL}/register`, payload) // Utilisation de l'endpoint /register
      .pipe(
        // Utiliser catchError pour gérer les erreurs du serveur (400, 409, 500, etc.)
        catchError((error: HttpErrorResponse) => this.handleError(error)) 
      )
      .subscribe({
        next: (response) => {
          // Gérer le succès (statut 200/201)
          this.loading = false;
          this.success = this.t('succes'); 
          
          // Redirection vers la page de login après 2 secondes
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (err) => {
          // Le handleError a déjà mis à jour this.error, 
          // mais l'observable nécessite un bloc error pour gérer l'erreur jetée.
          console.error('Erreur finale capturée par le subscribe:', err);
          // this.loading est déjà mis à jour dans handleError
        }
      });
  }

  // Redirection immédiate vers login (inchangée)
  redirectToLogin() {
    this.router.navigate(['/login']);
>>>>>>> 6a6eb1e (correction de angular.json)
  }
}