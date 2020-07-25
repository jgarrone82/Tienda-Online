import { TestBed } from '@angular/core/testing';

import { AutorizaGuard } from './autoriza.guard';

describe('AutorizaGuard', () => {
  let guard: AutorizaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AutorizaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
