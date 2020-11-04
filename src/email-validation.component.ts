import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailValidationService } from '@wpay/services/email-validation/email-validation.service';
import { FormValidationsService } from '@wpay/services/form-validations/form-validations.service';
import { ModalService } from '@wpay/services/modal/modal.service';


@Component({
  selector: 'app-email-validation',
  templateUrl: './email-validation.component.html',
  styleUrls: ['./email-validation.component.scss']
})
export class EmailValidationComponent implements OnInit {
  public submitted = false;
  public emailValidationForm: FormGroup;
  public showModal = false;
  public canContinue = false;
  public emailVerified = false;
  validationMessages = {
    email: {
      required: 'Please enter your email address.',
      invalidEmail: 'Please enter a valid email address.',
      emailNotExists: 'Oh no! That e-mail doesn\'t look quite right.'
    }
  };

  formErrors = {
    email: ''
  };

  public get emailForm(): any { return this.emailValidationForm.controls; }

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
              private router: Router, private emailValidationService: EmailValidationService,
              private modalService: ModalService, private formValidationsService: FormValidationsService) {
    // this.canContinue = false;
  }

  ngOnInit(): void {
    this.emailValidationForm = this.formBuilder.group({
      email: ['', [Validators.required, this.formValidationsService.validateEmail]]
    });
    this.emailValidationForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.emailValidationForm);
    });
    this.canContinueNext();
    this.modalService.canShowModal().subscribe((showModal: boolean) => {
      this.showModal = showModal;
    });
  }

  logValidationErrors(group: FormGroup = this.emailValidationForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
      if (abstractControl && !abstractControl.valid &&
        (abstractControl.touched || abstractControl.dirty || abstractControl.value !== '')) {
        const messages = this.validationMessages[key];
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
    });
    this.canContinueNext();
  }

  onSubmit(): any {
    this.submitted = true;
    // this.emailValidationForm.controls.Email

    // stop here if form is invalid
    if (this.emailValidationForm.invalid) {
      return;
    }
    this.emailValidationService
      .verifyEmail(this.emailForm.email.value)
      .subscribe((result: boolean) => {
        if (result === true) {
          this.router.navigate(['login']);
        }
        else {
          this.emailForm.email.setErrors({
            emailNotExists: true
          });

          this.logValidationErrors();
        }
      },
        (err: any) => console.log(err));
  }

  canContinueNext(): void {
    if (this.emailValidationForm.valid) {
      this.canContinue = true;
    }
    else {
      this.canContinue = false;
    }
  }


}
