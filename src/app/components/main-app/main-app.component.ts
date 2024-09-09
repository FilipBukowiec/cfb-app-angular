import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClockService } from '../../services/clock.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-app',
  standalone: true,
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss'],
})
export class MainAppComponent implements OnInit, OnDestroy {
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
