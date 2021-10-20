import { TestBed } from '@angular/core/testing';

import { CepConsultationService } from './cep-consultation.service';

describe('CepConsultationService', () => {
  let service: CepConsultationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CepConsultationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
