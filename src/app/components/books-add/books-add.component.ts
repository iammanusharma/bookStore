import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../../app.constants'
import { FormBuilder, Validators, FormControl, FormGroup, FormGroupDirective, NgForm, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { BookService } from '../../services/book.service';
import { ViewChild } from '@angular/core';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		return control && control.invalid && control.touched;
	}
}
@Component({
	selector: 'app-books-add',
	templateUrl: './books-add.component.html',
	styleUrls: ['./books-add.component.css']
})
export class BooksAddComponent implements OnInit {
	addBooksForm: FormGroup;
	AppConstants = AppConstants;
	matcher = new MyErrorStateMatcher();
	@Output() addBookList: EventEmitter<object> = new EventEmitter<object>();

	constructor(private fb: FormBuilder, private bookService: BookService) { }

	ngOnInit() {
		this.addBooksForm = this.fb.group(
			{
				title: ['', [Validators.required, Validators.maxLength(10)]],
				category: ['', Validators.required],
				description: ['', Validators.required]
			}
		);
	}

	private addBooks() {
		this.validateAllFormFields(this.addBooksForm);
		if (this.addBooksForm.valid) {
			this.bookService.addBooksToList({
				title: this.addBooksForm.get('title').value,
				category: this.addBooksForm.get('category').value,
				description: this.addBooksForm.get('description').value
			});
			this.clearInputFields();
		} else {
			return;
		}
	}

	private clearInputFields(): void {
		this.addBooksForm.reset();
	}

	private validateAllFormFields(formGroup: FormGroup): void {
		Object.keys(formGroup.controls).forEach(field => {
			const control = formGroup.get(field);
			if (control instanceof FormControl) {
				control.markAsTouched({ onlySelf: true });
			} else if (control instanceof FormGroup) {
				this.validateAllFormFields(control);
			}
		});
	}
}
