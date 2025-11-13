import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact {
  currentLanguage = 'fr';

  email = '';
  phone = '+235 ';
  location = 'Abéché, Tchad';

  contact = {
    name: '',
    email: '',
    message: ''
  };

  translations: any = {
    fr: {
      accueil: 'Accueil',
      problemes: 'Problèmes',
      discussion: 'Discussion',
      solutions: 'Solutions',
      contact: 'Contact',
      arabe: 'Arabe',
      sinscrire: "S'inscrire",
      contactez_nous: 'Contactez-nous',
      intro_contact: 'Nous serions ravis de recevoir vos messages, suggestions ou préoccupations concernant le gaz à Abéché.',
      email: 'Email',
      telephone: 'Téléphone',
      adresse: 'Adresse',
      nom_complet: 'Nom complet',
      votre_nom: 'Votre nom',
      votre_email: 'Votre email',
      message: 'Message',
      votre_message: 'Votre message...',
      envoyer: 'Envoyer'
    },
    ar: {
      accueil: 'الصفحة الرئيسية',
      problemes: 'مشاكل',
      discussion: 'مناقشة',
      solutions: 'حلول',
      contact: 'اتصال',
      arabe: 'فرنسية',
      sinscrire: 'تسجيل',
      contactez_nous: 'اتصل بنا',
      intro_contact: 'يسعدنا تلقي رسائلكم واقتراحاتكم أو مخاوفكم بشأن الغاز في أبشي.',
      email: 'البريد الإلكتروني',
      telephone: 'الهاتف',
      adresse: 'العنوان',
      nom_complet: 'الاسم الكامل',
      votre_nom: 'اسمك',
      votre_email: 'بريدك الإلكتروني',
      message: 'الرسالة',
      votre_message: 'رسالتك...',
      envoyer: 'إرسال'
    }
  };

  t(key: string): string {
    return this.translations[this.currentLanguage]?.[key] || key;
  }

  toggleLanguage(): void {
    this.currentLanguage = this.currentLanguage === 'fr' ? 'ar' : 'fr';
    document.dir = this.currentLanguage === 'ar' ? 'rtl' : 'ltr';
  }

  sendMessage(): void {
    if (this.contact.name && this.contact.email && this.contact.message) {
      alert(
        this.currentLanguage === 'fr'
          ? 'Merci pour votre message !'
          : 'شكراً لرسالتك!'
      );
      this.contact = { name: '', email: '', message: '' };
    }
  }
}
