import { TestBed } from '@angular/core/testing';

import { PagseguroService } from './pagseguro.service';

describe('PagseguroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PagseguroService = TestBed.get(PagseguroService);
    expect(service).toBeTruthy();
  });
});
