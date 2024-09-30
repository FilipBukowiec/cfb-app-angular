import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-gym-schedule',
  standalone: true,
  imports: [MatButtonModule, MatFormField, MatSelect, MatOption, MatLabel],
  templateUrl: './gym-schedule.component.html',
  styleUrl: './gym-schedule.component.scss'
})
export class GymScheduleComponent {

}
