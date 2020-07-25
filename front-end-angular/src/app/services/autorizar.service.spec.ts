import { TestBed } from '@angular/core/testing';

import { AutorizarService } from './autorizar.service';

describe('AutorizarService', () => {
  let service: AutorizarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutorizarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
