import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../services/auth.service";


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  isFullscreen: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Subskrybuj zmiany stanu zalogowania
    this.authService.isLoggedIn().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn; // Ustaw wartość zalogowania
    });


    const videoElement = document.querySelector('.video') as HTMLVideoElement;
  if (videoElement) {
    videoElement.muted = true;
  }

    document.addEventListener('fullscreenchange', () => {
      this.isFullscreen = this.checkFullscreen();
    });

    window.addEventListener('resize', () => {
      this.isFullscreen = this.checkFullscreen();
    });
  }

  logOut(): void {
    this.authService.logout();
    // this.closeFullscreen();
  }

  toggleFullscreen(): void {
    if (!this.isFullscreen) {
      this.openFullscreen();
    } else {
      this.closeFullscreen();
    }
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




}
