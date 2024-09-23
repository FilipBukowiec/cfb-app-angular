import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent {

}
