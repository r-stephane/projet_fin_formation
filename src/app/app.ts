import { Component } from '@angular/core';
import { RouterOutlet,RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  
  standalone: true, 
  imports: [
    RouterOutlet,
    RouterModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  template: `
    <router-outlet/>
  `,
  styles: ``,
})
export class App {
  protected title = 'Gaz';
}