import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClockService } from '../../services/clock.service';
import { Subscription } from 'rxjs';
import { NewsTickerComponent } from '../news-ticker/news-ticker.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NewsTickerComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit, OnDestroy {
  currentTime: string = '';
  private subscription: Subscription | undefined;

  constructor(private clockService: ClockService) {}

  ngOnInit(): void {
    this.subscription = this.clockService.currentTime$.subscribe((time) => {
      this.currentTime = time;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
