/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AutotypeService } from './autotype.service';

describe('Service: Autotype', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutotypeService]
    });
  });

  it('should ...', inject([AutotypeService], (service: AutotypeService) => {
    expect(service).toBeTruthy();
  }));
});
