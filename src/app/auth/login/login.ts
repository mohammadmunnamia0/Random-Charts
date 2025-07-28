import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  form: FormGroup;
  errorMessage: string = '';
  
  // Default credentials
  private defaultEmail ='cmed@cmed.com';
  private defaultPassword ='cmed';

  constructor(
    private fb: FormBuilder, 
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  submit() {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      
      // Check if using default credentials for demo purposes
      if (email === this.defaultEmail && password === this.defaultPassword) {
        
        localStorage.setItem('user', JSON.stringify({ email, name: 'Demo User' }));
        this.router.navigate(['/charts']);
        return;
      }
      
      // Otherwise try the actual API
      this.errorMessage = '';
      this.auth.login(email, password).subscribe({
        next: () => {
          this.router.navigate(['/charts']);
        },
        error: (err) => {
          this.errorMessage = 'Invalid email or password. Please try again.';
        }
      });
    }
  }
}
