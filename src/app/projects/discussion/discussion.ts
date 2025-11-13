import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { FormsModule } from '@angular/forms'; 
import { RouterLink } from '@angular/router';


interface Message {
// ... (votre interface Message)
  id: string;
  author: string;
  content: string;
  date: Date;
  likes: number;
  dislikes: number;
  replies: Message[];
  userId: string;
  userAvatar?: string;
  isEdited?: boolean;
  tags?: string[];
}

interface DiscussionCategory {
// ... (votre interface DiscussionCategory)
  id: string;
  name: string;
  description: string;
  icon: string;
  messageCount: number;
  isActive: boolean;
}

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.html',
  styleUrls: ['./discussion.css'],
  imports:[CommonModule,     
    ReactiveFormsModule,   
    FormsModule,RouterLink]
})
export class Discussion implements OnInit, OnDestroy {
  currentLanguage = 'fr';
  messageForm: FormGroup;
  replyForms: { [key: string]: FormGroup } = {};
  
  // NOUVEAU: Propriété pour gérer l'affichage du formulaire de réponse
  visibleReplyFormId: string | null = null; 

  // Données de discussion
  categories: DiscussionCategory[] = [
    {
      id: '1',
      name: 'Problèmes de distribution',
      description: 'Discutez des problèmes de distribution de gaz',
      icon: '🚚',
      messageCount: 156,
      isActive: true
    },
    {
      id: '2',
      name: 'Prix et disponibilité',
      description: 'Échanges sur les prix et la disponibilité',
      icon: '💰',
      messageCount: 89,
      isActive: false
    },
    {
      id: '3',
      name: 'Solutions alternatives',
      description: 'Partagez vos solutions alternatives',
      icon: '💡',
      messageCount: 67,
      isActive: false
    },
    {
      id: '4',
      name: 'Sécurité et utilisation',
      description: 'Conseils de sécurité et bonnes pratiques',
      icon: '🛡️',
      messageCount: 42,
      isActive: false
    },
    {
      id: '5',
      name: 'Actualités et informations',
      description: 'Dernières nouvelles sur la situation',
      icon: '📰',
      messageCount: 34,
      isActive: false
    }
  ];

  messages: Message[] = [];
  activeCategory = '1';
  onlineUsers = 47;
  searchTerm = '';
  selectedTags: string[] = [];
  availableTags = ['urgence', 'distribution', 'prix', 'sécurité', 'solution', 'question', 'témoignage'];

  private subscriptions: Subscription[] = [];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.messageForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(5)]],
      tags: [[]],
      category: ['1']
    });
  }

  ngOnInit(): void {
    this.loadMessages();
    this.simulateRealTimeUpdates();
    this.initializeReplyForms();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadMessages(): void {
    // ... (votre simulation de messages)
    this.messages = [
      {
        id: '1',
        author: 'Ahmed Hassan',
        content: 'Bonjour à tous, ça fait 3 jours que je n\'arrive pas à trouver du gaz à Abéché. Est-ce que la situation est pareille dans tous les quartiers ?',
        date: new Date(Date.now() - 2 * 60 * 60 * 1000),
        likes: 15,
        dislikes: 2,
        replies: [
          {
            id: '1-1',
            author: 'Fatima Mahamat',
            content: 'Même problème ici dans le quartier Ndjamena Sara. Les distributeurs disent qu\'il y a une pénurie nationale.',
            date: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
            likes: 8,
            dislikes: 0,
            replies: [],
            userId: '2'
          },
          {
            id: '1-2',
            author: 'Mohammed Ali',
            content: 'Au marché central, certains revendeurs en ont mais à des prix exorbitants. Il faut réguler ça !',
            date: new Date(Date.now() - 1 * 60 * 60 * 1000),
            likes: 12,
            dislikes: 1,
            replies: [],
            userId: '3'
          }
        ],
        userId: '1',
        tags: ['urgence', 'distribution']
      },
      {
        id: '2',
        author: 'Khadija Oumar',
        content: 'Je partage une solution temporaire : j\'utilise un réchaud à charbon de bois en attendant. C\'est pas idéal mais ça dépannage.',
        date: new Date(Date.now() - 4 * 60 * 60 * 1000),
        likes: 25,
        dislikes: 3,
        replies: [
          {
            id: '2-1',
            author: 'Ibrahim Saleh',
            content: 'Merci pour l\'astuce ! Est-ce que c\'est économique comparé au gaz ?',
            date: new Date(Date.now() - 3.5 * 60 * 60 * 1000),
            likes: 5,
            dislikes: 0,
            replies: [],
            userId: '4'
          }
        ],
        userId: '5',
        tags: ['solution', 'témoignage']
      },
      {
        id: '3',
        author: 'Youssouf Abakar',
        content: 'Attention aux bonbonnes contrefaites qui circulent en ce moment. Vérifiez bien les sceaux de sécurité !',
        date: new Date(Date.now() - 6 * 60 * 60 * 1000),
        likes: 32,
        dislikes: 1,
        replies: [],
        userId: '6',
        tags: ['sécurité', 'alerte']
      },
      {
        id: '4',
        author: 'Mariam Adoum',
        content: 'Quelqu\'un connaît les horaires d\'ouverture de la station Total près de l\'hôpital ?',
        date: new Date(Date.now() - 8 * 60 * 60 * 1000),
        likes: 7,
        dislikes: 0,
        replies: [
          {
            id: '4-1',
            author: 'Oumar Mahamat',
            content: 'Ils ouvrent à 7h mais il faut y être tôt, la file d\'attente commence vers 6h30.',
            date: new Date(Date.now() - 7 * 60 * 60 * 1000),
            likes: 4,
            dislikes: 0,
            replies: [],
            userId: '7'
          }
        ],
        userId: '8',
        tags: ['question', 'distribution']
      }
    ];

    this.initializeReplyForms();
  }

  // NOUVEAU: Bascule l'affichage du formulaire de réponse
  toggleReplyForm(messageId: string): void {
    this.visibleReplyFormId = this.visibleReplyFormId === messageId ? null : messageId;
  }

  // NOUVEAU: Vérifie la visibilité pour *ngIf dans le template
  isReplyFormVisible(messageId: string): boolean {
    return this.visibleReplyFormId === messageId;
  }

  initializeReplyForms(): void {
    this.messages.forEach(message => {
      this.replyForms[message.id] = this.fb.group({
        content: ['', [Validators.required, Validators.minLength(3)]]
      });
    });
  }

  postMessage(): void {
    if (this.messageForm.valid) {
      const newMessage: Message = {
        id: Date.now().toString(),
        author: 'Utilisateur Actuel',
        content: this.messageForm.get('content')?.value,
        date: new Date(),
        likes: 0,
        dislikes: 0,
        replies: [],
        userId: 'current',
        tags: this.selectedTags
      };

      this.messages.unshift(newMessage);
      this.messageForm.reset();
      this.messageForm.get('category')?.setValue(this.activeCategory);
      this.selectedTags = [];

      const category = this.categories.find(cat => cat.id === this.activeCategory);
      if (category) {
        category.messageCount++;
      }
    }
  }

  postReply(messageId: string): void {
    const replyForm = this.replyForms[messageId];
    if (replyForm.valid) {
      const parentMessage = this.messages.find(msg => msg.id === messageId);
      if (parentMessage) {
        const newReply: Message = {
          id: `${messageId}-${parentMessage.replies.length + 1}`,
          author: 'Utilisateur Actuel',
          content: replyForm.get('content')?.value,
          date: new Date(),
          likes: 0,
          dislikes: 0,
          replies: [],
          userId: 'current'
        };

        parentMessage.replies.push(newReply);
        replyForm.reset();
        this.toggleReplyForm(messageId); // Masque le formulaire après la publication
      }
    }
  }

  likeMessage(messageId: string): void {
    const message = this.findMessageById(messageId);
    if (message) {
      message.likes++;
    }
  }

  dislikeMessage(messageId: string): void {
    const message = this.findMessageById(messageId);
    if (message) {
      message.dislikes++;
    }
  }

  private findMessageById(messageId: string): Message | null {
    for (const message of this.messages) {
      if (message.id === messageId) {
        return message;
      }
      for (const reply of message.replies) {
        if (reply.id === messageId) {
          return reply;
        }
      }
    }
    return null;
  }

  setActiveCategory(categoryId: string): void {
    this.activeCategory = categoryId;
    this.categories.forEach(cat => {
      cat.isActive = cat.id === categoryId;
    });
  }

  toggleTag(tag: string): void {
    const index = this.selectedTags.indexOf(tag);
    if (index > -1) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
  }

  toggleTagForm(tag: string): void {
    // Note: Utiliser toggleTagForm et toggleTag est redondant
    // Ici, vous utilisez selectedTags pour le formulaire de nouveau message ET pour le filtre
    // Si cela est intentionnel, cette méthode est correcte:
    this.toggleTag(tag); 
  }
  
  // NOUVEAU: Méthode pour vérifier si le tag est sélectionné dans le formulaire
  isTagSelectedInForm(tag: string): boolean {
    return this.selectedTags.includes(tag);
  }

  get filteredMessages(): Message[] {
    let filtered = this.messages.filter(message => message.id); // Base de filtre

    // 1. Filtrer par Catégorie Active (manquait dans l'implémentation précédente)
    filtered = filtered.filter(message => {
        // Cette logique suppose que le champ 'category' existe dans l'interface Message
        // Si vous ne stockez pas la catégorie dans Message, vous pouvez la déduire
        // ou vous fier à la catégorie par défaut pour les messages simulés.
        // Pour l'instant, on laisse tout visible sauf si le terme ou les tags filtrent.
        return true; 
    });


    // 2. Filtrer par Terme de recherche
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(message => 
        message.content.toLowerCase().includes(term) ||
        message.author.toLowerCase().includes(term)
      );
    }

    // 3. Filtrer par Tags sélectionnés
    if (this.selectedTags.length > 0) {
      filtered = filtered.filter(message => 
        message.tags?.some(tag => this.selectedTags.includes(tag))
      );
    }

    return filtered;
  }

  simulateRealTimeUpdates(): void {
    // ... (votre simulation)
    const interval = setInterval(() => {
      this.onlineUsers = 40 + Math.floor(Math.random() * 20);
    }, 30000);

    this.subscriptions.push(new Subscription(() => clearInterval(interval)));
  }

  toggleLanguage(): void {
    this.currentLanguage = this.currentLanguage === 'fr' ? 'ar' : 'fr';
  }

  t(key: string): string {
    // ... (votre implémentation de traduction)
    const translations: { [key: string]: { [key: string]: string } } = {
      'espace_discussion': {
        'fr': 'Espace de Discussion Communautaire',
        'ar': 'مساحة النقاش المجتمعي'
      },
      'partagez_experience': {
        'fr': 'Partagez votre expérience, posez vos questions...',
        'ar': 'شارك تجربتك، اطرح أسئلتك...'
      },
      'publier': {
        'fr': 'Publier',
        'ar': 'نشر'
      },
      'repondre': {
        'fr': 'Répondre',
        'ar': 'رد'
      },
      'utilisateurs_connectes': {
        'fr': 'utilisateurs en ligne',
        'ar': 'مستخدم متصل'
      },
      'rechercher': {
        'fr': 'Rechercher dans les discussions...',
        'ar': 'ابحث في المناقشات...'
      },
      'accueil': { 'fr': 'Accueil', 'ar': 'الرئيسية' },
      'problemes': { 'fr': 'Problèmes', 'ar': 'المشاكل' },
      'discussion': { 'fr': 'Discussion', 'ar': 'النقاش' },
      'solutions': { 'fr': 'Solutions', 'ar': 'الحلول' },
      'contact': { 'fr': 'Contact', 'ar': 'اتصل' },
      'arabe': { 'fr': 'Arabe', 'ar': 'Français' },
      'sinscrire': { 'fr': 'S\'inscrire', 'ar': 'تسجيل' },
      'apropos': { 'fr': 'À propos', 'ar': 'معلومات عنا' },
      'notreMission': { 'fr': 'Notre mission', 'ar': 'مهمتنا' },
      'equipe': { 'fr': 'Équipe', 'ar': 'فريق العمل' },
      'partenaires': { 'fr': 'Partenaires', 'ar': 'شركاء' },
      'ressources': { 'fr': 'Ressources', 'ar': 'موارد' },
      'rapports': { 'fr': 'Rapports', 'ar': 'تقارير' },
      'solutionsProposees': { 'fr': 'Solutions proposées', 'ar': 'الحلول المقترحة' },
      'contactsUtiles': { 'fr': 'Contacts utiles', 'ar': 'جهات اتصال مفيدة' },
      'copyright': { 'fr': '© 2024 Plateforme Gaz Abéché. Tous droits réservés.', 'ar': '© 2024 منصة غاز أبيشي. جميع الحقوق محفوظة.' }
    };

    return translations[key]?.[this.currentLanguage] || key;
  }
}