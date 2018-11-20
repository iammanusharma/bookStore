import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';

@Component({
  selector: 'app-books-layout',
  templateUrl: './books-layout.component.html',
  styleUrls: ['./books-layout.component.css']
})
export class BooksLayoutComponent implements OnInit {

	book: Book;
  constructor() { }

  ngOnInit() {
	}
	
	addBookToList(book: Book) : void {
		this.book = book;
	}
}
