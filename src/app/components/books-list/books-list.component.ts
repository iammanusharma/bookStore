import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { Input } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Customer } from '../../../model/model';

@Component({
	selector: 'app-books-list',
	templateUrl: './books-list.component.html',
	styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
	bookList: Book[] = [];
	@Input() book: Book;
  posts: Customer;

	constructor(private bookService: BookService) { }

	ngOnInit() {
    debugger;
    this.bookService.getAll().subscribe((response: Customer) => {
      this.posts = response;
    });

		this.bookService.bookList$.subscribe(resBookList => {
			if(resBookList){
				this.bookList.push(resBookList);
			}});
	}

}
