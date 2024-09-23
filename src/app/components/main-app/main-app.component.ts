import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-main-app',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss'],
})
export class MainAppComponent {}
