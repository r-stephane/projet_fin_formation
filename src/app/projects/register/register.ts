import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  registerForm: FormGroup;
  submitted = false;
  loading = false;
  error = '';
  success = '';
  currentLanguage: 'fr' | 'ar' = 'fr';

  // ✅ Dictionnaire bilingue
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
        motDePasseNonIdentique: 'Les mots de passe ne correspondent pas'
      },
      succes: 'Inscription réussie ! Vous pouvez maintenant vous connecter.'
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
        motDePasseNonIdentique: 'كلمتا المرور غير متطابقتين'
      },
      succes: 'تم التسجيل بنجاح! يمكنك الآن تسجيل الدخول.'
    }
  };

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  // ✅ Fonction de traduction
  t(key: string): string {
    return this.translations[this.currentLanguage][key] || key;
  }

  // ✅ Bascule entre FR ↔ AR
  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'fr' ? 'ar' : 'fr';
    document.dir = this.currentLanguage === 'ar' ? 'rtl' : 'ltr'; // sens du texte
  }

  // ✅ Vérifie que les mots de passe correspondent
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  // ✅ Raccourci pour accéder aux contrôles
  get f() {
    return this.registerForm.controls;
  }

  // ✅ Soumission du formulaire
  onSubmit() {
    this.submitted = true;
    this.error = '';
    this.success = '';

    if (this.registerForm.invalid) return;

    this.loading = true;

    // Simulation d’un appel API
    setTimeout(() => {
      this.loading = false;
      this.success = this.translations[this.currentLanguage].succes;
      this.registerForm.reset();
      this.submitted = false;
    }, 1500);
  }
}
