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
  shouldRefresh: boolean = false; // Flaga do kontrolowania odświeżania

  constructor(
    private authService: AuthService,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isOnStartPage = event.url === '/start';

        // Odświeżanie komponentów tylko jeśli flaga jest ustawiona
        if (this.shouldRefresh) {
          this.refreshComponents(['swiper', 'footer']);
          this.shouldRefresh = false; // Resetujemy flagę
        }

        console.log('Nawigacja do:', event.url);
        console.log('Czy na stronie startowej:', this.isOnStartPage);
      });

    // Monitorowanie zmian pełnoekranowych
    document.addEventListener('fullscreenchange', () => {
      this.isFullscreen = this.checkFullscreen();
    });

    // Monitorowanie zmiany rozmiaru okna
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

    // Ustaw na false, aby wymusić aktualizację
    componentKeys.forEach(key => {
      newData[key] = false; // Ustawiamy na false, aby wymusić ukrycie komponentów
    });

    this.dataService.updateData(newData); // Aktualizacja danych w serwisie

    // Ustaw na true po krótkim czasie, aby pokazać komponenty
    setTimeout(() => {
      const updatedData: { [key: string]: boolean } = {};
      componentKeys.forEach(key => {
        updatedData[key] = true; // Ustawiamy ponownie na true, aby komponenty były widoczne
      });
      this.dataService.updateData(updatedData); // Aktualizacja danych w serwisie
    }, 100); // Opóźnienie 100 ms
  }

  navigateToStart(): void {
    // Jeśli na stronie innej niż '/start', przejdź do '/start' i odśwież komponenty,
    // w przeciwnym razie tylko przejdź do '/start' bez odświeżania
    if (!this.isOnStartPage) {
      console.log('Nawigacja do strony startowej');
      this.shouldRefresh = true; // Ustawiamy flagę, aby odświeżyć komponenty
      this.router.navigate(['/start']); // Przechodzimy na stronę startową
    } else if (this.shouldRefresh) {
      console.log('Odświeżanie komponentów na stronie startowej');
      this.refreshComponents(['swiper', 'footer']); // Odświeżanie komponentów
    }
  }
}
