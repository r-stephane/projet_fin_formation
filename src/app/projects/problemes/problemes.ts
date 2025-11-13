import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-problems',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './problemes.html',
  styleUrls: ['./problemes.css']
})
export class Problemes {
  currentLanguage = 'fr';

  translations: any = {
    fr: {
      accueil: 'Accueil',
      problemes: 'Problèmes',
      discussion: 'Discussion',
      solutions: 'Solutions',
      contact: 'Contact',
      arabe: 'Arabe',
      sinscrire: "S'inscrire",
      problemes_rencontres: 'Problèmes rencontrés',
      difficulte_acces_gaz: "Difficulté d’accès au gaz butane.",
      prix_eleves_gaz: "Prix élevés du gaz."
    },
    ar: {
      accueil: 'الصفحة الرئيسية',
      problemes: 'مشاكل',
      discussion: 'مناقشة',
      solutions: 'حلول',
      contact: 'اتصال',
      arabe: 'فرنسية',
      sinscrire: 'تسجيل',
      problemes_rencontres: 'المشاكل التي تمت مواجهتها',
      difficulte_acces_gaz: 'صعوبة الوصول إلى غاز البوتان.',
      prix_eleves_gaz: 'ارتفاع أسعار الغاز.'
    }
  };

  t(key: string): string {
    return this.translations[this.currentLanguage]?.[key] || key;
  }

  toggleLanguage(): void {
    this.currentLanguage = this.currentLanguage === 'fr' ? 'ar' : 'fr';
    document.dir = this.currentLanguage === 'ar' ? 'rtl' : 'ltr';
  }
}
