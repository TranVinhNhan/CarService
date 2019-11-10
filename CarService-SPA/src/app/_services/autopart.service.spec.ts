/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AutopartService } from './autopart.service';

describe('Service: Autopart', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutopartService]
    });
  });

  it('should ...', inject([AutopartService], (service: AutopartService) => {
    expect(service).toBeTruthy();
  }));
});
