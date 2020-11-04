import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConstants } from '@wpay/app.constants';
import { AbstractBaseService } from '../abstract-base/abstract-base.service';

@Injectable({
  providedIn: 'root'
})
export class EmailValidationService extends AbstractBaseService {

  private lookupUrl = '/isValidEmail';
  public email: string = 'test@gmail.com';

  constructor(http: HttpClient) {
    super(http);
  }

  verifyEmail(email: string): Observable<boolean> {
    this.email = email;
    return this.get(this.lookupUrl, null, [{ name: 'emailAddress', value: email }]);
  }
}
