import { TestBed } from '@angular/core/testing';

import { GymScheduleService } from './gym-schedule.service';

describe('GymScheduleService', () => {
  let service: GymScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GymScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
