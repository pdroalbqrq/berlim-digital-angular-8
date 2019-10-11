import { TestBed } from '@angular/core/testing';

import { VariableGlobalService } from './variable-global.service';

describe('VariableGlobalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VariableGlobalService = TestBed.get(VariableGlobalService);
    expect(service).toBeTruthy();
  });
});
