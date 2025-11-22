import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  error = '';
  currentLanguage = 'fr';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.initializeLanguage();
    this.disableGoogleTranslate();
  }

  // Initialiser la langue
  private initializeLanguage() {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'fr';
    this.currentLanguage = savedLanguage;
    this.applyLanguageDirection();
    console.log('Langue initialisée:', this.currentLanguage);
  }

  // Appliquer la direction RTL/LTR
  private applyLanguageDirection() {
    document.dir = this.currentLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = this.currentLanguage;
  }

  // Désactiver Google Translate
  private disableGoogleTranslate() {
    // Méthode 1: Meta tag (déjà dans index.html)
    const meta = document.createElement('meta');
    meta.name = 'google';
    meta.content = 'notranslate';
    document.head.appendChild(meta);

    // Méthode 2: Attribut sur l'html
    document.documentElement.setAttribute('translate', 'no');

    // Méthode 3: Classe sur le body
    document.body.classList.add('notranslate');
  }

  translations: any = {
    fr: {
      arabe: 'Arabe',
      connexion: 'Connexion',
      email: 'Email',
      entrez_email: 'Entrez votre email',
      email_requis: "L'email est requis",
      email_invalide: "Format d'email invalide",
      mot_de_passe: 'Mot de passe',
      entrez_mot_de_passe: 'Entrez votre mot de passe',
      mdp_requis: 'Le mot de passe est requis',
      se_connecter: 'Se connecter',
      connexion_en_cours: 'Connexion...',
      pas_de_compte: 'Pas encore de compte ?',
      sinscrire: "S'inscrire",
      a_propos: 'À propos',
      mission: 'Notre mission',
      equipe: 'Équipe',
      partenaires: 'Partenaires',
      ressources: 'Ressources',
      rapports: 'Rapports',
      solutions_proposees: 'Solutions proposées',
      contacts_utiles: 'Contacts utiles',
      contact: 'Contact',
      telephone: 'Téléphone',
      copyright: 'Plateforme Gaz Abéché. Tous droits réservés.',
    },
    ar: {
      arabe: 'فرنسية',
      connexion: 'تسجيل الدخول',
      email: 'البريد الإلكتروني',
      entrez_email: 'أدخل بريدك الإلكتروني',
      email_requis: 'البريد الإلكتروني مطلوب',
      email_invalide: 'تنسيق البريد الإلكتروني غير صالح',
      mot_de_passe: 'كلمة المرور',
      entrez_mot_de_passe: 'أدخل كلمة المرور',
      mdp_requis: 'كلمة المرور مطلوبة',
      se_connecter: 'تسجيل الدخول',
      connexion_en_cours: 'جارٍ الاتصال...',
      pas_de_compte: 'ليس لديك حساب؟',
      sinscrire: 'إنشاء حساب',
      a_propos: 'حول',
      mission: 'مهمتنا',
      equipe: 'الفريق',
      partenaires: 'الشركاء',
      ressources: 'الموارد',
      rapports: 'تقارير',
      solutions_proposees: 'الحلول المقترحة',
      contacts_utiles: 'جهات الاتصال المفيدة',
      contact: 'اتصال',
      telephone: 'الهاتف',
      copyright: 'منصة غاز أبشي. جميع الحقوق محفوظة.',
    },
  };

  get f() {
    return this.loginForm.controls;
  }

  t(key: string): string {
    return this.translations[this.currentLanguage]?.[key] || key;
  }

  toggleLanguage(): void {
    this.currentLanguage = this.currentLanguage === 'fr' ? 'ar' : 'fr';
    localStorage.setItem('preferredLanguage', this.currentLanguage);
    this.applyLanguageDirection();
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.error = '';

    // Simulation d'une connexion API
    // setTimeout(() => {
    //   const email = this.loginForm.get('email')?.value;
    //   const password = this.loginForm.get('password')?.value;

    //   // Simulation de validation
    //   if (email && password.length >= 3) { // Mot de passe d'au moins 3 caractères pour la démo
    //     // Connexion réussie
    //     this.loading = false;

    //     // Stocker les informations
    //     localStorage.setItem('isLoggedIn', 'true');
    //     localStorage.setItem('userEmail', email);

    //     // Redirection vers le dashboard
    //     console.log('Redirection vers le dashboard...');
    //     this.router.navigate(['projects/dashboard']);
    //   } else {
    //     // Échec de connexion
    //     this.loading = false;
    //     this.error = this.currentLanguage === 'fr'
    //       ? 'Email ou mot de passe incorrect'
    //       : 'البريد الإلكتروني أو كلمة المرور غير صحيحة';
    //   }
    // }, 1000);
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService.login(email, password).subscribe({
      next: (response) => {
        this.loading = false;

        if (response && response.token) {
          localStorage.setItem('authToken', response.token);

          // Redirection utilisateur
          this.router.navigate(['/projects/dashboard']);
        } else {
          this.error =
            this.currentLanguage === 'fr'
              ? 'Erreur de connexion : token manquant.'
              : 'خطأ في تسجيل الدخول: رمز مفقود.';
        }
      },

      error: (err) => {
        this.loading = false;
        console.error(err);

        this.error =
          this.currentLanguage === 'fr'
            ? 'Email ou mot de passe incorrect'
            : 'البريد الإلكتروني أو كلمة المرور غير صحيحة';
      },
    });
  }
}
