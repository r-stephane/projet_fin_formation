import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule, } from '@angular/router';

// Interface pour les traductions
interface TranslationKeys {
  // Navigation
  accueil: string;
  problemes: string;
  discussion: string;
  solutions: string;
  contact: string;
  sinscrire: string;
  arabe: string;

  // Hero section
  heroTitle: string;
  heroDescription: string;
  participer: string;

  // Problèmes section
  problemesTitle: string;
  penurieTitre: string;
  penurieDesc: string;
  accesTitre: string;
  accesDesc: string;
  coutsTitre: string;
  coutsDesc: string;

  // Discussion section
  discussionTitle: string;
  partagerExperience: string;
  titreMessage: string;
  placeholderTitre: string;
  votreMessage: string;
  placeholderMessage: string;
  publier: string;
  derniersEchanges: string;
  jaime: string;
  commentaires: string;
  ajouterCommentaire: string;
  commenter: string;
  aucunCommentaire: string;
  aucuneDiscussion: string;

  // Stats section
  impactTitle: string;
  participants: string;
  discussions: string;
  solutionsProposees: string;
  joursEngagement: string;

  // CTA section
  ctaTitle: string;
  ctaDescription: string;
  sinscrireMaintenant: string;

  // Footer
  apropos: string;
  notreMission: string;
  equipe: string;
  partenaires: string;
  ressources: string;
  rapports: string;
  contactsUtiles: string;
  copyright: string;
}

interface Translations {
  fr: TranslationKeys;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  imports: [CommonModule, FormsModule, RouterModule, RouterLink] 
})
export class Dashboard {
  newThreadTitle: string = '';
  newThreadMessage: string = '';
  currentLanguage: 'fr' = 'fr';

  // Dictionnaire de traduction avec typage strict
  translations: Translations = {
    fr: {
      // Navigation
      accueil: 'Accueil',
      problemes: 'Problèmes',
      discussion: 'Discussion',
      solutions: 'Solutions',
      contact: 'Contact',
      sinscrire: 'S\'inscrire',
      arabe: 'العربية',

      // Hero section
      heroTitle: 'Ensemble, résolvons les problèmes de gaz à Abéché',
      heroDescription: 'Partagez vos expériences, proposez des solutions et engagez-vous pour améliorer l\'accès au gaz dans notre communauté.',
      participer: 'Participer à la discussion',

      // Problèmes section
      problemesTitle: 'Problèmes Rencontrés',
      penurieTitre: 'Pénurie de Gaz',
      penurieDesc: 'De nombreux quartiers d\'Abéché souffrent de pénuries de gaz fréquentes et prolongées, affectant la vie quotidienne des habitants.',
      accesTitre: 'Accès limité au gaz',
      accesDesc: 'Le gaz butane est souvent difficile à trouver ou vendu à des prix excessifs, forçant les familles à utiliser du bois de chauffage.',
      coutsTitre: 'Coûts élevés',
      coutsDesc: 'Le prix du gaz représente une part importante du budget des ménages, particulièrement pour les familles modestes.',

      // Discussion section
      discussionTitle: 'Espace de Discussion',
      partagerExperience: 'Partagez votre expérience',
      titreMessage: 'Titre du message',
      placeholderTitre: 'Donnez un titre à votre message',
      votreMessage: 'Votre message',
      placeholderMessage: 'Décrivez votre problème ou partagez votre expérience...',
      publier: 'Publier',
      derniersEchanges: 'Derniers échanges',
      jaime: 'J\'aime',
      commentaires: 'Commentaires',
      ajouterCommentaire: 'Ajouter un commentaire...',
      commenter: 'Commenter',
      aucunCommentaire: 'Aucun commentaire pour le moment. Soyez le premier à réagir !',
      aucuneDiscussion: 'Aucune discussion pour le moment. Soyez le premier à publier !',

      // Stats section
      impactTitle: 'Impact de la Communauté',
      participants: 'Participants',
      discussions: 'Discussions',
      solutionsProposees: 'Solutions proposées',
      joursEngagement: 'Jours d\'engagement',

      // CTA section
      ctaTitle: 'Rejoignez notre communauté',
      ctaDescription: 'Ensemble, nous pouvons faire la différence pour améliorer l\'accès au gaz à Abéché.',
      sinscrireMaintenant: 'S\'inscrire maintenant',

      // Footer
      apropos: 'À propos',
      notreMission: 'Notre mission',
      equipe: 'Équipe',
      partenaires: 'Partenaires',
      ressources: 'Ressources',
      rapports: 'Rapports',
      contactsUtiles: 'Contacts utiles',
      copyright: '© 2025 Plateforme Eau & Gaz Abéché. Tous droits réservés.'
    }
  };

  // Données de démonstration pour les threads
  threads = [
    {
      id: 1,
      author: 'Mohamed Ali',
      date: '2024-01-15',
      title: 'Coupure d\'eau dans le quartier Sabon Gari',
      content: 'Notre quartier est sans eau depuis 3 jours. Les citernes ne suffisent pas à couvrir les besoins des familles...',
      likes: 12,
      comments: [
        {
          id: 1,
          author: 'Amina Ousmane',
          date: '2024-01-15',
          content: 'Nous avons le même problème dans le quartier voisin. C\'est très difficile pour les familles.'
        },
        {
          id: 2,
          author: 'Hassan Ibrahim',
          date: '2024-01-16',
          content: 'Il faut contacter la mairie pour qu\'ils envoient des citernes d\'urgence.'
        }
      ],
      showComments: false,
      newComment: ''
    },
    {
      id: 2,
      author: 'Fatime Hassan',
      date: '2024-01-14',
      title: 'Prix du gaz en augmentation',
      content: 'Le prix de la bouteille de gaz est passé de 6000 à 8500 FCFA en une semaine. Comment faire face ?',
      likes: 8,
      comments: [
        {
          id: 1,
          author: 'Oumar Saleh',
          date: '2024-01-14',
          content: 'C\'est vraiment préoccupant. Beaucoup de familles vont avoir du mal à se chauffer.'
        }
      ],
      showComments: false,
      newComment: ''
    }
  ];

  // Statistiques
  participantsCount = 247;
  threadsCount = 89;
  solutionsCount = 34;
  daysCount = 45;

  // Fonction pour basculer la langue
  toggleLanguage(): void {
    // Garder uniquement le français
    this.currentLanguage = 'fr';
    this.applyLanguage();
  }

  // Fonction pour appliquer la langue sélectionnée
  applyLanguage(): void {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = 'fr';
    document.documentElement.style.fontFamily = '';
    
    // Sauvegarder la préférence
    localStorage.setItem('preferredLanguage', this.currentLanguage);
  }

  // Obtenir la traduction avec typage strict
  t(key: keyof TranslationKeys): string {
    return this.translations[this.currentLanguage][key];
  }

  ngOnInit() {
    // Récupérer la langue sauvegardée
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage === 'fr') {
      this.currentLanguage = savedLanguage;
      this.applyLanguage();
    }
  }

  onPostThread(): void {
    if (this.newThreadTitle && this.newThreadMessage) {
      const newThread = {
        id: this.threads.length + 1,
        author: 'Vous',
        date: new Date().toISOString().split('T')[0],
        title: this.newThreadTitle,
        content: this.newThreadMessage,
        likes: 0,
        comments: [],
        showComments: false,
        newComment: ''
      };

      this.threads.unshift(newThread);
      this.threadsCount++;
      this.participantsCount++;

      this.newThreadTitle = '';
      this.newThreadMessage = '';
    }
  }

  onLikeThread(threadId: number): void {
    const thread = this.threads.find(t => t.id === threadId);
    if (thread) {
      thread.likes++;
    }
  }

  toggleComments(threadId: number): void {
    const thread = this.threads.find(t => t.id === threadId);
    if (thread) {
      thread.showComments = !thread.showComments;
    }
  }

  onAddComment(threadId: number): void {
    const thread = this.threads.find(t => t.id === threadId);
    if (thread && thread.newComment) {
      const newComment = {
        id: thread.comments.length + 1,
        author: 'Vous',
        date: new Date().toISOString().split('T')[0],
        content: thread.newComment
      };

      thread.comments.unshift(newComment);
      thread.newComment = '';
      
      // Augmenter le compteur de participants si c'est un nouveau commentateur
      this.participantsCount++;
    }
  }
}