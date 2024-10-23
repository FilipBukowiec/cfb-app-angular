import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterModule, CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {
  isLoggedIn: boolean = false;
  private subscription: Subscription;

  constructor(private authService: AuthService, private router: Router) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {

    this.subscription.add(
      this.authService.isLoggedIn().subscribe(loggedIn => {
        this.isLoggedIn = loggedIn;
      })
    );
  }

  logOut(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
