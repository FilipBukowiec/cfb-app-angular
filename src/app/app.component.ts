import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainMenuComponent } from './components/main-menu/main-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
