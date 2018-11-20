import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksListComponent } from './books-list.component';
import { Book } from '../../models/book';

describe('BooksListComponent', () => {
  let component: BooksListComponent;
  let fixture: ComponentFixture<BooksListComponent>;
	let bookList: Book[] = [];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
	});

	it('Count of booklist should be 0', () => {
		let count = component.bookList.length;
    expect(count).toBe(0);
	});

});
