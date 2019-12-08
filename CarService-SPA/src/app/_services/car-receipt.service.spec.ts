/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CarReceiptService } from './car-receipt.service';

describe('Service: CarReceipt', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarReceiptService]
    });
  });

  it('should ...', inject([CarReceiptService], (service: CarReceiptService) => {
    expect(service).toBeTruthy();
  }));
});
