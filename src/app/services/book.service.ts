import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class BookService {
	allBooks: Book[] = [];
	private bookCurrent$ = new BehaviorSubject(null);
	bookList$ = this.bookCurrent$.asObservable();
	constructor() { }

	addBooksToList(book: Book): void {
		if (book) {
			this.bookCurrent$.next(book);
		}
	}
}
