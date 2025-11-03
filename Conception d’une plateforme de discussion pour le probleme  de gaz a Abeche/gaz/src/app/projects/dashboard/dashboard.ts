import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  imports: [CommonModule, FormsModule, RouterModule,RouterLink] 
})
export class Dashboard {
  newThreadTitle: string = '';
  newThreadMessage: string = '';

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