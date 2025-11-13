import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './solutions.html',
  styleUrls: ['./solutions.css']
})
export class Solutions {
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
      solutions_proposees: 'Solutions proposées',
      subvention_gaz: 'Subvention sur le prix du gaz pour les familles modestes.',
      reparation_conduites: 'Réparation des conduites principales dans les quartiers touchés.'
    },
    ar: {
      accueil: 'الصفحة الرئيسية',
      problemes: 'مشاكل',
      discussion: 'مناقشة',
      solutions: 'حلول',
      contact: 'اتصال',
      arabe: 'فرنسية',
      sinscrire: 'تسجيل',
      solutions_proposees: 'الحلول المقترحة',
      subvention_gaz: 'دعم أسعار الغاز للعائلات ذات الدخل المحدود.',
      reparation_conduites: 'إصلاح الأنابيب الرئيسية في الأحياء المتضررة.'
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
