import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.css']
})
export class ResetPassword {
  resetForm: FormGroup;
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordsMatchValidator });
  }

  get newPassword() {
    return this.resetForm.get('newPassword');
  }
  get confirmPassword() {
    return this.resetForm.get('confirmPassword');
  }

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('newPassword')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    setTimeout(() => {
      this.successMessage = 'Mot de passe réinitialisé avec succès !';
      this.loading = false;
      setTimeout(() => this.router.navigate(['/client/login']), 2000);
    }, 1500);
  }
}