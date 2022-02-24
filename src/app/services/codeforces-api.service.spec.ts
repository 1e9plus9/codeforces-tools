import { TestBed } from '@angular/core/testing';

import { CodeforcesApiService } from './codeforces-api.service';

describe('CodeforcesApiService', () => {
  let service: CodeforcesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeforcesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
