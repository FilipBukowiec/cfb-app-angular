import { Component } from '@angular/core';
import { NewsTickerComponent } from '../news-ticker/news-ticker.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NewsTickerComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {}
