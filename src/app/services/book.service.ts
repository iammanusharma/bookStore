import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject,throwError as observableThrowError } from 'rxjs';
import { Customer } from '../../model/model';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators/catchError';
@Injectable()
export class BookService {
	allBooks: Book[] = [];
	private bookCurrent$ = new BehaviorSubject(null);
	bookList$ = this.bookCurrent$.asObservable();
  constructor(private httpClient: HttpClient) { }

	addBooksToList(book: Book): void {
		if (book) {
			this.bookCurrent$.next(book);
		}
  }

  getAll():Observable<Customer> {
    return this.httpClient.get<Customer>('http://localhost:65412/api/iBank/customer/').pipe(catchError((e) => this.handleError(e)));
  }

  public handleError(error: Response) {
    if (error.status === 401) {
      return this.throwUnauthorised();
    }
    if (error.status === 404) {
      return this.throwNotFound();
    }
    if (error.status === 400) {
      return this.throwBadRequest();
    }
    return observableThrowError(error.json() || 'Server Error');
  }

  private throwUnauthorised() {

    return observableThrowError('Unauthorised');
  }

  private throwNotFound() {
    return observableThrowError('NotFound');
  }

  private throwBadRequest() {
    return observableThrowError('BadRequest');
}
