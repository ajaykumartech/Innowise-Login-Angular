import { TestBed } from '@angular/core/testing';

import { UserenvironmentsService } from './userenvironments.service';

describe('UserenvironmentsService', () => {
  let service: UserenvironmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserenvironmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
