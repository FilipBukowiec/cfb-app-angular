import { Component } from '@angular/core';
import { NewsTickerComponent } from '../news-ticker/news-ticker.component';


@Component({
  selector: 'app-media',
  standalone: true,
  imports: [NewsTickerComponent],
  templateUrl: './media.component.html',
  styleUrl: './media.component.scss'
})
export class MediaComponent {

}
