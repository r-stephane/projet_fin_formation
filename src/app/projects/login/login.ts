import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { RouterLink, } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  error = '';
  currentLanguage = 'fr';

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  translations: any = {
    fr: {
      arabe: 'Arabe',
      connexion: 'Connexion',
      email: 'Email',
      entrez_email: 'Entrez votre email',
      email_requis: "L'email est requis",
      email_invalide: 'Format d’email invalide',
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
      copyright:
        'Plateforme Gaz Abéché. Tous droits réservés.'
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
      copyright:
        'منصة غاز أبشي. جميع الحقوق محفوظة.'
    }
  };

  get f() {
    return this.loginForm.controls;
  }

  t(key: string): string {
    return this.translations[this.currentLanguage]?.[key] || key;
  }

  toggleLanguage(): void {
    this.currentLanguage = this.currentLanguage === 'fr' ? 'ar' : 'fr';
    document.dir = this.currentLanguage === 'ar' ? 'rtl' : 'ltr';
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) return;

    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      alert(
        this.currentLanguage === 'fr'
          ? 'Connexion réussie !'
          : 'تم تسجيل الدخول بنجاح!'
      );
    }, 1000);
  }
}
