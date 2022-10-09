import { TestBed } from '@angular/core/testing';

import { MySessionService } from './my-session.service';

describe('MySessionService', () => {
  let service: MySessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MySessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
