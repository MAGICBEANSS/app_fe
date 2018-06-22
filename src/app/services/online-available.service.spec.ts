import { TestBed, inject } from '@angular/core/testing';

import { OnlineAvailableService } from './online-available.service';

describe('OnlineAvailableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnlineAvailableService]
    });
  });

  it('should be created', inject([OnlineAvailableService], (service: OnlineAvailableService) => {
    expect(service).toBeTruthy();
  }));
});
