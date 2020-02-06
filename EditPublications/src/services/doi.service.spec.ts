import { TestBed } from '@angular/core/testing';

import { DoiService } from './doi.service';

describe('DoiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DoiService = TestBed.get(DoiService);
    expect(service).toBeTruthy();
  });
});
