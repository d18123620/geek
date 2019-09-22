import { TestBed } from '@angular/core/testing';

import { QuizcreateapiService } from './quizcreateapi.service';

describe('QuizcreateapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuizcreateapiService = TestBed.get(QuizcreateapiService);
    expect(service).toBeTruthy();
  });
});
