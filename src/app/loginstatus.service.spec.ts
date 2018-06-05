import { TestBed, inject } from '@angular/core/testing';

import { LoginstatusService } from './loginstatus.service';

describe('LoginstatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginstatusService]
    });
  });

  it('should be created', inject([LoginstatusService], (service: LoginstatusService) => {
    expect(service).toBeTruthy();
  }));
});
