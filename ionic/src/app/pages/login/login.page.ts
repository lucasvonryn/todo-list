import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, FormsModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router) {}

  login() {
    if (this.email === 'teste@teste.com' && this.password === '123456') {
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Email ou senha inválidos!';
    }
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
