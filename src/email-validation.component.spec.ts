import { Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EmailValidationService } from '@wpay/services/email-validation/email-validation.service';
import { ModalService } from '@wpay/services/modal/modal.service';
import { of, throwError } from 'rxjs';

import { EmailValidationComponent } from './email-validation.component';

describe('EmailValidationComponent', () => {
  let component: EmailValidationComponent;
  let fixture: ComponentFixture<EmailValidationComponent>;
  let emailValidationService: EmailValidationService;
  let modalService: ModalService;
  let router: Router;
  let location: Location;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        BrowserAnimationsModule],
      declarations: [EmailValidationComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailValidationComponent);
    component = fixture.componentInstance;
    emailValidationService = TestBed.inject(EmailValidationService);
    modalService = TestBed.inject(ModalService);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    formBuilder = TestBed.inject(FormBuilder);
    router.initialNavigation();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Tests for ngOnInit().
  describe('ngOnInit', () => {
    it('should call canContinueNext', () => {
      const mySpy = spyOn(component, 'canContinueNext');
      component.ngOnInit();
      expect(mySpy).toHaveBeenCalled();
    });

    it('should call modalService canShowModal method', () => {
      const mySpy = spyOn(modalService, 'canShowModal').and.returnValue(of(true));
      component.ngOnInit();
      expect(mySpy).toHaveBeenCalled();
    });

    it('should call modalService canShowModal subscribe method', fakeAsync(() => {
      const mySpy = spyOn(modalService, 'canShowModal').and.returnValue(of(true));
      const mySpy1 = spyOn(modalService.canShowModal(), 'subscribe');
      component.ngOnInit();
      tick();
      expect(mySpy).toHaveBeenCalledBefore(mySpy1);
      expect(mySpy1).toHaveBeenCalled();
    }));

    const showModalTests = [
      { description: "should assign showModal true when modalService canShowModal subscribe method returns true", canShowModal: true, result: true },
      { description: "should assign showModal false when modalService canShowModal subscribe method returns false", canShowModal: false, result: false }
    ];

    showModalTests.forEach((showModalTest) => {
      it(showModalTest.description, fakeAsync(() => {
        spyOn(modalService, 'canShowModal').and.returnValue(of(showModalTest.canShowModal));
        component.ngOnInit();
        tick();
        expect(component.showModal).toBe(showModalTest.result);
      }))
    });
  });

  // Tests for canContinueNext() function.
  describe('canContinueNext', () => {
    const parameters = [
      { description: "should assign canContinue true when form is valid", isFormValid: true, result: true },
      { description: "should assign canContinue false when form is invalid", isFormValid: false, result: false }
    ];

    parameters.forEach((parameter) => {
      it(parameter.description, () => {
        if (parameter.isFormValid) {
          component.emailValidationForm.controls.email.setValue("test@email.com");
        }
        else {
          component.emailValidationForm.markAsDirty();
        }
        component.canContinueNext();
        expect(component.canContinue).toBe(parameter.result);
      })
    });
  });

  // Tests for onSubmit() function.
  describe('onSubmit', () => {
    it('should mark submitted as true', () => {
      component.onSubmit();
      expect(component.submitted).toBeTrue();
    });

    it('should stay on the same page if the form is invalid', () => {
      const currentpath = location.path();
      component.emailValidationForm.markAsDirty();
      component.onSubmit();
      expect(location.path()).toBe(currentpath);
    });

    it('should call emailValidationService verifyEmail method', () => {
      component.emailValidationForm.controls.email.setValue("test@email.com");
      const mySpy = spyOn(emailValidationService, 'verifyEmail').and.returnValue(of(true));
      component.onSubmit();
      expect(mySpy).toHaveBeenCalled();
    });

    it('should call emailValidationService verifyEmail subscribe method', fakeAsync(() => {
      component.emailValidationForm.controls.email.setValue("test@email.com");
      const mySpy = spyOn(emailValidationService, 'verifyEmail').and.returnValue(of(true));
      const mySpy1 = spyOn(emailValidationService.verifyEmail(component.emailValidationForm.controls.email.value), 'subscribe');
      component.onSubmit();
      tick();
      expect(mySpy).toHaveBeenCalledBefore(mySpy1);
      expect(mySpy1).toHaveBeenCalled();
    }));

    it('should redirect to login page if emailValidationService verifyEmail subscribe method returns true', fakeAsync(() => {
      component.emailValidationForm.controls.email.setValue("test@email.com");
      spyOn(emailValidationService, 'verifyEmail').and.returnValue(of(true));
      spyOn(router, 'navigate');
      component.onSubmit();
      tick();
      expect(router.navigate).toHaveBeenCalledWith(['login']);
    }));

    it('should add error to email control and call logValidationErrors method if emailValidationService verifyEmail subscribe method returns false', fakeAsync(() => {
      component.emailValidationForm.controls.email.setValue("test@email.com");
      spyOn(emailValidationService, 'verifyEmail').and.returnValue(of(false));
      const mySpy = spyOn(component, 'logValidationErrors');
      component.onSubmit();
      tick();
      expect(component.emailValidationForm.controls.email.errors["emailNotExists"]).toBeTrue();
      expect(mySpy).toHaveBeenCalled();
    }));

    it('should log error in console when emailValidationService verifyEmail subscribe method throws error', fakeAsync(() => {
      component.emailValidationForm.controls.email.setValue("test@email.com");
      spyOn(emailValidationService, 'verifyEmail').and.returnValue(throwError(new Error('error')));
      const mySpy = spyOn(console, 'log');
      component.onSubmit();
      tick();
      expect(mySpy).toHaveBeenCalled();
    }));
  });

  // Tests for logValidationErrors() function.
  describe('logValidationErrors', () => {
    it('should take emailValidationForm as default input', () => {
      component.emailValidationForm.controls.email.setValue("test");
      const expectedValidationError = 'Please enter a valid email address. ';
      component.logValidationErrors();
      expect(component.formErrors['email']).toBe(expectedValidationError);
    });

    it('should call canContinueNext', () => {
      const mySpy = spyOn(component, 'canContinueNext');
      component.logValidationErrors(component.emailValidationForm);
      expect(mySpy).toHaveBeenCalled();
    });

    it('should add a formError when a control in the form group is invalid', () => {
      component.emailValidationForm.controls.email.setValue("test");
      const expectedValidationError = 'Please enter a valid email address. ';
      component.logValidationErrors(component.emailValidationForm);
      expect(component.formErrors['email']).toBe(expectedValidationError);
    });

    it('should call logValidationErrors method if the input form group has a child form group', () => {
      component.emailValidationForm.addControl('phone', formBuilder.group({
        number: ['']
      }));
      component.emailValidationForm.controls.email.setValue("test");
      const mySpy = spyOn(component, 'logValidationErrors');
      component.logValidationErrors(component.emailValidationForm);
      expect(mySpy).toHaveBeenCalled();
    });
  });
});
