import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AbstractBaseService } from '../abstract-base/abstract-base.service';

import { EmailValidationService } from './email-validation.service';

describe('EmailValidationService', () => {
  let service: EmailValidationService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(EmailValidationService);
    http: TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //Tests for verifyEmail function
  describe('verifyEmail', () => {
    it('should call abstract service get', () => {
      const mySpy = spyOn<any>(service, 'get');
      service.verifyEmail("test@email.com");
      expect(mySpy).toHaveBeenCalled();
    });
  });
});
