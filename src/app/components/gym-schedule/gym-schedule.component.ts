import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { GymScheduleService } from '../../services/gym-schedule.service';

@Component({
  selector: 'app-gym-schedule',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel,
    ReactiveFormsModule,
  ],
  templateUrl: './gym-schedule.component.html',
  styleUrl: './gym-schedule.component.scss',
})
export class GymScheduleComponent implements OnInit {
  selectForm!: FormGroup;

  days: string[] = [];
  rooms: string[] = [];
  times: string[] = [];
  classes: string[] = [];
  trainers: string[] = [];

  constructor(
    private fb: FormBuilder,
    private gymScheduleService: GymScheduleService
  ) {}

  ngOnInit(): void {
    this.selectForm = this.fb.group({
      day: ['', , Validators.required],
      room: ['', Validators.required],
      timeStartHour: ['', Validators.required],
      timeStartMinute: ['', Validators.required],
      timeEndHour: ['', Validators.required],
      timeEndMinute: ['', Validators.required],


      class: ['', Validators.required],
      trainer: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.selectForm.valid) {
      const formData = this.selectForm.value;
      console.log(formData);
      this.gymScheduleService.submitActivity(formData).subscribe(
        (response) => {
          console.log('activity submited succesfully:', response);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    } else {
      console.log('form is invalid');
    }
  }
}
