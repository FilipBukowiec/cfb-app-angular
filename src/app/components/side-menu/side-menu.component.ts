import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../../services/data-service.service';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [RouterLink, CommonModule, MatIconModule],
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  isFullscreen: boolean = false;
  isLoggedIn: boolean = false;
  isOnStartPage: boolean = false;
  shouldRefresh: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dataService: DataService,
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isOnStartPage = event.url === '/start';
      });

    document.addEventListener('fullscreenchange', () => {
      this.isFullscreen = this.checkFullscreen();
    });

    window.addEventListener('resize', () => {
      this.isFullscreen = this.checkFullscreen();
    });
  }

  logOut(): void {
    this.authService.logout();
  }

  toggleFullscreen(): void {
    this.isFullscreen ? this.closeFullscreen() : this.openFullscreen();
  }

  openFullscreen(): void {
    const elem: any = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  }

  closeFullscreen(): void {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }

  checkFullscreen(): boolean {
    return !!document.fullscreenElement;
  }

  refreshComponents(componentKeys: string[]): void {
    const newData: { [key: string]: boolean } = {};
    componentKeys.forEach(key => {
      newData[key] = false;
    });
    this.dataService.updateData(newData); 
    setTimeout(() => {
      const updatedData: { [key: string]: boolean } = {};
      componentKeys.forEach(key => {
        updatedData[key] = true;
      });
      this.dataService.updateData(updatedData); 
    }, 100);
  }

  navigateToStart(): void {
    if (!this.isOnStartPage) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/start']).then(() => {
        this.shouldRefresh = true;
      });
    } else {
      if (this.shouldRefresh) {
        this.shouldRefresh = false;
      }
    }
  }

  onStartClick(event: MouseEvent): void {
    if (this.isOnStartPage) {
      this.refreshComponents(["swiper", 'footer']);
      event.preventDefault();
    } else {
      this.navigateToStart();
    }
  }
}
