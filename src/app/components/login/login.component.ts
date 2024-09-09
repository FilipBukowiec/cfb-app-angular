import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        // Sprawdź, czy odpowiedź zawiera token
        if (response && response.token) {
          // Zapisz token do localStorage
          localStorage.setItem('token', response.token);
          // Przekieruj użytkownika na stronę admina
          this.router.navigate(['/admin']);
        } else {
          // Obsłuż przypadek, gdy token nie jest obecny w odpowiedzi
          console.error('No token found in response');
          alert("Incorrect login or password")
        }
      },
      (error) => {
        // Obsłuż błąd logowania
        console.error('Login failed', error);
      }
    );
  }}