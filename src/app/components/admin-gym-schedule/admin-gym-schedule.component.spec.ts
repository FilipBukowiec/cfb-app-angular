import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGymScheduleComponent } from './admin-gym-schedule.component';

describe('AdminGymScheduleComponent', () => {
  let component: AdminGymScheduleComponent;
  let fixture: ComponentFixture<AdminGymScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminGymScheduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGymScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
