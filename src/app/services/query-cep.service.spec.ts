import { TestBed } from '@angular/core/testing';

import { QueryCepService } from './query-cep.service';

describe('QueryCepService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QueryCepService = TestBed.get(QueryCepService);
    expect(service).toBeTruthy();
  });
});
