import { TestBed } from '@angular/core/testing';

import { ConectionsService } from './conections.service';

describe('ConectionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConectionsService = TestBed.get(ConectionsService);
    expect(service).toBeTruthy();
  });
});
