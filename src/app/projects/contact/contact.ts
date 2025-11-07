import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact {
  email = 'contact@eaugazabeche.td';
  phone = '+235 86 44 51 10';
  location = 'Abéché, Tchad';
}
