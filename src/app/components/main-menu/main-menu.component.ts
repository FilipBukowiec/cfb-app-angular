import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss',
})
export class MainMenuComponent {

  isStart: boolean = false;
  isFullscreen: boolean = false;

  toggleFullscreen(): void {
    if (!this.isFullscreen) {
      this.openFullscreen();
    } else {
      this.closeFullscreen();
    }
    this.isFullscreen = !this.isFullscreen;
  }

  openFullscreen(): void {
    const elem: any = document.documentElement;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  }

  closeFullscreen(): void {
    const doc: any = document;

    if (doc.exitFullscreen) {
      doc.exitFullscreen();
    } else if (doc.mozCancelFullScreen) {
      doc.mozCancelFullScreen();
    } else if (doc.webkitExitFullscreen) {
      doc.webkitExitFullscreen();
    } else if (doc.msExitFullscreen) {
      doc.msExitFullscreen();
    }
  }



  constructor(private router: Router) {
    // Nasłuchuj na zmiany nawigacji
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateButtonState(event.urlAfterRedirects);
      }
    });
  }

  // Aktualizacja stanu przycisku na podstawie aktualnej ścieżki
  updateButtonState(url: string): void {
    // Zakładamy, że strona "start" ma URL "/start"
    this.isStart = url === '/start';  // Ustaw isStart na true, jeśli URL to "/start"
  }

  // Funkcja wywoływana po kliknięciu przycisku
  handleButtonClick(): void {
    if (this.isStart) {
      this.refreshComponent();  // Odśwież komponent na stronie "start"
    } else {
      this.navigateToStart();   // Przejdź do strony "start"
    }
  }

  // Nawigacja do strony "start"
  navigateToStart(): void {
    this.router.navigate(['/start']);
  }

  // Metoda do odświeżenia komponentu
  refreshComponent(): void {
    this.router.navigate([this.router.url]).then(() => {
      console.log('Komponent został odświeżony');
    });
  
  }






}
