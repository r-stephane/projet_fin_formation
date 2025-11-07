import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-discussion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './discussion.html',
  styleUrls: ['./discussion.css']
})
export class Discussion {
  threads = [
    { author: 'Mahamat', content: 'Le prix du gaz a encore augmenté cette semaine.', date: '29/10/2025' },
  ];
  
  newMessage = '';

  postMessage() {
    if (this.newMessage.trim()) {
      this.threads.unshift({
        author: 'Utilisateur',
        content: this.newMessage,
        date: new Date().toLocaleDateString()
      });
      this.newMessage = '';
    }
  }
}
