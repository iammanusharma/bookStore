import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { Input } from '@angular/core';
import { BookService } from '../../services/book.service';

@Component({
	selector: 'app-books-list',
	templateUrl: './books-list.component.html',
	styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
	bookList: Book[] = [];
	@Input() book: Book;

	constructor(private bookService: BookService) { }

	ngOnInit() {
		debugger;
		this.bookService.bookList$.subscribe(resBookList => { 
			if(resBookList){
				this.bookList.push(resBookList);
			}});
	}

}
