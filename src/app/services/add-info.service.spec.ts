import { TestBed } from '@angular/core/testing';

import { AddInfoService } from './add-info.service';

describe('AddInfoService', () => {
  let service: AddInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
